// Importa o modelo Picture que é a interação do banco de dados
const Picture = require("../models/Picture");

// Importa o fs para interagir com o sistema de arquivos (Não usado no cod.)
const fs = require("fs");

// Função para criar uma nova imagem no banco de dados
exports.create = async (req, res) => {
  try {
    // Pega a informação do nome do arquivo enviado pela requisição
    const { name } = req.body;

    // Obtém o arquivo da req. (Via multer)
    const file = req.file;

    // Cria uma nova instância do modelo Picture com o nome da img e caminho
    const picture = new Picture({
      name,
      src: file.path,
    });

    // Aqui envia para o banco ou seja salva a img no DB
    await picture.save();

    // Retorna a resposta com os dados da img salva
    res.json({ picture, msg: "Imagem salva com sucesso!" });
  } catch (err) {
    console.log(err)
    // Caso tenha erro durante o processo, retorna a mensagem ao usuário
    res.status(500).json({ message: "Erro ao salvar!" });
  }
};

// Função para buscar todas as img no DB
exports.findAll = async (req, res) => {
  try {
    // Busca todas img armazenadas no DB
    const pictures = await Picture.find();
    // Retorno todas img encontradas em formato de JSON
    res.json(pictures);
  } catch (err) {
    // Caso haja erro durante a busca, retorna mensagem ao usuário
    res.status(500).json({ message: "Erro ao buscar as imagens." });
  }
};
