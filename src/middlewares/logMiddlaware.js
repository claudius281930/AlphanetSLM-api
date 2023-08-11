const jwt = require("jsonwebtoken");
const secretKey = "m3uPr0j3tOPr0v1dEr";
const { promisify } = require("util");

const eUser = {
  eUser: async (req, res, next) => {
    //obter o cabeçalho de autorização.'Bearer' e o 'token' AMBOS;
    const authHeader = req.headers.authorization;// campo que conterá o cabeçalho;
    // Verifica se não existe o cabeçalho;
    if (!authHeader) {
      // Response com a exceção;
      return res.status(400).json({
        erro: true,
        msg: "Middleware: erro token não existe",
      });
    }
    try {
      //Somente o Token [bearer,token]. Exclui o bearer;
      const [, token] = authHeader.split(" ");
      // Verifica se, e somente se, o token NÃO existe;
      if (!token) {
         // Response com a exceção;
        return res.status(400).json({
          erro: true,
          msg: "Middleware: erro token inválido",
        });
      }
      console.log({ headersToken: token });
      // Decodifica o token passado para garantir a integridade e validade do mesmo;
      const decode = await promisify(jwt.verify)(token, secretKey);
      req.user = decode.id;
      //Proseguir...
      return next();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ msg: "Middleware: erro interno do servidor" });
    }
  },
};

module.exports = eUser;