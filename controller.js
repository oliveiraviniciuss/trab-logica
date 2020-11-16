//Globais

let numero_colunas; 
let numero_linhas;
let numero_simbolos = 0;

let matriz = null;
let simbolos_cabecalho= [];

let tabela_desenhada = false;
let funcao_gerada = false

function limpar_tela()
{
    document.location.reload();
    return;
}

async function gera_tabela(){

    if(tabela_desenhada){
        return;
    }

    const sucesso_integracao = await integracao();

    if(!sucesso_integracao){
        return;
    }
  
    desenha_tabela()
    document.getElementById('main_tabela').style.display = 'block';
    tabela_desenhada = true;
}


async function integracao(){

    // Faz a requisição à API do grupo do Rafael
    const expressao = $('#formula').val() 

    let response =  await fetch(`https://truthtablegenerator2000-ramon.rj.r.appspot.com/truthTable?expression=${expressao}`, {
        method: 'get',
        headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}) 
        });
    
        
    if (response.status != 200) {
        
        response = await response.json();
        alert(response.message);
        return false;
    }
    
    response = await response.json();
    console.log(response);

    const cabecalho = response.header;
    const linhas_tabela = response.rows;

    numero_colunas =  cabecalho.length;
    numero_linhas = linhas_tabela.length;

    simbolos_cabecalho = cabecalho.map( (simbolo)=>{
        return simbolo.value;
    });

    let n = numero_linhas;
    while(n != 1){
        n = n/2;
        numero_simbolos += 1;
    }

    matriz = new Array(numero_linhas); 
    for(let i in linhas_tabela){
        matriz[i] = new Array(numero_colunas);
        matriz[i] = Object.values(linhas_tabela[i]);
    }

    for(let i = 0; i < numero_linhas; i++){
        for(let j = 0; j < numero_colunas; j++){
            matriz[i][j] =  matriz[i][j] === true ? 'T' : 'F';
        }
    }

    console.log('SÍMBOLOS E SUBFÓRMULAS : ', simbolos_cabecalho); // valores que serão exibidos no header da tabela verdade
    console.log('MATRIZ : ', matriz); // valores da tabela verdade

    return true;
}



function desenha_tabela(){

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
                alert('Cabeçalho não preenchido!')
                return;
            }

            if (matriz[i][j].toLowerCase() !== 't' && matriz[i][j].toLowerCase() !== 'f' )
            {
                alert('Célula preenchida de forma inválida!')
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

