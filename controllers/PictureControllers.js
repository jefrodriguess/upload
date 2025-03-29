const Picture = require("../models/Picture");

const fs = require("fs");

exports.creat = async (req, res) => {

  try {
    const { name } = req.body;

    const file = req.file;

    const picture = new Picture({
      name,
      scr: file.path,
    });

    await picture.save();

    res.json({ picture, msg: "Imagem salva com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar!" });
  }
};

// Função para buscar todas as img no DB
exports.findAll = async (req, res) => {
  try {

  //Busca todas img armazenadas no DB
    const pictures = await Picture.find();
  //Retorna todas img encontradas em formato JSON
    res.json(pictures);
  } catch (err) {
    // Caso haja erro durante a busca, retorna mensagem ao usuário
    res.status(500).json({ message: "Erro ao buscar!" });
  }
};

