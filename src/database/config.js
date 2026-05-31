var mysql = require("mysql2");

var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao) {
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);

        conexao.connect();

        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultados);
        });
    });
}

function executarComValores(instrucaoSql, valores) {
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);

        conexao.connect();

        conexao.query(instrucaoSql, valores, function (erro, resultado) {
            conexao.end();

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultado);
        });
    });
}

module.exports = {
    executar,
    executarComValores
};