const db = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = db.User;

const userController = {
  findUsers: async (req, res) => {
    //Para tratamento de erros
    try {
      //Faz uma chamada  na base usando o metodo apropriado e armazena o resultado na constante;
      const users = await User.findAll({
        //atributos que quero buscar;
        attributes: ["id", "name" /*'password'*/],
        order: [["id", "DESC"]],
      });
      //Verifica se os dados existem na basa;
      if (users !== undefined) {
        //Retorna um Response com o status code e os dados em json se existir;
        res.status(200).json({ users });
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
    const id = req.params.id;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(400).json({ msg: "Erro: usuário não encontrado" }); // 404 = Not Found
      } else {
        res.status(200).json(user);
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
        order: [["name", "asc"]],
      });
      if (!user) {
        res.status(400).json({ msg: "Erro: usuário não encontrado." });
      } else {
        res.status(200).json({ msg: name, user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro: ao buscar a usuário", error });
    }
  },
  processLogin: async (req, res) => {
    const { name, password /* email */ } = req.body;
    try {
      // Verificar se o usuário existe na base;
      const getUser = await User.findOne({
        //attributes: ["id", "name"],
        where: { name },
      });

      if (!getUser) {
        return res.status(400).json({ msg: "Usuário não encontrado" });
      }
      const verifyPsw = await bcrypt.compare(password, getUser.password);
      //Exibe se a senha confere;
      if (!verifyPsw) {
        return res.status(400).json({ msg: "Senha inválida" });
      }
      // Gerar o token JWT;
      const token = jwt.sign({ id: getUser.id }, "meuProjetoProvider", {
        algorithm: "HS256",
        expiresIn: "1h",
      });
    
      //Dados do usuario logado;
      const userLoggedComplete = {
        id: getUser.id,
        name: getUser.name,
        token,
      };
      // Autenticação bem-sucedida;
      res.status(200).json({ msg: "Login bem-sucedido",
       userLoggedComplete });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: error });
    }
  },
};
module.exports = userController;
