const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    name: { type: String, required:true },
    scr: { type: String, required: true},
});

module.exports = mongoose.model("Picture", PictureSchema);