const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const secretKey = "meuProjetoProvider";//JCNLCBSLCBSLSCSL

module.exports = {
  eAdmin: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return res.status(400).json({
        erro: true,
        msg: "Erro: login mau-sucedidio!",
      });
    }
    const [, token] = authHeader.split(" ");
    console.log("token: " + token);
    if (!token) {
      return res.status(400).json({
        erro: true,
        msg: "Erro: necessário Token",
      });
    }
    try {
      const decode = await promisify(jwt.verify)(token, secretKey);
      // Armazene o ID do usuário no objeto de requisição para uso posterior, se necessário;
      req.userId = decode.id;
      return next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        erro: true,
        msg: "Erro: Token expirado.",
      });
    }
  },
};
