const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://mahi:mahi@cluster0.q82jv29.mongodb.net/?retryWrites=true&w=majority";
const mongoURI = "mongodb+srv://dmj160803:dj12345@cluster0.lephn9p.mongodb.net/?retryWrites=true&w=majority";


mongoose.set('strictQuery', false);

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MongoDB Successfully !");
    })
}

module.exports = connectToMongo;
