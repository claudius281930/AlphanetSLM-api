const eUser = {
  eUser: async (req, res, next) => {
    //Verifica se a sessão foi criada pelo servidor;
      if (req.session.user) {
        // O usuário está autenticado;
        res.status(200);
        return next();
      } else {
        // O usuário não está autenticado, redirecionar para a página de login ou exibir mensagem de erro;
        return res.redirect("/login");//status(401).json({msg:"Error: sessão não autorizada"})//
      }  
  },
};

module.exports = eUser;