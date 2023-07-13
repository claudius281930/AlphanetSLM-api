const db = require("../db/models");
const User = db.User;

const userController = {
  findUser: async (req, res) => {
    //Para tratamento de erros
    try {
      //Faz uma chamada  na base usando o metodo apropriado e armazena o resultado na constante;
      const users = await User.findAll();
      //Verifica se os dados existem na basa;
      if (users !== undefined) {
        //Retorna um Response com o status code e os dados em json se existir;
        res.status(200).json({ users });
      } else {
        //Retorna um Response com o status code e os dados em json caso seja undefined;
        res.status(500).json({msg: "Usuário NÂO existe na base"});
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({err:error});
    }
  },
  createUser: async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    try {
      const user = await User.create({
        name: name,
        password: password,
      });
      if (user.name === name) {
        res.status(201).json({ msg: "Usuario criado na base!" });
      } else {
        res.status(500).json({ msg: "Falha ao tentar criar um usuario." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao criar a usuario" });
    }
  },
};
module.exports = userController;
