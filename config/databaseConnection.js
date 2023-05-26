const mongoose = require("mongoose");
const databaseConnection = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected Succefully')
    } catch (error) {
        console.log('Database Connection Failed', error.message)
    }
}

databaseConnection();