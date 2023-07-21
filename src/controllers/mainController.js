//const { Op } = require("sequelize");
const db = require("../db/models");

const Box = db.Box;
const Fusion = db.Fusion;
const Color = db.Color;
const Link = db.Link;

const mainController = {
  /* ****************************** */
  pageFormCreateBox: (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    res.render("create/create_box_form", { currentDate });
  },
  createBox: async (req, res) => {
    const body = req.body;
    try {
      const object = await Box.create(body);
      res.status(201).json({ msg: "Caixa criada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar a caixa" });
    }
  },
  getBoxById: async (req, res) => {
    //   const id = req.body.id;
    //   console.log({ valor: id });
    //   try {
    //     const response = await boxRequest.getBoxId(id);
    //     const box = response.data;
    //     console.log(box);
    //     if (!box) {
    //       return res.render("error", { msg: "caixa não encontrada" });
    //     } else {
    //       return res.render("find/boxId", { idBox: box });
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       // Erro de resposta da API
    //       console.log(error.response.status);
    //       console.log(error.response.data);
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // Erro de requisição (sem resposta)
    //       console.log(error.request);
    //     } else {
    //       // Outro tipo de erro
    //       console.log("Erro", error.message);
    //     }
    //     res.render("error", { nameBox: [] });
    //   }
  },
  pageFormUpdateBox: async (req, res) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const id = req.body.id;
    res.render("update/updateBox", { currentDate, id: id });
  },
  /* *********************** */
  createFusion: async (req, res) => {
    const body = req.body;
    try {
      const object = await Fusion.create(body);
      res.status(201).json({ msg: "Fusão criada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar a fusão" });
    }
  },
  createColor: async (req, res) => {
    const body = req.body;
    try {
      const object = await Color.create(body);
      res.status(201).json({ msg: "Cores criada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar as cores" });
    }
  },
  createLink: async (req, res) => {
    const body = req.body;
    try {
      const object = await Link.create(body);
      res.status(201).json({ msg: "Link criada com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Erro ao criar link" });
    }
  },
  findBox: async (req, res) => {
    try {
      // Definir uma pagina padrão;
      let { page = 1 } = req.query;
      //Garantir que a page sempre seja um numero inteiro;
      page = parseInt(page);
      // Definir uma página padrão válida
      if (isNaN(page) || page <= 0) {
        page = 1;
      }
      //Limitando a quantidade de intens a serem retornados;
      const limit = 6;
      //Calcula a paginação com os seus itens de exibição
      let offset = page * limit - limit;
      //Pegando a quantidade de dados e os dados em si;
      let { count: total, rows: boxes } = await Box.findAndCountAll({
        limit: limit,
        //Calcualando a quantidade de intens por paginas;
        offset: offset, //(1 * 6) - 6 = 0(pagina);
        order: [["id", "DESC"]],
      });
      //Retorna o status code para uma requisição bem-sucedida.
      return res.status(200).json({ boxes, total });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Erro ao buscar as caixas",
        error: error,
      });
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
      const colors = await Color.findAll(/*{ limit: 10 }*/);
      res.status(200).json(colors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar as cores" });
    }
  },
  //TB-Link;
  findLink: async (req, res) => {
    try {
      const links = await Link.findAll(/*{ limit: 10 }*/);
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
        //Carrega os dados do modelo associado;
        include: [
          {
            //Definição do modelo que iré se relacionamento " Fusion ";
            model: db.Fusion,
            //Nome do relacionamento com o modelo " Fusion ";
            as: "fusions",
            //A associação é obrigatória;
            required: true,
            //Carrega os dados do modelo associado;
            include: [
              {
                //Definição do modelo que iré se relacionamento " Color ";
                model: db.Color,
                //Nome do relacionamento com o modelo " colouring ";
                as: "colouring",
                //A associação é obrigatória
                required: true,
                //Carrega os dados do modelo associado;
                include: [
                  {
                    //Definição do modelo que iré se relacionamento " Link ";
                    model: db.Link,
                    //Nome do relacionamento com o modelo " links ";
                    as: "links",
                    //A associação é obrigatória;
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
        //Ordenar o tipo de dados por ascendente;
        order: [["name_description", "asc"]],
      });
      //Responde com status code 200 e retorna os objeto json;
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
  //ainda fazendo
  findBoxBySearch: async (req, res) => {
    let searchTerm = req.params.searchTerm;

    let box;
    try {
      // É um ID, fazer busca por ID
      if (isNaN === searchTerm) {
        //se for um numero jogue para esta rota
        box = await Box.findByPk(searchTerm);
      } else {
        // É um name_description, fazer busca por name_description
        box = await Box.findOne({
          where: {
            name_description: {
              [db.Sequelize.Op.like]: `%${searchTerm}%`,
            },
          },
          order: [["name_description", "asc"]],
        });
      }
      res.status(200).json(box);
    } catch (error) {
      console.error(error, "Algo deu errado!");
      return res.status(500).send("Erro interno do servidor.");
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
      await Box.update(box, {
        //consulta a base com comando sql;
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
    const id = req.params.id;
    try {
      const deleteBox = await Box.destroy({
        //consulta a base com comando sql;
        where: { id },
      });
      if (!deleteBox) {
        res.status(404).json({
          msg: "Não foi possivel excluir a caixa ou a ela não existe",
        });
      } else {
        res.status(200).json({ msg: "Caixa excluida com sucesso!" });
      }
    } catch (err) {
      console.error();
      res.status(500).json({ msg: "Erro ao tentar excluir a caixa" });
    }
  },
};
module.exports = mainController;
