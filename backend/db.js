const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDB Successfully !");
    });
};

module.exports = connectToMongo;