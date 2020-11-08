let numero_colunas; 
let numero_linhas;
let numero_simbolos;
let numero_conectivos;
let numero_coluna_auxiliar;
let numero_linha_auxiliar;

let matriz;
let simbolos_cabecalho= [];

function calcula_tamanho_tabela(){
    if(document.getElementById("simbolos").value.length == 0 || document.getElementById("conectivos").value.length == 0)
    {
        alert("empty")
    }
    numero_simbolos = $('#simbolos').val() 
    numero_conectivos = $('#conectivos').val()
    numero_linhas = 2 ** numero_simbolos;
    numero_colunas = parseInt(numero_simbolos) + parseInt(numero_conectivos); 
    numero_coluna_auxiliar = numero_simbolos;
    numero_linha_auxiliar = numero_linhas;
    desenha_head_tabela(numero_colunas)
    desenha_linhas_tabela(numero_linhas, numero_colunas)
}

function desenha_head_tabela(numero_colunas){
    
    let linha;
    for(let i = 0; i < numero_colunas; i++){
        linha += `<th contenteditable='true' id ="${i}"> TESTE ${i} </th>`;
    }
    $("#header").append(linha);

}


function desenha_linhas_tabela(numero_linhas, numero_colunas){
    let linha;

    for(let i = 0; i < numero_linhas; i++){
        linha = "<tr>";
        for(let j = 0; j < numero_colunas; j++){
            linha += `<td contenteditable='true' id= "${i}${j}"> TESTE ${i}${j}</td>`;
        }
        $("#table").append(linha + "</tr>");

        escreve_entradas_iniciais_tabela()
    }
    
}

function converte_tabela_html_em_matriz(){
    matriz = new Array(numero_linhas); 
    for (let i = 0; i < numero_linhas; i++) 
        matriz[i] = new Array(numero_colunas);
   
    for(let i = 0; i < numero_linhas; i++){
        for(let j = 0; j < numero_colunas; j++){
            
            // matriz[i][j] =   j === (numero_colunas - 1) ? 'TRUE' : $(`#${i}${j}`)[0].innerHTML
            matriz[i][j] =  $(`#${i}${j}`)[0].innerHTML

        }
    }
    console.log(matriz)


    for(let j = 0; j < numero_simbolos; j++){
        simbolos_cabecalho.push($(`#${j}`)[0].innerHTML);
    }

}

function gera_formulas_normais(){

    gera_formula_normal_disjuntiva();
}


function gera_formula_normal_disjuntiva(){
    
    let linhas_true = [];

    for(let i = 0; i < numero_colunas; i++){
        if(matriz[i][numero_colunas-1].toLowerCase() === 'v'){
            linhas_true.push(i)
        }
    }
    console.log(linhas_true);

    let formula = '';

    for(let i of linhas_true){

        formula+= '( ';

        for(let j = 0; j < numero_simbolos; j++){

            if(matriz[i][j] === 'TRUE')        
                formula += ` ^ ${matriz[i][j]}` 
            else
                formula += `^ X${matriz[i][j]}`;
        }

        formula += ' ) V';
    }

    console.log(formula)
}

function escreve_entradas_iniciais_tabela(){
    for (let x = 0; o < numero_linha_auxiliar; i++){
        for (let j = 0; j < numero_coluna_auxiliar; j++){
            
        }
    }
}