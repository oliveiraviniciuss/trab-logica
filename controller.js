let numero_colunas; 
let numero_linhas;
let numero_simbolos;
let numero_conectivos;

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

            // if (j === (numero_colunas - 1) ) 
            //     linha += `<td contenteditable='true' id= "${i}${j}"> TRUE</td>`; 
            // else
                linha+= `<td contenteditable='true' id= "${i}${j}"> TESTE ${i}${j}</td>`; 
          
        }
        $("#table").append(linha + "</tr>");
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

    for(let i = 0; i < numero_linhas; i++){
        if(matriz[i][numero_colunas-1] === 'v'){
            linhas_true.push(i)
        }
    }

    let formula = '';

    for(let i of linhas_true){

        formula+= '( ';

        for(let j = 0; j < numero_simbolos; j++){

            if(j > 0)
                formula += ' ^ ';

            if(matriz[i][j] === 'v')        
                formula += `${$(`#${j}`)[0].innerHTML}`; 
            else
                formula += `¬${$(`#${j}`)[0].innerHTML}`;
        }

        formula += ' ) ';

        if(i < (linhas_true.length -1 ))
            formula += 'V ';

    }


    $("#formula_normal_disjuntiva").append(`<input type="text" id="formula_normal_disjuntiva" name="line" value= '${formula}'>`);

    console.log(formula)
}