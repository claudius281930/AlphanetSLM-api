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
  findAll: async (req, res) => {
    try {
      const boxes = await Box.findAll(/*{
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
      }*/);
      res.status(200).json(boxes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as caixas" });
    }
  },
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
  findByName: async (req, res) => {
    const nameDescription = req.params.nameDescription;
    try {
      const box = await Box.findOne({
        where: {
          name_description: { [db.Sequelize.Op.like]: `%${nameDescription}%` },
        },
        order: [["name_description", "asc"]],
      });
      if (!box) {
        res.status(404).json({ msg: "Nenhum objeto encontrado com o nome fornecido." });
      } else {
      res.status(200).json(box);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as caixas" });
    }
  },
  /*findByLocale: async (req, res) => {
  try {
    const name = req.params.name;
    const box = await Box.findOne({
      where: {
        locale: {
          [Op.eq]: locale,
        },
      },
    });
    
    if (box) {
      res.status(200).json(box);
    } else {
      res.status(404).json({ msg: 'Nenhum objeto encontrado com o nome fornecido.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao buscar o objeto pelo nome.' });
  }
},*/
  //UPDATE;
  update: async (req, res) => {
    const id = req.params.id;
    const box = req.body;
    try {
      await Box.update(box, { where: { id } });
      res.status(200).json({ msg: "Caixa atualizada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ msg: "Caixa não encontrada" });
    }
  },
  //PATCH;
  partialUpdate: async (req, res) => {
    const id = req.params.id;
    const box = req.body;
    try {
      await Box.update(box, {
        where: { id },
      });
      res.status(200).json({ msg: "Caixa atualizada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ msg: "Caixa não encontrada" });
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
