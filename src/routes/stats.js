
var express = require("express");
var router = express.Router();

var statsController = require("../controllers/statsController");


// pegando os stats]
router.get("/reqstats", function(req,res){
usuarioController.reqstats(req,res);

});

// inserir stats
router.post("/inserstats", function(req,res){
    statsController.inserstats(req,res);

});

module.exports = router;