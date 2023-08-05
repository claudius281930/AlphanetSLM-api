// const jwt = require("jsonwebtoken");
// const secretKey = "meuProjetoProvider";
// /* require("dotenv").config()
// const secretKey = process.env.JWT_SECRET */

// const cookieMiddleware = (req, res, next) => {
//   // Obtenha o token JWT do cookie de autenticação
//   const token = req.cookies.token;
//   //console.log(token);
//   try {
//     // Verifique se o token existe e é válido
//     if (token) {
//       // Verificar e decodificar o token JWT usando a chave secreta
//       const decoded = jwt.verify(token, secretKey);
//       // Armazene os dados do usuário autenticado no objeto de requisição para uso posterior, se necessário
//       req.userId = decoded.id;
//       // Se o token for válido, permita que a solicitação continue para a próxima rota
//       return next();
//     } else {
//       // Se o token não estiver presente no cookie, envie uma resposta de erro;
//       return res
//         .status(401)
//         .json({ msg: "Acesso não autorizado(CookieMiddleware)." });
//     }
//   } catch (error) {
//     // Se houver um erro ao verificar o token (por exemplo, token expirado ou inválido),
//     return res
//       .status(500)
//       .json({ msg: "Error: interno do servidor" });
//   }
// };

// module.exports = cookieMiddleware;
