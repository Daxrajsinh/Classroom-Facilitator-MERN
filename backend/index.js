const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
connectToMongo();
const app = express()
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello Mates !')
})

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/questions"));
app.use("/api/answer", require("./routes/answers"));
// app.use("/api/comment", require("./routes/comment"));
// app.use("/api/tag", require("./routes/tags"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})