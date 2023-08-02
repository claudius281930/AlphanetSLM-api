const db = require("../db/models");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const session = require("express-session");
//variável de ambiente para armazenar a chave secreta do JWT
const secretKey = process.env.JWT_SECRET || "meuProjetoProvider";


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
    const user = { id: req.params.id, name: req.params.id };
    try {
      const userData = await User.findByPk(user.id);
      if (!userData) {
        res.status(404).json({ msg: "Erro: usuário não encontrado" });
      } else {
        let { id, name } = userData;
        res.status(200).json({ id, name });
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
        res.status(200).json({ msg: name, user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Erro: ao buscar a usuário", error });
    }
  },
  processLogin: async (req, res) => {
    //console.log(req.IncomingMessage);// ******** 
    const { name, password } = req.body;
    try {
      // Verificar se o usuário existe na base;
      const getUser = await User.findOne({
        where: { name },
      });
      console.log(getUser);// ******** 
      // Verificar se o USUÁRIO existe e se a SENHA está correta. Forma condensada de verificar duas condições;
      if (!getUser || !(await bcrypt.compare(password, getUser.password))) {
        console.log(getUser.name);
        return res.status(400).json({ msg: "Credenciais inválidas" });
      }
      // Após verificar as credenciais do usuário;
      const token = jwt.sign(
        { id: getUser.id, role: getUser.role },
        secretKey,
        {
          // Terceiro parametro, mas não obrigatório;
          algorithm: "HS256",
          expiresIn: 40000, //40seg,
        }
      );
      console.log(token);// ******** 
      //Dados do usuario logado que será enviado nas requisições HTTPS (Cookie);
      const userLoggedComplete = {
        id: getUser.id,
        name: getUser.name,
        role: getUser.name,
        token,
      };
      //console.log(userLoggedComplete);
      // Armazenar o ID do usuário na sessão
      req.session.userId = getUser.id;
      console.log(req.session.userId)// ******** 

      // Autenticação bem-sucedida;
      res.status(200).json({ msg: "Login bem-sucedido", userLoggedComplete });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: error });
    }
  },
  profile: async (req, res) => {
    // Obter o ID do usuário da sessão
     const userId = req.session.userId;
     console.log(userId);// ******
    try {
      // Verificar se o usuário está autenticado (ou seja, se o ID do usuário existe na sessão)
      if (userId) {
        // Se tive autenticado faz uma busca na base para comparar os IDs:
        const userData = await User.findByPk(userId);
        // Verificar se o usuário foi encontrado no banco de dados;
        if (!userData) {
          return res.status(404).json({ msg: "Usuário não encontrado" });
        }
        // Se tudo estiver correto, retornar os dados do usuário como resposta
        return res.status(200).json(userData);
      } else {
        // O usuário não está autenticado (ou seja, o ID do usuário não existe na sessão)
        return res.status(401).json({ msg: "Usuário não autenticado(server-side)" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  },
};

module.exports = userController;
