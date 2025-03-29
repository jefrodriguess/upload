// Importando para upload de arquivos
const multer = require("multer"); //envia o arquivo
// Importa o path para manipulação de caminhos de arquivos (localiza a pasta)
const path = require("path") 

// Configura o armazenamento dos arquivos com Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //Função para definir o diretório dos arquivos (pasta)
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) { // Função para definir o nome do arquivo
        cb(null, Date.now() + path.extname(file.originalname)); //Define o nome do arquivo com a data e extensão original do arquivo
    },
});

// Configurando o middleware de Upload
const upload = multer({ storage});

//Exporta para utilizar em outros arquivos 
module.exports = upload;