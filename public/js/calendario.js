


// valores de base dia iniciais mês

let bissexto = false
let ano_selecionado = 0
let mes_selecionado = ""




// Primeiro
function verificar_ano_mes() {

    let ano_select = Number(id_ano.value)
    let mes_select = id_mes.value

    ano_selecionado = ano_select
    mes_selecionado = mes_select

    console.log(mes_select, ano_select)







}
// Segundo
function verificar_ano_bissexto() {

    let final_esperado = "00"
    console.log(`o ano dentro da função do bisexto é ${ano_selecionado}`)
    if (ano_selecionado % 4 == 0) {
        if (toString(ano_selecionado).endsWith(final_esperado)) {
            if (ano_selecionado % 400 == 0) {
                bissexto = true
                console.log(bissexto)
            } else {
                bissexto = false
                console.log(bissexto)
            }
        } else {
            bissexto = true

            console.log(bissexto)
        }
    }
    console.log(bissexto)
    return bissexto



}


// terceira
function gerar_calendario() {
    id_dias.innerHTML = ""

    let valor_dia_semana_inicio = ""
    let valor_auxiliar = 0
    let valor_segunda = 1
    let valor_terca = 2
    let valor_quarta = 3
    let valor_quinta = 4
    let valor_sexta = 5
    let valor_sabado = 6
    let valor_domingo = 0

    console.log("entrei na função gerar calendario")
    console.log(`O ano selecionado é ${ano_selecionado}`)
    console.log(`O mes selecionado é ${mes_selecionado}`)


    for (let i = 0; i < json_ajuda_dias_semana.length; i++) {


        if (json_ajuda_dias_semana[i].ano == ano_selecionado) {
            console.log("entrei na validação de ano")


            if (json_ajuda_dias_semana[i].mes == mes_selecionado) {
                console.log("entrei na validação de mes")

                valor_dia_semana_inicio += json_ajuda_dias_semana[i].dia_que_comeca_o_mes
                qtd_dias_valor = json_ajuda_dias_semana[i].qtd_dias
                console.log(`valor : ${json_ajuda_dias_semana[i].dia_que_comeca_o_mes}`)
                console.log(`valor : ${qtd_dias_valor}`)
                break










            }
        }
    }
    console.log(`valor : ${valor_dia_semana_inicio}`)


    if (valor_dia_semana_inicio == "segunda") {

        valor_auxiliar = valor_segunda

    } else if (valor_dia_semana_inicio == "terça") {

        valor_auxiliar = valor_terca

    } else if (valor_dia_semana_inicio == "quarta") {

        valor_auxiliar = valor_quarta

    } else if (valor_dia_semana_inicio == "quinta") {

        valor_auxiliar = valor_quinta

    } else if (valor_dia_semana_inicio == "sexta") {

        valor_auxiliar = valor_sexta

    } else if (valor_dia_semana_inicio == "sábado") {

        valor_auxiliar = valor_sabado

    } else if (valor_dia_semana_inicio == "domingo") {

        valor_auxiliar = valor_domingo
    }
















    console.log(qtd_dias_valor)
    if (bissexto == true) {
        if (json_ajuda_dias_semana[i].mes == "fevereiro") {
            qtd_dias_valor += 1
        }


    }
    for (let i = 0; i < valor_auxiliar; i++) {
        id_dias.innerHTML += `<button class="dia_sem_nada"></button>`


    }

    for (let i = 1; i <= qtd_dias_valor; i++) {
        id_dias.innerHTML += `<button onclick="teladiacalendario(1, 5, 2026)" class="dia_button expandido"><span
                        class="numero">${i}</span></button>`


    }
    qtd_dias_valor -= 1







}

function teladiacalendario(dia, mes, ano) {
    // fazer uma função que compare o dia, ano e mes quem foi selecionado com algum do banco de dados





}

