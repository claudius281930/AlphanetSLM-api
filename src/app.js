const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const path = require("path");

//Criar a tabela `user` na base apos startar o app.js
//const User = require("./db/models/User");

const mainRouter = require(path.join(__dirname, "./routes/mainRouter"));
const registerRouter = require(path.join(__dirname, "./routes/registerRouter"));
const userRouter = require(path.join(__dirname, "./routes/userRouter"));

const app = express();

// Configuração da Sessão;
app.use(
  session({
    // Uma chave secreta usada para assinar o cookie da sessão;
    secret: "m3uPr0j3tOPr0v1dEr",
    //garantir que a sessão não expire enquanto o usuário está ativo no site;
    resave: true, //true
    // Permite que uma sessão seja criada mesmo para solicitações que não têm dados da sessão
    saveUninitialized: false, //true
    cookie: {
      // Tempo de vida do cookie da sessão em milissegundos (1 hora neste exemplo);
      maxAge: 400000,
      // TRUE? se o cookie só pode ser enviado através de conexões HTTPS;
      secure: false,
      // TRUE: Impede que o cookie seja modificado pelo JavaScript do cliente. Mais seguro;
      httpOnly: true,
    },
  })
);

//View engine setup;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "../public"))); // precisa definir o caminho certinho para funcionar ../
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// rotas e Middlewares de aplicação(global);
app.use("/", mainRouter);
app.use("/", registerRouter);
app.use("/", userRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

// inicia o servidor na porta especificada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

module.exports = app;
