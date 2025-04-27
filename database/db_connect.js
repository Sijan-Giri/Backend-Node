
const mongoose = require("mongoose")

const connectDatabase = async() => {
    try {
        await mongoose.connect("mongodb+srv://girisijan346:sijan@cluster0.ynxrpx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Database connected successfully");
    } catch (error) {
        console.log("Something went wrong!",error)
    }
}

module.exports = connectDatabase;