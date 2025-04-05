// Express para criar o servido e definir rotas
const express = require("express");

//Crio uma instânica do Express
const app = express();

//Carrega variáveis de ambiente do arquivo .env
require("dotenv").config();

//Estabelece  a conexão com o DB, feito pelo DB.js
require("./db");

//Define a porta do servidor (.ENV ou 3000)
const port = process.env.PORT || 4000;

//Importa o roteador de img. para utilizar as Rotas
const pictureRouter = require("./routes/picture");

//Define que toda rotas começam com pictures
//Será tratada os envios (GET, POST e ETC), pelo pictureRouter
//http://localhost:4000/pictures
app.use("/pictures", pictureRouter);

app.listen(port, () => {
    console.log(`O Servidor executar na porta ${port}`);
});