const menuModel = require("../models/menu");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    let newMenu = await new menuModel(data);
    let response = newMenu.save();
    // res.status(200).json(newMenu);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let data = await menuModel.find();
    // res.status(200).json(data);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});
router.get("/:flavour", async (req, res) => {
  try {
    let fl = req.params.flavour;
    let data = await menuModel.find({
      flavour: fl,
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    let menuId = req.params.id;
    let changedData = req.body;
    let response = await menuModel.findByIdAndUpdate(menuId, changedData, {
      new: true,
      runValidators: true,
    });
    if(!response){
      res.status(404).json("person not found")
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json("some error occured");
  }
});
router.delete('/:id',async(req,res)=>{
  try{
    let menunId = req.params.id;
    let response = await menuModel.findByIdAndDelete(menunId);
    if(!response){
      res.status(400).json("invalid user")
    }
    res.status(200).json(response);
  }catch(err){
    console.log("error");
    res.send(err);
  }
})
module.exports = router;
