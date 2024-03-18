const express = require('express');
require('dotenv').config();
const db = require('./db')

const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("hi there")
})
app.get('/v',(req,res)=>{
    res.send("hi there v")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server started")
})
const personRoute = require('./routes/personRoutes');
const menuRoute = require('./routes/menuRoutes');
app.use('/person',personRoute);
app.use('/menu',menuRoute);