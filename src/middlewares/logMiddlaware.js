// const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
// const secretKey = "meuProjetoProvider";
// /* require("dotenv").config()
// const secretKey = process.env.JWT_SECRET */

const db = require("../db/models");
const User = db.User;
const bcrypt = require("bcrypt");

const eUser = {
  eUser: async (req, res, next) => {
    // Utiliza os dados amazenados no req para autentição;
    const { name, password } = req.body;
    try {
      //Buscou no banco por um registro fornecido no body;
      const user = await User.findOne({
        where: {
          name,
        },
      });
      // Se o usuário não for encontrado;
      if (!user) {
        return res.status(401).json({ msg: "Usuário não autorizado." });
      }
      // Verificar se a senha corresponde à senha armazenada no banco de dados;
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      // Verifica se os dados do req e base são os mesmos;
      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }
      // Se as credenciais estiverem corretas, segue com o fluxo;
      return next(); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Erro interno do servidro." });
    }
  },
};

module.exports = eUser;
