const db = require("../db/models");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    const { name, password } = req.body;
    try {
      // Verificar se o usuário existe na base;
      const getUser = await User.findOne({
        //attributes: ["id", "name"],
        where: { name },
      });
      //Verifica se o usuario não existe;
      if (!getUser) {
        return res.status(400).json({ msg: "Usuário não encontrado" });
      }
      //Compara a senha que foi gerado com bcrypt;
      const verifyPsw = await bcrypt.compare(password, getUser.password);
      //Verifica se a senha esta incorreta;
      if (!verifyPsw) {
        return res.status(400).json({ msg: "Senha inválida" });
      }
      //Verifica se é admin. Assumindo que o modelo de usuário tem um campo "isAdmin" que indica se o usuário é administrador;
      const isAdmin = getUser.isAdmin;
      //Ternrário que verifica o tipo de permissão;
      const secretKey = isAdmin
        ? "souAdminDoProjetoProvider"
        : "meuProjetoProvider";
      // Gerar o token JWT com o campo "role" definido como "admin" para usuários administradore;
      let token;
      //Verifica se é um admin;
      if (getUser.isAdmin) {
        // Gerar o token JWT para admin;
        token = jwt.sign({ id: getUser.id, role: "admin" }, secretKey, {
          algorithm: "HS256",
          expiresIn: 30000, //30seg,
        });
      } else {
        //Gera o token JWT para usuario;
        token = jwt.sign({ id: getUser.id }, secretKey, {
          algorithm: "HS256",
          expiresIn: 30000, //30seg,
        });
      }
      //Dados do usuario logado;
      const userLoggedComplete = {
        id: getUser.id,
        name: getUser.name,
        isAdmin,
        token,
      };
      // Autenticação bem-sucedida;
      res.status(200).json({ msg: "Login bem-sucedido", userLoggedComplete });
    } catch (error) {
      console.error(error);
      res.status(500).json({ err: error });
    }
  },
};
module.exports = userController;
