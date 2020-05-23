const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const RegisterController = require('../src/controllers/RegisterController');

const PORT = process.env.PORT || 8081;

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
    const PORT = process.env.PORT || 8081;
}

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello world NODEMON');
})

app.post('/register',RegisterController.store);




try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION_AK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('MongoDB connected !');
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})