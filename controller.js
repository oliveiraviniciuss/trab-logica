let numero_colunas; 
let numero_linhas;
let numero_simbolos;
let numero_conectivos;

function calcula_tamanho_tabela(){
    if(document.getElementById("simbolos").value.length == 0 || document.getElementById("conectivos").value.length == 0)
    {
        alert("empty")
    }
    numero_simbolos = $('#simbolos').val() 
    numero_conectivos = $('#conectivos').val()
    numero_linhas = 2 ** numero_simbolos;
    console.log(numero_linhas)
    numero_colunas = parseInt(numero_simbolos) + parseInt(numero_conectivos); 

    desenha_head_tabela(numero_colunas)
    desenha_linhas_tabela(numero_linhas, numero_colunas)
    }

function desenha_head_tabela(numero_colunas){
    
    let a;
    for(let i = 0; i < numero_colunas; i++){
        a += "<th contenteditable='true'>"  + "TESTE " + i + "</th>"    
    }
    $("#header").append(a);
}


function desenha_linhas_tabela(numero_linhas, numero_colunas){
    let a;
    for(let i = 0; i < numero_linhas; i++){
        a = "<tr>";
        for(let j = 0; j < numero_colunas; j++){
            a += "<td contenteditable='true' id=" + `"`+ i + "" +j + `"` + ">"  + "TESTE " + i +""+ j + "</td>"    
         
        }
        $("#table").append(a + "</tr>");
    }
    
}

function converte_tabela_html_em_matriz(){
    var matriz = new Array(numero_linhas); 
    for (var i = 0; i < numero_linhas; i++) 
        matriz[i] = new Array(numero_colunas);
    console.log(numero_linhas)
    console.log(numero_colunas)
    for(let i = 0; i < numero_linhas; i++){
        for(let j = 0; j < numero_colunas; j++){
            let teste = `#${i}${j}`
            console.log($(teste))
            //matriz[i][j] = $("'" + teste + "'")[0].innerHTML
            matriz[i][j] = $(teste)[0].innerHTML
        }
    }
    console.log(matriz)

}