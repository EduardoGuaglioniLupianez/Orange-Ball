
var express = require("express");
var router = express.Router();

var statsController = require("../controllers/statsController");


// inserir stats 
router.post("/inserstats", function(req,res){
    statsController.inserstats(req,res);

});

// treinos esse mes kpi

router.get("/listarTreinosMes/:fk_usuario", function(req,res){
    statsController.listarTreinoMes(req,res)
});

module.exports = router;