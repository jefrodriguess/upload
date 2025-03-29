const mongoose = require ("mongoose");

require("dotenv").congif();

mongoose.set("stricQuery", true);

async function main() {
    await mongoose.connect(

    );

    console.log("Conectou ao banco de dados!");
}

main().catch((err) => console.log(err));

