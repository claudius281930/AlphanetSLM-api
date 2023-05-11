const { Op } = require("sequelize");
const db = require("../db/models");
const Box = db.Box;

const mainController = {
  //CREATE;
  create: async (req, res) => {
    const newBox = req.body;
    try {
      const box = await Box.create(newBox);
      res.status(201).json({ msg: "Caixa criada com sucesso!", box });
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
  //tras todo os detalhes das realções entre os modelos
  findDetail: async (req, res) => {
    const nameDescription = req.params.name_description;
    try {
      const box = await Box.findAll({
        where: {
          name_description: {
            [db.Sequelize.Op.like]: `%${nameDescription}%`,
          },
        },
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
        order: [["name_description", "asc"]],
      });
      res.status(200).json({msg:nameDescription,box});
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar os detalhes da caixa" });
    }
  },
  findById: async (req, res) => {
    const id = req.params.id;
    try {
      const box = await Box.findByPk(id);
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
    const nameDescription = req.params.name_description;
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
        res.status(200).json({msg:nameDescription,box});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar a caixa" });
    }
  },
  findByLocale: async (req, res) => {
    const nameLocale = req.params.locale;
    try {
      const box = await Box.findOne({
        where: {
          locale: {
            [db.Sequelize.Op.like]: `%${nameLocale}%`,
          },
        },
        order: [["locale", "asc"]],
      });

      if (!box) {
        res.status(404).json({ msg: "Nenhum objeto encontrado com o local fornecido." });
      } else {
        res.status(200).json({msg:nameLocale,box});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar o objeto pelo local." });
    }
  },
  //UPDATE;
  fullUpdate: async (req, res) => {
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
  //PATCH; sem funcionar e não precisa 
  /*partialUpdate: async (req, res) => {
    const id = req.params.id;
    const box = req.body;
    try {
      await Box.patch(box, { where: { id } });
      res.status(200).json({ msg: "Caixa atualizada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ msg: "Caixa não encontrada" });
    }
  },*/
  //DELETE;
  destroy: async (req, res) => {
    const id = req.params.id;
    try {
      const deleteBox = await Box.destroy({
        where: { id },
      });
      if (!deleteBox) {
        res.status(404).json({ msg: "Não foi possivel excluir a caixa ou a ela não existe" });
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
