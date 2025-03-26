const Picture = require("../models/Picture");

const fs = require("fs");

exports.creat = async (req, res) => {
  res.json("Ok!");

  try {
    const { name } = req.body;

    const file = req.file;

    const picture = new Picture({
      name,
      scr: file.path,
    });

    await picture.save();

    res.json({ picture, msg: "Imagem salva com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar!" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const pictures = await Picture.find();

    res.json(pictures);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar!" });
  }
};
