const express = require("express");
const connectDatabase = require("./database/db_connect");
const app = express();
require("dotenv").config();

connectDatabase();

app.get("/",(req,res) => {
    res.send( "We are working on it so please wait...")
})

app.listen(process.env.PORT,() => {
    console.log("Server started at port 3000...")
})
