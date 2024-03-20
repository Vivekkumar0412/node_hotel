const express = require('express');
let app = express();
require('dotenv').config();
const db = require('./db');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require('./models/person');

// making middleware
function getLog(req,res,next){
    console.log(`log time [${new Date().toLocaleDateString()}] and route is ${req.originalUrl}`);
    next();
}
// creating authencatision

passport.use(new localStrategy(async (username, password, done)=>{
    try{
        let user = await person.findOne({username : username});
        if(!user){
            return done(null,false,{msg: "wrong username"});
        }
        const isMatchedPassword = user.password === password ? true:false;
        if(isMatchedPassword){
            return done(null, user);
        }else{
            return done(null, false, {msg : "wrong password"});
        }
    }catch(err){
        return done(err);
    }
}))

// very important without this passport will not work
app.use(passport.initialize());
// consumig the getLog() middleware
app.use(getLog);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const localAuthMiddleware = passport.authenticate('local',{session:false});
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
app.use('/person',localAuthMiddleware,personRoute);
app.use('/menu',menuRoute);