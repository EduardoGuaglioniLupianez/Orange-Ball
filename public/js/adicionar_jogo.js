 
 p_nome.innerHTML = sessionStorage.NOME_USUARIO

    function inserir_stats() {
        var pts = id_pts.value;
        var ass = id_ass.value;
        var reb = id_reb.value;
        var tentativas = id_tentativas.value;
        var acertos = id_acertos.value;
        var descricao_jogo = id_descricao.value;
        var local_jogo = id_local.value;
        var tempo_horas = id_tempo.value;
        var idsessao = sessionStorage.ID_USUARIO;
        if (
            pts == "" ||
            ass == "" ||
            reb == "" ||
            tentativas == "" ||
            acertos == ""||
            descricao_jogo == ""||
            local_jogo == ""||
            tempo_horas == ""
        ) {

            mensagem_status.innerHTML =
                "Algum campo está vazio tente novamente";
            return false;
            
        }
        // Enviando o valor da nova input
        fetch("/stats/inserstats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ptsServer: pts,
                assServer: ass,
                rebServer: reb,
                tentativasServer: tentativas,
                acertosServer: acertos,
                localServer: local_jogo,
                descricaoServer: descricao_jogo,
                tempoServer:tempo_horas,
                fkUsuarioServer: idsessao
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    mensagem_status.innerHTML = "Dia Inserido com sucesso!!"



                    setTimeout(() => {
                        window.location = "adicionar_jogo.html";
                    }, "2000");


                } else {
                    throw "Houve um erro ao tentar realizar o insert";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });

        return false;
    }