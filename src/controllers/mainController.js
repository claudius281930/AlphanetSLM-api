const db = require("../db/models/");
const bprv = db.bprv; //nome da const deve ser o mesmo da TB no DB

const caixaController = {
  //CREATE;
  create: async (req, res) => {
    const cx = req.body;

    try {
      await bprv.create(cx);
      res.status(201).json({ msg: "Caixa criada com sucesso!!" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //READ;
  findAll: (req, res) => {
    bprv
      .findAll()
      .then((cx) => {
        res.status(200).json(cx);
      })
      .catch((err) => {
        res.status(500).json(err); // 500 = Internal Error
      });
  },
  //id
  findById: (req, res) => {
    bprv
      .findByPk(req.params.id)
      .then((cx) => {
        if (!cx) {
          res.status(404).json(cx); // 404 = Not Found
        } else {
          res.status(200).json(cx);
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },
  //nome
  /*findByName: (req, res) => {
    Caixa.findByPk(req.params.nome)
      .then((cx) => {
        if (!cx) {
          res.status(404).json(cx); // 404 = Not Found
        } else {
          res.status(200).json(cx);
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },*/
  //UPDATE;
  update: async (req, res) => {
    const id = req.params.id;
    const cx = req.body;

    try {
      await bprv.update(cx, { where: { id } }); //atualizando a caixa
      res.status(201).json({ msg: "Caixa atualizada com sucesso!!" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //PATCH; ainda não consiguir implementar
  parcial: async (req, res) => {
    const id = req.params.id;
    const cx = req.body;

    try {
      await bprv.patch(cx, { where: { id } }); //atualizando o caixa
      res
        .status(201)
        .json({ msg: "Caixa parcialmente atualizada com sucesso!!" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //DELETE;
  destroy: async (req, res) => {
    const id = req.params.id;

    try {
      await bprv.destroy({ where: { id } }); //excluindo o caixa
      res.status(200).json({ msg: "Caixa excluída com sucesso!" });
    } catch (err) {
      res.status(400).json({ error: [...err] });
    }
  },
};
module.exports = caixaController;
/*
O modelo tembém deve ser um por TB.
E o nome da cosnt deverá tembém ser o 
mesmo da TB no DB
*/