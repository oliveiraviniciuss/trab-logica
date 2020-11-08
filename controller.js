let numero_colunas; 
let numero_linhas;


function calcula_tamanho_tabela(){
    if(document.getElementById("col").value.length == 0 || document.getElementById("line").value.length == 0)
    {
        alert("empty")
    }
    numero_colunas = $('#col').val() 
    numero_linhas = $('#line').val()


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
        console.log(a)

        $("#table").append(a + "</tr>");
    }
    
}

function converte_tabela_html_em_matriz(){
    var matriz = new Array(numero_colunas); 
    for (var i = 0; i < numero_colunas; i++) 
        matriz[i] = new Array(numero_linhas);
        
    for(let i = 0; i < numero_linhas; i++){
        for(let j = 0; j < numero_colunas; j++){
            let teste = `#${i}${j}`
            console.log(teste)
            //matriz[i][j] = $("'" + teste + "'")[0].innerHTML
            matriz[i][j] = $(teste)[0].innerHTML
        }
    }
    console.log(matriz)

}