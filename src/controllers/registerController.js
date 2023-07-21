const db = require("../db/models");
const User = db.User;
const bcrypt = require("bcrypt");

const userController = {
  createUser: async (req, res) => {
    try {
      let { name, password } = req.body;
      let hash = bcrypt.hashSync(password, 8);
      /*console.log(hash);*/
      //Somente informa se as senhas são compativeis
      //console.log(bcrypt.compareSync(password, hash));
      let user = await User.create({
        name: name,
        password: hash,
      });
      if (user.name === name) {
        res.status(201).json({ msg: "Usuario criado na base!" });
      } else {
        res.status(500).json({ msg: "Falha ao tentar criar usuario." });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar a usuario" });
    }
  },
};
module.exports = userController;
