const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const secretKey = "meuProjetoProvider";

module.exports = {
  eUser: async (req, res, next) => {
    //obter o cabeçalho de autorização;
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    //Verifica se não existe o cabeçalho;
    if (!authHeader) {
      return res.status(400).json({
        erro: true,
        msg: "Erro: login necessário!",
      });
    }
    //extrair o token JWT do cabeçalho de autorização, desestrutura o que não nos interessa e o split para dividir a string authHeader em dois elementos separado por espaço;
    const [, token] = authHeader.split(" ");
    //console.log("token: " + token);
    //Verifica se o token não é válido;
    if (!token) {
      return res.status(400).json({
        erro: true,
        msg: "Erro: necessário Token",
      });
    }
    try {
       //verificar e decodificar o token JWT recebido na requisição;
       //Promisify transforma uma função de callback em uma função que retorna uma promise. Permitindo que possamos usar await;
      const decode = await promisify(jwt.verify)(token, secretKey);
      // Armazene o ID do usuário no objeto de requisição para uso posterior, se necessário;
      req.userId = decode.id;
      // Se não houver erro prossiga;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        erro: true,
        msg: "Erro: login necessário(server-side)",
      });
    }
  },
};
