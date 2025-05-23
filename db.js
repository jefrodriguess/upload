// Importa para interagir com o banco de dados
const mongoose = require("mongoose");

// Carrega váriaveis de ambiente do arquivo .ENV
require("dotenv").config();

// Configura o mongoose para permitir  consulta (Restritas)
mongoose.set("strictQuery", true);

// Obtem as variaveis do .env
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Função para conectar ao DB
async function main() {
  await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster-api.r4sn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-API`
  );
  // Exibe a mensagem ao úsuario que realizou a conexão
  console.log("Conectou ao banco de dados!");
}

// Caso ocorra erro mostra uma mensagem
main().catch((err) => console.log(err));

// Exportar a função para utilizar em outro arquivo
module.exports = main;
