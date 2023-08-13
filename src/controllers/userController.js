const db = require("../db/models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "m3uPr0j3tOPr0v1dEr";

const userController = {
  findUsers: async (req, res) => {
    //Para tratamento de erros
    try {
      //Faz uma chamada  na base usando o metodo apropriado e armazena o resultado na constante;
      const users = await User.findAll({
        //atributos que quero buscar;
        attributes: ["id", "name"],
        order: [["id", "DESC"]],
      });
      //Verifica se os dados existem na basa;
      if (users !== undefined) {
        //Retorna um Response com o status code e os dados em json se existir;
        res.status(200).json({ msg: "Autenticado", users });
      } else {
        //Retorna um Response com o status code e os dados em json caso seja undefined;
        res.status(500).json({ msg: "Usuário NÂO existe" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: error });
    }
  },
  findByIdUser: async (req, res) => {
    const user = { id: req.params.id, name: req.params.id };
    try {
      const userData = await User.findByPk(user.id);
      if (!userData) {
        res.status(404).json({ msg: "Erro: usuário não encontrado" });
      } else {
        let { id, name } = userData;
        res.status(200).json({ msg: "Autenticado", id, name });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro: Interno do servidor!" });
    }
  },
  findUserName: async (req, res) => {
    const name = req.params.name;
    try {
      const user = await User.findOne({
        where: {
          name: { [db.Sequelize.Op.like]: `%${name}%` },
        },
        order: [["name", "desc"]],
      });
      if (!user) {
        res.status(400).json({ msg: "Erro: usuário não encontrado." });
      } else {
        res.status(200).json({ msg: "Autenticado", name: name, user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro: ao buscar a usuário", error });
    }
  },
  processLogin: async (req, res) => {
    try {
      //Receber os dados via body(corpo da Requisição) do formulário;
      const { name, password } = req.body;

      //Buscou no banco por um registro;
      const user = await User.findOne({
        where: {
          name: { [db.Sequelize.Op.like]: `%${name}%` },
        },
        order: [["name", "desc"]],
      });
      // Verificar se o usuário NÃO foi encontrado
      if (!user) {
        return res.status(404).json({ msg: "Usuario não encontrado!" });
      }
      //Extrai o nome do usuario que esta no campo nome;
      const nameUser = user.dataValues;
      // Compara as duas senhas;
      const hashPsw = bcrypt.compareSync(password, nameUser.password);

      // Autenticação. Verifica se as credenciais(Nome e Senha) são verdadeiras;
      if (nameUser.name === name && hashPsw === true) {
        // Gerar o token JWT
        const token = jwt.sign({ 
          id: user.id, 
          name: user.name, 
        }, secretKey, 
          { expiresIn: 6000 },);//segundos
        // Response o dados do usuario mais o token;
        return res.status(200).json({
          msg: "Autenticado",
          id: user.id, 
          name: user.name,
          token,
        });
      } else {
        return res.status(401).json({
          msg: "Credenciais inválidas!",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro inteno do servidor" });
    }
  },
  profile: async (req, res) => {
    try {
      res.send("Bem vindo ao Perfil")
      
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: "Erro: credenciais inconsistentes." });
    }
  },
};

module.exports = userController;
