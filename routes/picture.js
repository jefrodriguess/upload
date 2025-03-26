const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const PictureControler = require("../controllers/PictureControllers");

router.post("/", upload.single("file"), PictureControler.create);
