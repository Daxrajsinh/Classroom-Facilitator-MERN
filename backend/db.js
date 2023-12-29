const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://mahi:mahi@cluster0.q82jv29.mongodb.net/?retryWrites=true&w=majority";
const mongoURI = "mongodb+srv://mahi:mahi@cluster0.ab4njs0.mongodb.net/mates";


mongoose.set('strictQuery', false);

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
