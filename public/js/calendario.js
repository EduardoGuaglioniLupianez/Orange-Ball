


// valores de base dia iniciais mês
let valor_segunda = 1
let valor_terca = 2
let valor_quarta = 3
let valor_quinta = 4
let valor_sexta = 5
let valor_sabado = 6
let valor_domingo = 0
let vetor_ano = []
let ano = 0
let mes = ""



function teste() {
    console.log("entrei aqui")
    let ano_select = id_ano.value

    console.log(ano_select)




}
// Primeiro
function verificar_ano_mes() {
    
    let ano_select = Number(id_ano.value)
    let mes_select = id_mes.value

    ano = ano_select
    mes = mes_select

    console.log(mes_select, ano_select)







}
// Segundo
function verificar_ano_bissexto() {
    let bissexto = false
    let final_esperado = "00"
    console.log(`o ano dentro da função do bisexto é ${ano}`)
    if (ano % 4 == 0) {
        if (toString(ano).endsWith(final_esperado)) {
            if (ano % 400 == 0) {
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
    return bissexto
    console.log(bissexto)


}
// terceiro

function verificar_dia_semana_comeca() {





}

// quarto
function gerar_calendario() {










    for (let i = 1; i < 31; i++) {
        id_dias.innerHTML += `<button onclick="teladiacalendario(1, 5, 2026)" class="dia_button expandido"><span
                        class="numero">${i}</span></button>`


    }







}

function teladiacalendario(dia, mes, ano) {
    // fazer uma função que compare o dia, ano e mes quem foi selecionado com algum do banco de dados





}

