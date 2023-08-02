const jwt = require("jsonwebtoken");
const secretKey = "meuProjetoProvider";

const cookieMiddleware = (req, res, next) => {
  // Obtenha o token JWT do cookie de autenticação
  const token = req.cookies.token;
console.log(token)
  // Verifique se o token existe e é válido
  if (token) {
    try {
      // Verificar e decodificar o token JWT usando a chave secreta
      const decoded = jwt.verify(token, secretKey);

      // Armazene os dados do usuário autenticado no objeto de requisição para uso posterior, se necessário
      req.userId = decoded.id;
      
      // Se o token for válido, permita que a solicitação continue para a próxima rota
      return next();
    } catch (error) {
      // Se houver um erro ao verificar o token (por exemplo, token expirado ou inválido),
      // envie uma resposta de erro ou redirecione para a página de login
      return res.status(401).json({ message: "Acesso não autorizado(CookieMiddleware)." });
    }
  } else {
    // Se o token não estiver presente no cookie, envie uma resposta de erro ou redirecione para a página de login
    return res.status(401).json({ message: "Acesso não autorizado(CookieMiddleware)." });
  }
};

module.exports = cookieMiddleware;
