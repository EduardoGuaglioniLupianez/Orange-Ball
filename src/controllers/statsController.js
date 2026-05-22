var statsModel = require("../models/statsModel");


function inserstats(req, res) {
    var pts = req.body.ptsServer;
    var ass = req.body.assServer;
    var reb = req.body.rebServer;
    var tentativas = req.body.tentativasServer;
    var acertos = req.body.acertosServer;
    var fk_usuario = req.body.fkUsuarioServer;

    


    if (pts == undefined ) {
        res.status(400).send("Seu email está undefined!");
    } else if (ass == undefined) {
        res.status(400).send("Sua senha está indefinida!");
        
    }else if (reb == undefined) {
        res.status(400).send("Sua reb está indefinida!");
        
    }else if (tentativas == undefined) {
        res.status(400).send("Sua tentativa está indefinida!");
        
    }else if (acertos == undefined) {
        res.status(400).send("Sua acerto está indefinida!");
        
    } else {

        statsModel.inserir(pts, ass, reb, tentativas, acertos, fk_usuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function listarTreinoMes(req,res){
    let fk_usuario = req.params.fk_usuario;

    


    if (fk_usuario == undefined ) {
        res.status(400).send("Sua fk_usuario está undefined!");
    }else{

        statsModel.listarTreinoMes(fk_usuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }







}





module.exports = {
    inserstats,
    listarTreinoMes
}