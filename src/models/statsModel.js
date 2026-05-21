var database = require("../database/config")

function inserir(pts, ass, reb, tentativas, acertos, fk_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", pts, ass, reb, tentativas, acertos, fk_usuario)
    var instrucaoSql = `
        INSERT INTO stats (pts, ass, reb, tentativas, acertos, fk_usuario)  values (${pts},${ass},${reb},${tentativas},${acertos},${fk_usuario})
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    inserir
};