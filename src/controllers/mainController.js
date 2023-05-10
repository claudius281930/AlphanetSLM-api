const { Op } = require("sequelize");
const db = require("../db/models");
const Box = db.Box;

const mainController = {
  //CREATE;
  create: async (req, res) => {
    try {
      const box = await Box.create(req.body);
      res.status(201).json({ msg: "Caixa criada com sucesso!!", box });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar a caixa" });
    }
  },
  //READ;
  /*findAll: (req, res) => {
    Box
      .findAll()
      .then((boxs) => {
        res.status(200).json(boxs);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err); // 500 = Internal Error
      });
  },*/
  findAll: async (req, res) => {
    try {
      const boxes = await Box.findAll({
        include: [
          {
            model: db.Fusion,
            as: "fusions",
            required: true,
            include: [
              {
                model: db.Color,
                as: "colouring",
                required: true,
                include: [
                  {
                    model: db.Link,
                    as: "links",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).json(boxes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as caixas" });
    }
  },
  //id
  findById: async (req, res) => {
    try {
      const box = await Box.findByPk(req.params.id);
      if (!box) {
        res.status(404).json({ msg: "Caixa não encontrada" }); // 404 = Not Found
      } else {
        res.status(200).json(box);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar a caixa" });
    }
  },
  //nome;
  /*findOne: async (req, res) => {
    try {
      const caixa = await Caixa.findOne({
        where: { nome_descricao: "bprv" },
      });
      if (!caixa) {
        res.status(404).json({ msg: "Caixa não encontrada" });
      } else {
        res.status(200).json(caixa);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar a caixa" });
    }
  },*/
  //Ainda sem funcionar
  findLike: async (req, res) => {
    try {
      const box = await Box.findAll({
        where: {
          name_description: {
            [db.Sequelize.Op.like]: `%${req.params.name_description}$%`,
          },
        },
        order: [["name_description", "asc"]],
      });
      res.status(200).json(box);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as caixas" }); //no content
    }
  },
  //UPDATE;
  update: async (req, res) => {
    try {
      const linhaASerAtualizada = await Box.update(req.params.body, {
        where: { id: req.params.id },
      });
      if (!linhaASerAtualizada) {
        res.status(404).json({ msg: "Caixa não encontrada" });
      } else {
        res.status(200).json({ msg: "Caixa atualizada com sucesso!" });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao atualizar a caisa" });
    }
  },
  //PATCH;
  partialUpdate: async (req, res) => {
    try {
      const linhaASerAtualizada = await Box.update(req.params.body, {
        where: { id: req.params.id },
      });
      if (!linhaASerAtualizada) {
        res.status(404).json({ msg: "Caixa não encontrada" });
      } else {
        res.status(200).json({ msg: "Caixa atualizada com sucesso!" });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao atualizar a caixa" });
    }
  },
  //DELETE;
  destroy: async (req, res) => {
    try {
      const { id } = req.params.id;
      const excluirBox = await Box.destroy({
        where: { id },
      });
      if (!excluirBox) {
        res.status(404).json({ msg: "Não foi possivel excluir a caixa" });
      } else {
        res.status(200).json({ msg: "Caixa excluido com sucesso!" });
      }
    } catch (err) {
      console.error();
      res.status(500).json({ msg: "Erro ao tentar excluir a caixa" });
    }
  },
};
module.exports = mainController;
