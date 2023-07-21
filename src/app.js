//const db = require("../src/db/models");
const express = require("express");
const app = express();
//const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");

//Criar a tabela `user` na base apos startar o app.js
//const User = require("./db/models/User");

const mainRouter = require("./routes/mainRouter");
const registerRouter = require("./routes/registerRouter");
const userRouter = require("./routes/userRouter");

// session({
//   secret: "meuProjeto",
//   resave: true,
//   saveUninitialized: true,
// })
app.use(express.static(path.join(__dirname, "../public"))); // precisa definir o caminho certinho para funcionar ../
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

/*
Obs de extrema importância para o meu eu do futuro: o arquivo app.js cuja função é ser o entre points da aplicação
nessecita esta na mesma dependecia que a pasta node_modules.
caso queira pôr o mesmo em uma outra dependencia, diferente dá do node_modules, no aquivo package.json precisa-se informar
o caminha exato de onde o app.js estará.
ex:.. "main": "src/app.js",*/
