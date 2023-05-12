const { Op } = require("sequelize");
const db = require("../db/models");
const Box = db.Box;
const Fusion = db.Fusion;
const Color = db.Color;
const Link = db.Link;

const mainController = {
  //CREATE;
  //TB-Box;
  createBox: async (req, res) => {
    const body = req.body;
    try {
      const object = await Box.create(body);
      res.status(201).json({ msg: "Caixa criada com sucesso!", object });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar a caixa" });
    }
  },
  //TB-Fusion;
  createFusion: async (req, res) => {
    const body = req.body;
    try {
      const object = await Fusion.create(body);
      res.status(201).json({ msg: "Fusão criada com sucesso!", object });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar a fusão" });
    }
  },
  //TB-Color;
  createColor: async (req, res) => {
    const body = req.body;
    try {
      const object = await Color.create(body);
      res.status(201).json({ msg: "Cores criada com sucesso!", object });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar as cores" });
    }
  },
  //TB-Link;
  createLink: async (req, res) => {
    const body = req.body;
    try {
      const object = await Link.create(body);
      res.status(201).json({ msg: "Link criada com sucesso!", object });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar link" });
    }
  },

  //READ;
  //TB-Box;
  findBox: async (req, res) => {
    try {
      const boxes = await Box.findAll();
      res.status(200).json(boxes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as caixas" });
    }
  },
  //TB-Fusion;
  findFusion: async (req, res) => {
    try {
      const fusions = await Fusion.findAll();
      res.status(200).json(fusions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as fusões" });
    }
  },
  //TB-Color;
  findColor: async (req, res) => {
    try {
      const colors = await Color.findAll();
      res.status(200).json(colors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as cores" });
    }
  },
  //TB-Link;
  findLink: async (req, res) => {
    try {
      const links = await Link.findAll();
      res.status(200).json(links);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar os links" });
    }
  },
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
      res.status(200).json({ msg: nameDescription, box });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar os detalhes da caixa" });
    }
  },
  //TB-Box ID;
  findByIdBox: async (req, res) => {
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
  //TB-Fusion;
  findByIdFusion: async (req, res) => {
    const id = req.params.id;
    try {
      const fusions = await Fusion.findByPk(id);
      if (!fusions) {
        res.status(404).json({ msg: "Fusão não encontrada" }); // 404 = Not Found
      } else {
        res.status(200).json(fusions);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar a fusão" });
    }
  },
  //TB-Color;
  findByIdColor: async (req, res) => {
    const id = req.params.id;
    try {
      const colors = await Color.findByPk(id);
      if (!colors) {
        res.status(404).json({ msg: "Cores não encontrada" }); // 404 = Not Found
      } else {
        res.status(200).json(colors);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as cores" });
    }
  },
  //TB-Link;
  findByIdLink: async (req, res) => {
    const id = req.params.id;
    try {
      const links = await Link.findByPk(id);
      if (!links) {
        res.status(404).json({ msg: "Link não encontrada" }); // 404 = Not Found
      } else {
        res.status(200).json(links);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar o link" });
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
        res
          .status(404)
          .json({ msg: "Nenhum objeto encontrado com o nome fornecido." });
      } else {
        res.status(200).json({ msg: nameDescription, box });
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
        res
          .status(404)
          .json({ msg: "Nenhum objeto encontrado com o local fornecido." });
      } else {
        res.status(200).json({ msg: nameLocale, box });
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

  //DELETE;
  destroy: async (req, res) => {
    const id = req.params.id;
    try {
      const deleteBox = await Box.destroy({
        where: { id },
      });
      if (!deleteBox) {
        res.status(404).json({
          msg: "Não foi possivel excluir a caixa ou a ela não existe",
        });
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