let json_ajuda_dias_semana = [
    {
        ano: 2026,
        mes: "janeiro",
        dia_que_comeca_o_mes: "quinta",
        qtd_dias: 31
    },
    {
        ano: 2026,
        mes: "fevereiro",
        dia_que_comeca_o_mes: "domingo",
        qtd_dias: 28
    },
    {
        ano: 2026,
        mes: "março",
        dia_que_comeca_o_mes: "domingo",
        qtd_dias: 31
    },
    {
        ano: 2026,
        mes: "abril",
        dia_que_comeca_o_mes: "quarta",
        qtd_dias: 30
    },
    {
        ano: 2026,
        mes: "maio",
        dia_que_comeca_o_mes: "sexta",
        qtd_dias: 31
    },
    {
        ano: 2026,
        mes: "junho",
        dia_que_comeca_o_mes: "segunda",
        qtd_dias: 30
    },
    {
        ano: 2026,
        mes: "julho",
        dia_que_comeca_o_mes: "quarta",
        qtd_dias: 31
    },
    {
        ano: 2026,
        mes: "agosto",
        dia_que_comeca_o_mes: "sábado",
        qtd_dias: 31
    },
    {
        ano: 2026,
        mes: "setembro",
        dia_que_comeca_o_mes: "terça",
        qtd_dias: 30
    },
    {
        ano: 2026,
        mes: "outubro",
        dia_que_comeca_o_mes: "quinta",
        qtd_dias: 31
    },
    {
        ano: 2026,
        mes: "novembro",
        dia_que_comeca_o_mes: "domingo",
        qtd_dias: 30
    },
    {
        ano: 2026,
        mes: "dezembro",
        dia_que_comeca_o_mes: "terça",
        qtd_dias: 31
    },

    {
        ano: 2027,
        mes: "janeiro",
        dia_que_comeca_o_mes: "sexta",
        qtd_dias: 31
    },
    {
        ano: 2027,
        mes: "fevereiro",
        dia_que_comeca_o_mes: "segunda",
        qtd_dias: 28
    },
    {
        ano: 2027,
        mes: "março",
        dia_que_comeca_o_mes: "segunda",
        qtd_dias: 31
    },
    {
        ano: 2027,
        mes: "abril",
        dia_que_comeca_o_mes: "quinta",
        qtd_dias: 30
    },
    {
        ano: 2027,
        mes: "maio",
        dia_que_comeca_o_mes: "sábado",
        qtd_dias: 31
    },
    {
        ano: 2027,
        mes: "junho",
        dia_que_comeca_o_mes: "terça",
        qtd_dias: 30
    },
    {
        ano: 2027,
        mes: "julho",
        dia_que_comeca_o_mes: "quinta",
        qtd_dias: 31
    },
    {
        ano: 2027,
        mes: "agosto",
        dia_que_comeca_o_mes: "domingo",
        qtd_dias: 31
    },
    {
        ano: 2027,
        mes: "setembro",
        dia_que_comeca_o_mes: "quarta",
        qtd_dias: 30
    },
    {
        ano: 2027,
        mes: "outubro",
        dia_que_comeca_o_mes: "sexta",
        qtd_dias: 31
    },
    {
        ano: 2027,
        mes: "novembro",
        dia_que_comeca_o_mes: "segunda",
        qtd_dias: 30
    },
    {
        ano: 2027,
        mes: "dezembro",
        dia_que_comeca_o_mes: "quarta",
        qtd_dias: 31
    },

    {
        ano: 2028,
        mes: "janeiro",
        dia_que_comeca_o_mes: "sábado",
        qtd_dias: 31
    },
    {
        ano: 2028,
        mes: "fevereiro",
        dia_que_comeca_o_mes: "terça",
        qtd_dias: 28
    },
    {
        ano: 2028,
        mes: "março",
        dia_que_comeca_o_mes: "quarta",
        qtd_dias: 31
    },
    {
        ano: 2028,
        mes: "abril",
        dia_que_comeca_o_mes: "sábado",
        qtd_dias: 30
    },
    {
        ano: 2028,
        mes: "maio",
        dia_que_comeca_o_mes: "segunda",
        qtd_dias: 31
    },
    {
        ano: 2028,
        mes: "junho",
        dia_que_comeca_o_mes: "quinta",
        qtd_dias: 30
    },
    {
        ano: 2028,
        mes: "julho",
        dia_que_comeca_o_mes: "sábado",
        qtd_dias: 31
    },
    {
        ano: 2028,
        mes: "agosto",
        dia_que_comeca_o_mes: "terça",
        qtd_dias: 31
    },
    {
        ano: 2028,
        mes: "setembro",
        dia_que_comeca_o_mes: "sexta",
        qtd_dias: 30
    },
    {
        ano: 2028,
        mes: "outubro",
        dia_que_comeca_o_mes: "domingo",
        qtd_dias: 31
    },
    {
        ano: 2028,
        mes: "novembro",
        dia_que_comeca_o_mes: "quarta",
        qtd_dias: 30
    },
    {
        ano: 2028,
        mes: "dezembro",
        dia_que_comeca_o_mes: "sexta",
        qtd_dias: 31
    }
];