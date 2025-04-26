const express = require("express");
const app = express();

app.get("/",(req,res) => {
    res.status(200).json({ message : "We are working on it so please wait..."})
})

app.listen("3000",() => {
    console.log("Server started at port 3000...")
})

