//const { Op } = require("sequelize");
const { Error, CHAR } = require("sequelize");
const db = require("../db/models");
const Box = db.Box;

const mainController = {
  // chave : valor
  pageSearch: async (req, res) => {
    //let token = req.headers["authorization"];
    res.status(202).json({
      msg: "Conexão aceita. Exibição da página permitida.",
    });
  },
  pageFormCreateBox: (req, res) => {
    res
      .status(202)
      .json({ msg: "Conexão aceita. Exibição da página permitida." });
  },
  pageFormDeleteBox: async (req, res) => {
    res
      .status(202)
      .json({ msg: "Conexão aceita. Exibição da página permitida." });
  },
  pageFormUpdateBox: async (req, res) => {
    res
      .status(202)
      .json({ msg: "Conexão aceita. Exibição da página permitida." });
  },
  //CREATE
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
  // Refatorado!!
  findBox: async (req, res) => {
    try {
      // Definir uma pagina padrão;
      let { page = 1 } = req.query; //req.params.body;
      //Garantir que a page sempre seja um numero inteiro;
      page = +page;
      // Definir uma página padrão válida
      if (isNaN(page) || page <= 0) {
        page = 1;
      }
      //Limitando a quantidade de intens a serem retornados;
      const limit = 2;
      //Calcula a paginação com os seus itens de exibição
      let offset = page * limit - limit;
      //Pegando a quantidade de dados e os dados em si. Row = linha(values);
      let boxes = await Box.findAll({
        //Ordena o ID do mais alto para o mais baixo;
        order: [["id", "DESC"]],
        //Limitando a quantidade de intens a serem retornados;
        limit,
        //Calcualando a quantidade de intens por paginas;
        offset,
      });
      // Não favorece a peformance = { count: total, rows: boxes }= await Box.findAndCountAll;
      const total = await Box.count();
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
  // Refatorado!!
  findDetailBox: async (req, res) => {
    try {
      //Rota parametrizada.
      const nameDescription = req.params.name_description;
      if (!nameDescription || !/^[a-zA-Z]+$/.test(nameDescription)) {
        throw new Error(
          "Nome inválido. Por favor, forneça um nome válido contendo apenas caracteres alfabéticos."
        );
      }
      const box = await Box.findAll({
        where: {
          name_description: {
            [db.Sequelize.Op.like]: `%${nameDescription}%`,
          },
        },
        //Inclui os dados do modelo associado!!
        include: [
          {
            //Definição do modelo que iré se relacionamento " Fusion ";
            model: db.Fusion,
            //Nome do relacionamento com o modelo " Fusion ";
            as: "fusions",
            //A associação é obrigatória;
            required: true,
            //Inclui os dados do modelo associado!!
            include: [
              {
                //Definição do modelo que iré se relacionamento " Color ";
                model: db.Color,
                //Nome do relacionamento com o modelo " colouring ";
                as: "colouring",
                //A associação é obrigatória
                required: true,
                //Inclui os dados do modelo associado!!
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
      });
      //Responde com status code 200, o nome do objeto e todo os dados do objeto. Isso tudo em json;
      res.status(200).json({ msg: nameDescription, box });
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: err.message });
    }
  },
  // Refatorado!!
  findByIdBox: async (req, res) => {
    try {
      const id = req.params.id;

      //Buscar no db.
      const box = await Box.findByPk(id);
      //Verificar se não encontrou.
      if (!box) {
        res.status(404).json({ msg: "Caixa não encontrada ou não exite!" });
      } else {
        res.status(200).json(box);
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: err.message });
    }
  },
  //ainda fazendo
  /*findBoxBySearch: async (req, res) => {
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
  },*/
  // Refatorado!!
  findByName: async (req, res) => {
    try {
      const nameDescription = req.params.name_description;
      const box = await Box.findOne({
        // Config para consultar o DB.
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
  // Refatorado!!
  findByLocale: async (req, res) => {
    try {
      const nameLocale = req.params.locale;
      // Definir uma pagina padrão;
      let { page = 1 } = req.query;
      //Garantir que a page sempre seja um numero inteiro;
      page = +page;
      // Definir uma página padrão válida
      if (isNaN(page) || page <= 0) {
        page = 1;
      }
      //Limitando a quantidade de intens a serem retornados;
      const limit = 2;
      //Calcula a paginação com os seus itens de exibição
      let offset = page * limit - limit;
      //Pegando a quantidade de dados e os dados em si. Row = linha(values);
      const box = await Box.findAll({
        where: {
          locale: {
            [db.Sequelize.Op.like]: `%${nameLocale}%`,
          },
        },
        //Ordena o ID do mais alto para o mais baixo;
        order: [["id", "DESC"]],
        limit,
        offset,
      });
      // Verifica se NÃO existe;
      if (!box) {
        res
          .status(404)
          .json({ msg: "Nenhum objeto encontrado com o local fornecido." });
      } else {
        res.status(200).json({ msg: nameLocale, box });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Erro ao buscar o objeto pelo local.", err });
    }
  },
  // Refatorado!!
  findByNetworkTechnology: async (req, res) => {
    try {
      const nameNetworkTechnology = req.params.networkTechnology;
      // Definir uma pagina padrão;
      let { page = 1 } = req.query;
      //Garantir que a page sempre seja um numero inteiro;
      page = +page;
      // Definir uma página padrão válida
      if (isNaN(page) || page <= 0) {
        page = 1;
      }
      //Limitando a quantidade de intens a serem retornados;
      const limit = 2;
      //Calcula a paginação com os seus itens de exibição
      let offset = page * limit - limit;
      //Pegando a quantidade de dados e os dados em si. Row = linha(values);
      const box = await Box.findAll({
        where: {
          networkTechnology: {
            [db.Sequelize.Op.like]: `%${nameNetworkTechnology}%`,
          },
        },
        //Ordena o ID do mais alto para o mais baixo;
        order: [["id", "DESC"]],
        //Limitando a quantidade de intens a serem retornados;
        limit,
        //Calcualando a quantidade de intens por paginas;
        offset,
      });
      const total = await Box.count();      
      // Verifica se NÃO existe;
      if (!box) {
        res.status(404).json({ msg: "Nenhum objeto encontrado com o local fornecido." });
      } 
      // Verifica se existe intens para ser paginados.
      else if (box < offset) {
        return res.status(200).json({ mgs: "Não há mais páginas!" });
      } else {
        res.status(200).json({ msg: nameNetworkTechnology, box, total });
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
