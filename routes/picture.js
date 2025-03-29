// Importando o express paramanipular as rotas 
const express = require("express");
//Criando um arquivo de rotas pelo Express
const router = express.Router();

//Importando o middleware de Upload (multer)
const upload = require("../config/multer");

//Controlador dos imagens função lógias (GET, POST, e ETC ...)
const PictureControler = require("../controllers/PictureControllers");

// Definindo a rota POST (Upoload da Img e Armaz. do DB)
router.post("/", upload.single("file"), PictureControler.create);

//Definindo a rota GET (trazer todas as imagens do DB)
router.get("/", PictureControler.findAll);

//Exportando para utilizar em outros arquivos
module.exports = router;
