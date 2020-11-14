//Globais

let numero_colunas; 
let numero_linhas;
let numero_simbolos = 0;
let numero_conectivos;
let numero_coluna_auxiliar;
let numero_linha_auxiliar;

let matriz = null;
let simbolos_cabecalho= [];

let matriz_desenhada = false;
let matriz_gerada = false;
let funcao_gerada = false

function limpar_tela()
{
    document.location.reload();
    return;
}

function gera_tabela(){

    integracao();
  
    //Desenha a matriz
    desenha_tabela()
    document.getElementById('main_tabela').style.display = 'block';
    matriz_desenhada = true;
}


function integracao(){

    // pega o código back-end do grupo do Rafael
    const entrada = 
    [
        {"P":true,"Q":true, "R":true, "(P->Q)": true, "(P->Q)^R":true},
        {"P":true,"Q":true, "R":false, "(P->Q)": true, "(P->Q)^R":false},
        {"P":true,"Q":false, "R":true, "(P->Q)": false, "(P->Q)^R":false},
        {"P":true,"Q":false, "R":false, "(P->Q)": false, "(P->Q)^R":false},
        {"P":false,"Q":true, "R":true, "(P->Q)": true, "(P->Q)^R":true},
        {"P":false,"Q":true, "R":false, "(P->Q)": true, "(P->Q)^R":false},
        {"P":false,"Q":false, "R":true, "(P->Q)": true, "(P->Q)^R":true},
        {"P":false,"Q":false, "R":false, "(P->Q)": true, "(P->Q)^R":false}
    ];

    numero_linhas = entrada.length;
    numero_colunas =  Object.values(entrada[0]).length;
    simbolos_cabecalho = Object.keys(entrada[0]);

    let n = numero_linhas;

    while(n != 1){
        n = n/2;
        numero_simbolos += 1;
    }

    matriz = new Array(numero_linhas); 
    for(let i in entrada){
        matriz[i] = new Array(numero_colunas);
        matriz[i] = Object.values(entrada[i]);
    }

    for(let i = 0; i < numero_linhas; i++){
        for(let j = 0; j < numero_colunas; j++){
            matriz[i][j] =  matriz[i][j] === true ? 'T' : 'F';
        }
    }

    console.log('SÍMBOLOS E SUBFÓRMULAS : ', simbolos_cabecalho); // valores que serão exibidos no header da tabela verdade
    console.log('MATRIZ : ', matriz); // valores da tabela verdade
}



function desenha_tabela(){

  //  integracao();

    $('#tabela_inicial').remove(); // remove a tabela inicial

    let linha;

    // monta o header da tabela
    for(let i in simbolos_cabecalho){
        linha += `<th contenteditable='true' id ='${i}'>${simbolos_cabecalho[i]}</th>`;
    }

    $("#header").append(linha);

    // desenha as linhas da tabela
    for(let i = 0; i < numero_linhas; i++){
        linha = "<tr>";
        for(let j = 0; j < numero_colunas; j++){
            linha += `<td contenteditable='true' id= "${i}${j}"> ${matriz[i][j]} </td>`;
        }
        $("#table").append(linha + "</tr>");
    }


}


function gera_formulas_normais(){

    //Verifica se existe funcao gerada
    if (funcao_gerada == true)
    {
        return;
    }

    //Verifica matriz gerada
    if (matriz == null)
    {
        alert('Por favor, gere a matriz!')
        return;
    }
    
    //Verifica se a matriz possui valores corretos
    for(let i = 0; i < numero_linhas; i++)
    {
        for(let j = 0; j < numero_colunas; j++)
        {
            if (`${$(`#${j}`)[0].innerHTML.trim()}` === "")
            {
                alert('Por favor, preencha corretamente o cabeçalho!')
                return;
            }

            if (matriz[i][j].toLowerCase() !== 't' && matriz[i][j].toLowerCase() !== 'f' )
            {
                alert('Por favor, preencha a tabela com somente "t", "T", "f" ou "F" unicamente em cada célula!')
                return;
            }
        }
    }


    gera_formula_normal_disjuntiva();
    gera_formula_normal_conjuntiva();
    document.getElementById('saida').style.display = 'block';
    document.getElementById('entrada').style.display = 'none';
    funcao_gerada = true
}


function gera_formula_normal_disjuntiva(){
    
    let linhas_true = [];

    for(let i = 0; i < numero_linhas; i++){
        if(matriz[i][numero_colunas-1].toLowerCase() === 't'){
            linhas_true.push(i)
        }
    }

    let formula = '';

    for(let i of linhas_true){

        formula+= '( ';

        for(let j = 0; j < numero_simbolos; j++){

            if(j > 0)
                formula += ' ^ ';

            if(matriz[i][j].toLowerCase() === 't')        
                formula += `${$(`#${j}`)[0].innerHTML.trim()}`; 
            else
                formula += `¬${$(`#${j}`)[0].innerHTML.trim()}`;
        }

        formula += ' ) ';

        if(i !== (linhas_true[linhas_true.length-1]))
            formula += 'v ';

    }


    $("#formula_normal_disjuntiva").append(`<label> <b>${formula}</b> </label>`);

    console.log(formula)
}

function gera_formula_normal_conjuntiva(){
    
    let linhas_false = [];

    for(let i = 0; i < numero_linhas; i++){
        if(matriz[i][numero_colunas-1].toLowerCase() === 'f'){
            linhas_false.push(i)
        }
    }

    let formula = '';

    for(let i of linhas_false){

        formula+= '( ';

        for(let j = 0; j < numero_simbolos; j++){

            if(j > 0)
                formula += ' v ';

            if(matriz[i][j].toLowerCase() === 'f')        
                formula += `${$(`#${j}`)[0].innerHTML.trim()}`; 
            else
                formula += `¬${$(`#${j}`)[0].innerHTML.trim()}`;
        }

        formula += ' ) ';

        if(i !== (linhas_false[linhas_false.length-1]))
            formula += '^ ';

    }


    $("#formula_normal_conjuntiva").append(`<label> <b>${formula}</b> </label>`);

    console.log(formula)
}

