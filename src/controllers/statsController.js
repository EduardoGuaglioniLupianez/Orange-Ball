var statsModel = require("../models/statsModel");

// POST — inserir nova stat
function inserstats(req, res) {
    var pts        = req.body.ptsServer;
    var ass        = req.body.assServer;
    var reb        = req.body.rebServer;
    var tentativas = req.body.tentativasServer;
    var acertos    = req.body.acertosServer;
    var local      = req.body.localServer      || '';
    var descricao  = req.body.descricaoServer  || '';
    var tempo      = req.body.tempoServer      || 0;
    var fk_usuario = req.body.fkUsuarioServer;

    if (!pts || !ass || !reb || !tentativas || !acertos || !fk_usuario) {
        return res.status(400).json({ mensagem: "Campos obrigatórios faltando!" });
    }

    statsModel.inserir(pts, ass, reb, tentativas, acertos, local, descricao, tempo, fk_usuario)
        .then(function (resultado) {
            res.status(201).json({ mensagem: "Jogo salvo com sucesso!", id: resultado.insertId });
        })
        .catch(function (erro) {
            console.log("Erro ao inserir stat:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno" });
        });
}

// GET — busca detalhes de um jogo por data (para o modal do calendário)
function buscarPorData(req, res) {
    var fk_usuario = req.params.fk_usuario;
    var data       = req.params.data; // formato: YYYY-MM-DD

    if (!fk_usuario || !data) {
        return res.status(400).json({ mensagem: "fk_usuario e data são obrigatórios" });
    }

    statsModel.buscarPorData(fk_usuario, data)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: "Nenhum jogo nesta data" });
            }
            res.json(resultado[0]);
        })
        .catch(function (erro) {
            console.log("Erro buscarPorData:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno" });
        });
}

// GET — retorna as datas que têm jogo em determinado mês/ano (para pintar o calendário)
function buscarDatasComJogo(req, res) {
    var fk_usuario = req.params.fk_usuario;
    var ano        = req.params.ano;
    var mes        = req.params.mes;

    if (!fk_usuario || !ano || !mes) {
        return res.status(400).json({ mensagem: "fk_usuario, ano e mes são obrigatórios" });
    }

    statsModel.buscarDatasComJogo(fk_usuario, ano, mes)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro buscarDatasComJogo:", erro);
            res.status(500).json({ mensagem: erro.sqlMessage || "Erro interno" });
        });
}

// GET — KPI: treinos do mês atual vs mês passado
function listarTreinoMes(req, res) {
    var fk_usuario = req.params.fk_usuario;
    if (!fk_usuario) return res.status(400).json("fk_usuario não informado");

    statsModel.listarTreinoMes(fk_usuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log("Erro listarTreinoMes:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// GET — KPI: média de pontos do mês
function mediaPontosMes(req, res) {
    var fk_usuario = req.params.fk_usuario;
    if (!fk_usuario) return res.status(400).json("fk_usuario não informado");

    statsModel.mediaPontosMes(fk_usuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log("Erro mediaPontosMes:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// GET — KPI: percentual de acerto do mês
function percentualAcerto(req, res) {
    var fk_usuario = req.params.fk_usuario;
    if (!fk_usuario) return res.status(400).json("fk_usuario não informado");

    statsModel.percentualAcerto(fk_usuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log("Erro percentualAcerto:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// GET — KPI: média de horas jogadas no mês
function mediaTempoMes(req, res) {
    var fk_usuario = req.params.fk_usuario;
    if (!fk_usuario) return res.status(400).json("fk_usuario não informado");

    statsModel.mediaTempoMes(fk_usuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log("Erro mediaTempoMes:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// GET — GRÁFICO: stats agrupadas por dia no mês atual
function statsPorDiaMes(req, res) {
    var fk_usuario = req.params.fk_usuario;
    if (!fk_usuario) return res.status(400).json("fk_usuario não informado");

    statsModel.statsPorDiaMes(fk_usuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log("Erro statsPorDiaMes:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// GET — GRÁFICO: histórico dos últimos 3 meses
function statsPorMes(req, res) {
    var fk_usuario = req.params.fk_usuario;
    if (!fk_usuario) return res.status(400).json("fk_usuario não informado");

    statsModel.statsPorMes(fk_usuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log("Erro statsPorMes:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// GET — RADAR: médias gerais para o radar de desempenho
function mediaGeral(req, res) {
    var fk_usuario = req.params.fk_usuario;
    if (!fk_usuario) return res.status(400).json("fk_usuario não informado");

    statsModel.mediaGeral(fk_usuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log("Erro mediaGeral:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    inserstats,
    buscarPorData,
    buscarDatasComJogo,
    listarTreinoMes,
    mediaPontosMes,
    percentualAcerto,
    mediaTempoMes,
    statsPorDiaMes,
    statsPorMes,
    mediaGeral
};