const express = require("express");
const connectDatabase = require("./database/db_connect");
const app = express();
require("dotenv").config();
const blogRoute = require("./routes/blogRoute");
const cors = require('cors')

app.use(cors({
    origin : "http://localhost:5173"
}))

app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

app.use(express.static('./uploads'))

connectDatabase();

app.use("",blogRoute)

app.get("/",(req,res) => {
    res.status(200).json({
        message : "hjfuiaefher"
    })
})

app.listen(process.env.PORT,() => {
    console.log(`Server started at port ${process.env.PORT}...`)
})
