const express = require('express');
const mongoose = require('mongoose');
const morgon = require('morgan');
const path = require('path'); 
const routes = require('./routes/api'); 

const app = express();
const PORT = process.env.PORT || 8080;
const MongoDB_URI = process.env.MongoDB_URI || "mongodb+srv://root:root@cluster0-efsgl.mongodb.net/mernapp?retryWrites=true&w=majority&ssl=true";

mongoose.connect(MongoDB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected!!!');
});

//Data parsing
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//step-3
if(process.env.NODE_ENV === 'procuction'){
    app.use(express.static('client/build'));
}

//HTTP request logger
app.use(morgon('tiny'));  
app.use('/api',routes);

app.listen(PORT,(err, res)=>{
    if(err){
        throw err;
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});