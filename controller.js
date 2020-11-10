//Globais

let numero_colunas; 
let numero_linhas;
let numero_simbolos;
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

function calcula_tamanho_tabela(){

    //Verifica se existe matriz desenhada
    if (matriz_desenhada == true)
    {
        return;
    }

    //Verifica valores zerados
    if(document.getElementById("simbolos").value.length == 0 || document.getElementById("conectivos").value.length == 0)
    {
        alert("Por favor, preencha os valores!")
        return;
    }

    //Captura valor dos campos
    numero_simbolos = $('#simbolos').val() 
    numero_conectivos = $('#conectivos').val()

    //Verifica valores negativos
    if(document.getElementById("simbolos").value < 0 || document.getElementById("conectivos").value < 0)
    {
        alert("Não são permitidos valores negativos!")
        return;
    }
    else if(document.getElementById("simbolos").value == 0 || document.getElementById("conectivos").value == 0)
    {
        alert("Por favor, informe um número válido!")
        return;
    }

    //Calcula o número de linhas e colunas da matriz
    numero_linhas = 2 ** parseInt(numero_simbolos);
    numero_colunas = parseInt(numero_simbolos) + parseInt(numero_conectivos); 

    //Desenha a matriz
    desenha_head_tabela(numero_colunas)
    desenha_linhas_tabela(numero_linhas, numero_colunas)

    matriz_desenhada = true;
}

function desenha_head_tabela(numero_colunas){
    
    let linha;
    let letra_base = 65;

    for(let i = 0; i < numero_colunas; i++){
        if( i < numero_simbolos)
        {
            linha += `<th contenteditable='true' id ="${i}">${String.fromCharCode(letra_base)}</th>`;
            letra_base ++;
        }
        else
        {
            linha += `<th contenteditable='true' id ="${i}"></th>`;
        }
        
    }
    $("#header").append(linha);

}


function desenha_linhas_tabela(numero_linhas, numero_colunas){
    let linha;

    for(let i = 0; i < numero_linhas; i++){
        linha = "<tr>";
        for(let j = 0; j < numero_colunas; j++){
            linha += `<td contenteditable='true' id= "${i}${j}"></td>`;
        }
        $("#table").append(linha + "</tr>");

    }
    escreve_entradas_iniciais_tabela()

    
}

function converte_tabela_html_em_matriz()
{


    matriz = new Array(numero_linhas); 
    for (let i = 0; i < numero_linhas; i++) 
        matriz[i] = new Array(numero_colunas);
   
    for(let i = 0; i < numero_linhas; i++){
        for(let j = 0; j < numero_colunas; j++){
            
            matriz[i][j] =  $(`#${i}${j}`)[0].innerHTML.trim();

        }
    }
    console.log(matriz)


    for(let j = 0; j < numero_simbolos; j++){
        simbolos_cabecalho.push($(`#${j}`)[0].innerHTML);
    }


}

function gera_formulas_normais(){

    converte_tabela_html_em_matriz();

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

            if (matriz[i][j].toLowerCase() !== 'v' && matriz[i][j].toLowerCase() !== 'f' )
            {
                alert('Por favor, preencha a tabela com somente "v", "V", "f" ou "F" unicamente em cada célula!')
                return;
            }
        }
    }


    gera_formula_normal_disjuntiva();
    gera_formula_normal_conjuntiva();

    funcao_gerada = true
}


function gera_formula_normal_disjuntiva(){
    
    let linhas_true = [];

    for(let i = 0; i < numero_linhas; i++){
        if(matriz[i][numero_colunas-1].toLowerCase() === 'v'){
            linhas_true.push(i)
        }
    }

    let formula = '';

    for(let i of linhas_true){

        formula+= '( ';

        for(let j = 0; j < numero_simbolos; j++){

            if(j > 0)
                formula += ' ^ ';

            if(matriz[i][j].toLowerCase() === 'v')        
                formula += `${$(`#${j}`)[0].innerHTML.trim()}`; 
            else
                formula += `¬${$(`#${j}`)[0].innerHTML.trim()}`;
        }

        formula += ' ) ';

        if(i !== (linhas_true[linhas_true.length-1]))
            formula += 'V ';

    }


    $("#formula_normal_disjuntiva").append(`<input type="text" id="formula_normal_disjuntiva" name="line" value= '${formula}' readonly>`);

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
                formula += ' V ';

            if(matriz[i][j].toLowerCase() === 'f')        
                formula += `${$(`#${j}`)[0].innerHTML.trim()}`; 
            else
                formula += `¬${$(`#${j}`)[0].innerHTML.trim()}`;
        }

        formula += ' ) ';

        if(i !== (linhas_false[linhas_false.length-1]))
            formula += '^ ';

    }


    $("#formula_normal_conjuntiva").append(`<input type="text" id="formula_normal_conjuntiva" name="line" value= '${formula}' readonly>`);

    console.log(formula)
}

function escreve_entradas_iniciais_tabela(){
    for (let i = 0 ; i< numero_linhas ; i++) {
        for (let j = (parseInt(numero_simbolos) - 1), auxiliar = 0 ; j >= 0 ; j--, auxiliar++) {
          $(`#${i}${auxiliar}`).html(parseInt((i/parseInt(Math.pow(2, j)))%2) ? "F" : "V")
        }
      }
}