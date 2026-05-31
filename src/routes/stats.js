var express = require("express");
var router = express.Router();
var statsController = require("../controllers/statsController");

// POST — inserir nova stat
router.post("/inserstats", function (req, res) {
    statsController.inserstats(req, res);
});

// GET — busca detalhes de um jogo por data (para o modal do calendário)
// Exemplo: /stats/porData/1/2026-05-30
router.get("/porData/:fk_usuario/:data", function (req, res) {
    statsController.buscarPorData(req, res);
});

// GET — retorna as datas com jogo em um mês/ano (para pintar o calendário)
// Exemplo: /stats/datasComJogo/1/2026/5
router.get("/datasComJogo/:fk_usuario/:ano/:mes", function (req, res) {
    statsController.buscarDatasComJogo(req, res);
});

// GET — KPI: treinos do mês atual vs mês passado
router.get("/listarTreinosMes/:fk_usuario", function (req, res) {
    statsController.listarTreinoMes(req, res);
});

// GET — KPI: média de pontos do mês
router.get("/mediaPontos/:fk_usuario", function (req, res) {
    statsController.mediaPontosMes(req, res);
});

// GET — KPI: percentual de acerto do mês
router.get("/percentualAcerto/:fk_usuario", function (req, res) {
    statsController.percentualAcerto(req, res);
});

// GET — KPI: média de horas jogadas no mês
router.get("/mediaTempo/:fk_usuario", function (req, res) {
    statsController.mediaTempoMes(req, res);
});

// GET — GRÁFICO: stats por dia no mês atual
router.get("/statsDiaMes/:fk_usuario", function (req, res) {
    statsController.statsPorDiaMes(req, res);
});

// GET — GRÁFICO: histórico últimos 3 meses
router.get("/statsMeses/:fk_usuario", function (req, res) {
    statsController.statsPorMes(req, res);
});

// GET — RADAR: médias gerais
router.get("/mediaGeral/:fk_usuario", function (req, res) {
    statsController.mediaGeral(req, res);
});

module.exports = router;