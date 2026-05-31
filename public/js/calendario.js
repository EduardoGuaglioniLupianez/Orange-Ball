


let bissexto = false
let ano_selecionado = 0
let mes_selecionado = ""



const mapa_mes_numero = {
    "janeiro": 1,
    "fevereiro": 2,
    "marco": 3,
    "abril": 4,
    "maio": 5,
    "junho": 6,
    "julho": 7,
    "agosto": 8,
    "setembro": 9,
    "outubro": 10,
    "novembro": 11,
    "dezembro": 12
}


//verifica ano e mês selecionados

function verificar_ano_mes() {
    let ano_select = Number(id_ano.value)
    let mes_select = id_mes.value
    ano_selecionado = ano_select
    mes_selecionado = mes_select
    console.log(mes_select, ano_select)
}



function verificar_ano_bissexto() {
    let final_esperado = "00"
    console.log(`o ano dentro da função do bisexto é ${ano_selecionado}`)
    if (ano_selecionado % 4 == 0) {
        if (toString(ano_selecionado).endsWith(final_esperado)) {
            if (ano_selecionado % 400 == 0) {
                bissexto = true
            } else {
                bissexto = false
            }
        } else {
            bissexto = true
        }
    }
    console.log(bissexto)
    return bissexto
}


//busca datas com jogo e gera calendário

function gerar_calendario() {
    let fk_usuario = sessionStorage.ID_USUARIO
    if (!fk_usuario) {
        _renderizar_calendario([])
        return
    }

    let mes_numero = mapa_mes_numero[mes_selecionado]
    fetch("/stats/datasComJogo/" + fk_usuario + "/" + ano_selecionado + "/" + mes_numero)
        .then(function (resposta) { return resposta.json() })
        .then(function (dados) {
            _renderizar_calendario(dados)
        })
        .catch(function (erro) {
            console.log("#ERRO ao carregar stats:", erro)
            _renderizar_calendario([])
        })
}


// RENDERIZA O CALENDÁRIO

function _renderizar_calendario(datas_com_jogo) {
    id_dias.innerHTML = ""

    let valor_dia_semana_inicio = ""
    let valor_auxiliar = 0
    let qtd_dias_valor = 0

    for (let i = 0; i < json_ajuda_dias_semana.length; i++) {
        if (json_ajuda_dias_semana[i].ano == ano_selecionado) {
            if (json_ajuda_dias_semana[i].mes == mes_selecionado) {
                valor_dia_semana_inicio = json_ajuda_dias_semana[i].dia_que_comeca_o_mes
                qtd_dias_valor = json_ajuda_dias_semana[i].qtd_dias
                break
            }
        }
    }

    if (valor_dia_semana_inicio == "segunda") valor_auxiliar = 1
    else if (valor_dia_semana_inicio == "terça") valor_auxiliar = 2
    else if (valor_dia_semana_inicio == "quarta") valor_auxiliar = 3
    else if (valor_dia_semana_inicio == "quinta") valor_auxiliar = 4
    else if (valor_dia_semana_inicio == "sexta") valor_auxiliar = 5
    else if (valor_dia_semana_inicio == "sábado") valor_auxiliar = 6
    else if (valor_dia_semana_inicio == "domingo") valor_auxiliar = 0

    // Botões vazios antes do dia 1 — classe original
    for (let i = 0; i < valor_auxiliar; i++) {
        id_dias.innerHTML += `<button class="dia_sem_nada"></button>`
    }

    // Monta set de datas com jogo para lookup rápido
    let mes_numero = mapa_mes_numero[mes_selecionado]
    let set_datas = {}
    datas_com_jogo.forEach(function (d) {
        set_datas[d.data_jogo] = true
    })

    // Gera botões — classe original dia_button para todos
    // Dias com jogo ficam com 🏀 e onclick abrindo o modal
    for (let i = 1; i <= qtd_dias_valor; i++) {
        let mes_str = String(mes_numero).padStart(2, "0")
        let dia_str = String(i).padStart(2, "0")
        let chave = `${ano_selecionado}-${mes_str}-${dia_str}`
        let tem_jogo = set_datas[chave]

        if (tem_jogo) {
            id_dias.innerHTML += `
                <button class="dia_button" onclick="abrirModal('${chave}')" title="Ver jogo!">${i}
                        <span style="font-size:16px; display:block; line-height:1;">🏀</span>
                        <img class="video_fundo" src="assets/imgs/lebron_dia_de_treino.gif" alt="" />
                </button>`
        } else {
            id_dias.innerHTML += `
                <button class="dia_button_sem_treino">${i}
                    <img class="video_fundo" src="assets/imgs/lebron_sem_treino.gif" alt=""/>
                </button>`
        }
    }
}


// Abre o modal com detalhes do jogo

