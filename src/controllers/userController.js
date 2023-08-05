const db = require("../db/models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
//variável de ambiente para armazenar a chave secreta do JWT
//const secretKey = process.env.JWT_SECRET || "meuProjetoProvider";
/* require("dotenv").config()
const secretKey = process.env.JWT_SECRET */

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
    //Receber os dados via body;
    const { name, password } = req.body;
    //Buscou no banco por um registro;
    const user = await User.findOne({
      where: {
        name: { [db.Sequelize.Op.like]: `%${name}%` },
      },
      order: [["name", "desc"]],
    });
    //Extrai o nome do usuario que esta no campo nome;
    const nameUser = user.dataValues;
    // Compara as duas senhas;
    const hashPsw = await bcrypt.compareSync(password, nameUser.password);
    // Verifica se as credenciais(Nome e Senha) são verdadeiras;
    if (nameUser.name === name && hashPsw === true) {
      return res.status(200).json({ msg: "Credenciais válida!", user: user });
    } else {
      return res.status(404).json({ msg: "Credenciais inválidas!" });
    }
  },
  profile: async (req, res) => {
    const { name } = req.body;
    const userNameProfile = await User.findOne({
      where: {
        name: { [db.Sequelize.Op.like]: `%${name}%` },
      },
      order: [["name", "desc"]],
    });
    try {
      const userFindName = userNameProfile;
      if (userFindName.name === name) {
        return res.status(200).json({
          msg: "Usuario encontrado!",
          page: "'Profile'",
          userFindName,
        });
      } else {
        return res
          .status(404)
          .json({ mgs: "Usuario: inválido ou não encontrado!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mgs: "erro no servidor" });
    }
  },
};

module.exports = userController;
