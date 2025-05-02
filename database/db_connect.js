
const mongoose = require("mongoose")

const connectDatabase = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_CODE)
    console.log("Database connected successfully");
    } catch (error) {
        console.log("Something went wrong!",error)
    }
}

module.exports = connectDatabase;