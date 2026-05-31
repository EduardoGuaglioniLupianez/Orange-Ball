var database = require("../database/config");

// INSERT de nova stat
function inserir(pts, ass, reb, tentativas, acertos, local, descricao, tempo, fk_usuario) {
    var instrucaoSql = `
        INSERT INTO stats (pts, ass, reb, tentativas, acertos, localidade, descricao_dia, horas_jogadas, data_treino, fk_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;
    var valores = [pts, ass, reb, tentativas, acertos, local || '', descricao || '', tempo, fk_usuario];
    console.log("Executando INSERT de stat");
    return database.executarComValores(instrucaoSql, valores);
}

// Busca stats de um dia específico (para o calendário/modal)
function buscarPorData(fk_usuario, data) {
    var instrucaoSql = `
        SELECT id, pts, ass, reb, tentativas, acertos, localidade, descricao_dia, horas_jogadas
        FROM stats
        WHERE fk_usuario = ?
        AND DATE(data_treino) = ?
        LIMIT 1
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario, data]);
}

// Busca todas as datas que têm jogo em um mês/ano (para pintar o calendário)
function buscarDatasComJogo(fk_usuario, ano, mes) {
    var instrucaoSql = `
        SELECT DATE_FORMAT(data_treino, '%Y-%m-%d') AS data_jogo
        FROM stats
        WHERE fk_usuario = ?
        AND YEAR(data_treino) = ?
        AND MONTH(data_treino) = ?
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario, ano, mes]);
}

// KPI 1 — quantidade de treinos no mês atual vs mês passado
function listarTreinoMes(fk_usuario) {
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(id) FROM stats
             WHERE fk_usuario = ?
             AND MONTH(data_treino) = MONTH(NOW())
             AND YEAR(data_treino) = YEAR(NOW())) AS qtd_treino_mes_atual,
            (SELECT COUNT(id) FROM stats
             WHERE fk_usuario = ?
             AND MONTH(data_treino) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH))
             AND YEAR(data_treino) = YEAR(NOW())) AS qtd_treino_mes_passado
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario, fk_usuario]);
}

// KPI 2 — média de pontos do mês atual
function mediaPontosMes(fk_usuario) {
    var instrucaoSql = `
        SELECT ROUND(AVG(pts), 1) AS media_pts
        FROM stats
        WHERE fk_usuario = ?
        AND MONTH(data_treino) = MONTH(NOW())
        AND YEAR(data_treino) = YEAR(NOW())
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario]);
}

// KPI 3 — percentual de acerto do mês atual
function percentualAcerto(fk_usuario) {
    var instrucaoSql = `
        SELECT
            SUM(acertos) AS total_acertos,
            SUM(tentativas) AS total_tentativas,
            ROUND(SUM(acertos) / NULLIF(SUM(tentativas), 0) * 100, 1) AS pct_acerto
        FROM stats
        WHERE fk_usuario = ?
        AND MONTH(data_treino) = MONTH(NOW())
        AND YEAR(data_treino) = YEAR(NOW())
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario]);
}

// KPI 4 — média de horas jogadas no mês
function mediaTempoMes(fk_usuario) {
    var instrucaoSql = `
        SELECT ROUND(AVG(horas_jogadas), 1) AS media_horas
        FROM stats
        WHERE fk_usuario = ?
        AND MONTH(data_treino) = MONTH(NOW())
        AND YEAR(data_treino) = YEAR(NOW())
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario]);
}

// GRÁFICO — stats agrupadas por dia no mês atual
function statsPorDiaMes(fk_usuario) {
    var instrucaoSql = `
        SELECT
            DATE_FORMAT(data_treino, '%d/%m') AS dia,
            SUM(pts)           AS pontos,
            SUM(reb)           AS rebotes,
            SUM(ass)           AS assistencias,
            SUM(acertos)       AS acertos,
            SUM(tentativas)    AS tentativas,
            SUM(horas_jogadas) AS horas
        FROM stats
        WHERE fk_usuario = ?
        AND MONTH(data_treino) = MONTH(NOW())
        AND YEAR(data_treino) = YEAR(NOW())
        GROUP BY data_treino
        ORDER BY data_treino ASC
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario]);
}

// GRÁFICO — histórico dos últimos 3 meses agrupado por mês
function statsPorMes(fk_usuario) {
    var instrucaoSql = `
        SELECT
            DATE_FORMAT(data_treino, '%m/%Y') AS mes,
            ROUND(AVG(pts), 1)   AS media_pts,
            ROUND(AVG(reb), 1)   AS media_reb,
            ROUND(AVG(ass), 1)   AS media_ass,
            COUNT(id)            AS qtd_treinos
        FROM stats
        WHERE fk_usuario = ?
        AND data_treino >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
        GROUP BY DATE_FORMAT(data_treino, '%Y-%m')
        ORDER BY data_treino ASC
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario]);
}

// RADAR — médias gerais para o radar de desempenho
function mediaGeral(fk_usuario) {
    var instrucaoSql = `
        SELECT
            ROUND(AVG(pts), 1)                                                  AS media_pts,
            ROUND(AVG(ass), 1)                                                  AS media_ass,
            ROUND(AVG(reb), 1)                                                  AS media_reb,
            ROUND(AVG(acertos) / NULLIF(AVG(tentativas), 0) * 100, 1)          AS pct_acerto,
            ROUND(AVG(horas_jogadas), 1)                                        AS media_horas
        FROM stats
        WHERE fk_usuario = ?
    `;
    return database.executarComValores(instrucaoSql, [fk_usuario]);
}

module.exports = {
    inserir,
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