//const db = require("../src/db/models");
const express = require("express");

const mainRouter = require("./routes/mainRouter");

const app = express();
app.use(express.json());

// rotas da sua API
app.use("/", mainRouter);
app.use("/box",mainRouter);
app.use("/fusion",mainRouter);
app.use("/color",mainRouter);
app.use("/link",mainRouter);

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