function abrirModal(chave_data) {
    let fk_usuario = sessionStorage.ID_USUARIO || 1

    fetch('/stats/porData/' + fk_usuario + '/' + chave_data)
        .then(function (r) { return r.json() })
        .then(function (jogo) {
            let partes = chave_data.split("-")
            document.getElementById("modal_data").textContent = partes[2] + "/" + partes[1] + "/" + partes[0]

            document.getElementById("modal_pts").textContent = jogo.pts || "0"
            document.getElementById("modal_reb").textContent = jogo.reb || "0"
            document.getElementById("modal_ass").textContent = jogo.ass || "0"
            document.getElementById("modal_horas").textContent = jogo.horas_jogadas || "0"

            let localWrapper = document.getElementById("modal_local_wrapper")
            if (jogo.localidade) {
                document.getElementById("modal_local").textContent = jogo.localidade
                localWrapper.style.display = "block"
            } else {
                localWrapper.style.display = "none"
            }

            document.getElementById("modal_descricao").textContent = jogo.descricao_dia || ""


            document.getElementById("modal_overlay").style.display = "flex"
        })
        .catch(function (e) {
            console.log("Erro ao buscar jogo:", e)
        })
}


// fecha o modal

function fecharModal() {
    document.getElementById("modal_overlay").style.display = "none"
}

function fecharModalOverlay(event) {
    if (event.target === document.getElementById("modal_overlay")) {
        fecharModal()
    }
}


// json pra auxiliar a geração de calendario

const json_ajuda_dias_semana = [
    { ano: 2026, mes: "janeiro", dia_que_comeca_o_mes: "quinta", qtd_dias: 31 },
    { ano: 2026, mes: "fevereiro", dia_que_comeca_o_mes: "domingo", qtd_dias: 28 },
    { ano: 2026, mes: "marco", dia_que_comeca_o_mes: "domingo", qtd_dias: 31 },
    { ano: 2026, mes: "abril", dia_que_comeca_o_mes: "quarta", qtd_dias: 30 },
    { ano: 2026, mes: "maio", dia_que_comeca_o_mes: "sexta", qtd_dias: 31 },
    { ano: 2026, mes: "junho", dia_que_comeca_o_mes: "segunda", qtd_dias: 30 },
    { ano: 2026, mes: "julho", dia_que_comeca_o_mes: "quarta", qtd_dias: 31 },
    { ano: 2026, mes: "agosto", dia_que_comeca_o_mes: "sábado", qtd_dias: 31 },
    { ano: 2026, mes: "setembro", dia_que_comeca_o_mes: "terça", qtd_dias: 30 },
    { ano: 2026, mes: "outubro", dia_que_comeca_o_mes: "quinta", qtd_dias: 31 },
    { ano: 2026, mes: "novembro", dia_que_comeca_o_mes: "domingo", qtd_dias: 30 },
    { ano: 2026, mes: "dezembro", dia_que_comeca_o_mes: "terça", qtd_dias: 31 },
    { ano: 2027, mes: "janeiro", dia_que_comeca_o_mes: "sexta", qtd_dias: 31 },
    { ano: 2027, mes: "fevereiro", dia_que_comeca_o_mes: "segunda", qtd_dias: 28 },
    { ano: 2027, mes: "marco", dia_que_comeca_o_mes: "segunda", qtd_dias: 31 },
    { ano: 2027, mes: "abril", dia_que_comeca_o_mes: "quinta", qtd_dias: 30 },
    { ano: 2027, mes: "maio", dia_que_comeca_o_mes: "sábado", qtd_dias: 31 },
    { ano: 2027, mes: "junho", dia_que_comeca_o_mes: "terça", qtd_dias: 30 },
    { ano: 2027, mes: "julho", dia_que_comeca_o_mes: "quinta", qtd_dias: 31 },
    { ano: 2027, mes: "agosto", dia_que_comeca_o_mes: "domingo", qtd_dias: 31 },
    { ano: 2027, mes: "setembro", dia_que_comeca_o_mes: "quarta", qtd_dias: 30 },
    { ano: 2027, mes: "outubro", dia_que_comeca_o_mes: "sexta", qtd_dias: 31 },
    { ano: 2027, mes: "novembro", dia_que_comeca_o_mes: "segunda", qtd_dias: 30 },
    { ano: 2027, mes: "dezembro", dia_que_comeca_o_mes: "quarta", qtd_dias: 31 },
    { ano: 2028, mes: "janeiro", dia_que_comeca_o_mes: "sábado", qtd_dias: 31 },
    { ano: 2028, mes: "fevereiro", dia_que_comeca_o_mes: "terça", qtd_dias: 28 },
    { ano: 2028, mes: "marco", dia_que_comeca_o_mes: "quarta", qtd_dias: 31 },
    { ano: 2028, mes: "abril", dia_que_comeca_o_mes: "sábado", qtd_dias: 30 },
    { ano: 2028, mes: "maio", dia_que_comeca_o_mes: "segunda", qtd_dias: 31 },
    { ano: 2028, mes: "junho", dia_que_comeca_o_mes: "quinta", qtd_dias: 30 },
    { ano: 2028, mes: "julho", dia_que_comeca_o_mes: "sábado", qtd_dias: 31 },
    { ano: 2028, mes: "agosto", dia_que_comeca_o_mes: "terça", qtd_dias: 31 },
    { ano: 2028, mes: "setembro", dia_que_comeca_o_mes: "sexta", qtd_dias: 30 },
    { ano: 2028, mes: "outubro", dia_que_comeca_o_mes: "domingo", qtd_dias: 31 },
    { ano: 2028, mes: "novembro", dia_que_comeca_o_mes: "quarta", qtd_dias: 30 },
    { ano: 2028, mes: "dezembro", dia_que_comeca_o_mes: "sexta", qtd_dias: 31 }
]