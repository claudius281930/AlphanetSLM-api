const db = require("../db/models");
const User = db.User;
const bcrypt = require("bcrypt");

const userController = {
  createUser: async (req, res) => {
    try {
      let { name, password } = req.body;
      const salt = await bcrypt.genSaltSync(8);
      let hash = bcrypt.hashSync(password, salt);
            
      let user = await User.create({
        name: name,
        password: hash,
      });
      if (user.name === name) {
        res.status(201).json({ msg: "Usuario criado na base!" });
      } else {
        res.status(500).json({ msg: "Falha ao registrar o usuario." });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar a usuario" });
    }
  },
};
module.exports = userController;
