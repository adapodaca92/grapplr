const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING);
        console.log(`MongoDB connected: ${conn.connection.host}.`);

    } catch(err) {
        console.log(`Error: ${err}...`);
    }

}

module.exports = connectDB;