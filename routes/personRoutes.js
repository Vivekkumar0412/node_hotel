const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const person = require('../models/person');

router.post('/',(req,res)=>{
    try{
        let data = req.body;
        let newPerson = new person(data);
        // remember here always use .save() else this data will not be saved inside the database
        const response = newPerson.save();
        console.log('data saved');
        res.status(200).json({dtaa : "sucess"})
    }catch(err){
        console.log(err,"internal server error");
        res.status(500).json({msg: "server error"})
    }
})
router.get('/',async(req,res)=>{
    try{
        let data = await Person.find();
        // res.status(200).json({ddt : data})
        res.send(data)
    }catch(err){
        console.log(err)
        res.status(400).json({hi:"error"})
        // res.send("error")
    }
})
router.get('/:work',async (req,res)=>{
    try{
        const worktype = req.params.work;
        if(worktype == 'software dev' || worktype == 'ias' || worktype  == 'army'){
            let response = await Person.find({
                work : worktype
            });
            res.status(200).json(response)
            // res.send(response);
        }else{
            res.send("invalid user type")
        }
    }catch(err){
        res.send(err);
    }
})
router.put('/:id',async (req,res)=>{
    let userId = req.params.id;
    let updatedUser = req.body;
    let response = await person.findByIdAndUpdate(userId,updatedUser,{
        new: true,
        runValidators : true

    })
    if(!response){
        res.status(404).json("data not found");
    };
    res.status(200).json(response);
})

module.exports = router;