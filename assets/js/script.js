let iniciar = `
        <h1 id="titulo">Vamos analizar e descobrir a fruta</h1>
        <h5>Pressione para começar</h5>
        <button class="btn btn-success px-5 py-2 fs-2 " id="btnIniciar" onclick="ini()" type="button">Iniciar</button>`

let perguntas =
{// 0 select - 1 number | pergunta
    0:[0,"Qual a cor da fruta?"],
    1:[1,"Qual o peso da fruta?(g)"],
    2:[0,"Qual o formato da fruta?"],
    3:[1,"Qual o preço médio da fruta?(₹)"],
    4:[1,"Qual o tamanho da fruta?(cm)"]
}

let respostas =
{
    0:null,
    1:null,
    2:null,
    3:null,
    4:null
}


let adj= 
{// pergunta id | esq | opcoes(opcional) | cond para esquerda - menor ou igual)
    0:[0, 1, ["Azul", "Marrom", "Verde", "Rosa", "Laranja", "Roxo", "Vermelho", "Amarelo"], ["laranja", "roxo", "vermelho", "amarelo"]],
    1:[1, 3, null, 55],
    2:[0, 6, ["Azul", "Marrom", "Verde", "Rosa"], ["marrom", "rosa"]],
    3:[2, 7, ["Redondo", "Longo", "Oval"], ["redondo"]],
    4:[3, 9, null, 88],
    5:[4, 11, null, 11],
    6:[1, 13, null, 219.9],
    7:[4, 15, null, 1.1],
    8:[1, 17, null, 11],
    9:[2, 19, ["Redondo", "Longo", "Oval"], ["Redondo", "Oval"]],
    10:[4, 21, null, 7.7],
    11:[4, 23, null, 2.2],
    12:[2, 25, ["Redondo", "Longo", "Oval"], ["Redondo"]],
    13:[2, 27, ["Redondo", "Longo", "Oval"], ["Redondo"]],
    14:[4, 29, null, 8.8],
    18:[0, 31, ["Roxo", "Vermelho", "Amarelo", "Laranja"], ["roxo", "vermelho", "amarelo"]],
    19:[2, 33, ["Redondo", "Oval"], ["Redondo"]],
    24:[4, 35, null, 5.5],
    27:[4, 37, null, 1.1]
}

let frutas = 
{
    15:"Uva",
    16:"Ameixa",
    17:"Cereja",
    20:"Banana",
    21:"Romã",
    22:"Manga",
    23:"Lichia",
    25:"Coco",
    26:"Abacaxi",
    28:"Pêra",
    29:"Fruta do Conde",
    30:"Melância",
    31:"Morango",
    32:"Laranja",
    33:"Maçã",
    34:"Mamão",
    35:"Kiwi",
    36:"Pitaya",
    37:"Mirtilo",
    38:"Goiaba"
};

function limpaResp() {
    respostas[0]=null;
    respostas[1]=null;
    respostas[2]=null;
    respostas[3]=null;
    respostas[4]=null;
}

function etapaDrawSelect(etapa, adj) {
    let opt;

    porc = etapa/5*100;
    porc = (porc > 100)? 100:porc;
    let tmp;
    for(p in adj[2]) {
        opt += `<option value="${adj[2][p].toLowerCase()}">${adj[2][p]}</option>`;
    }
    return`
        <h1 id="titulo">Etapa ${etapa}</h1>
        <div class="progress w-50 m-auto" role="progressbar" aria-label="barra de progresso" aria-valuenow="${porc}" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
            <div class="progress-bar" style="width: ${porc}%">${porc}%</div>
        </div>
        <h5 class="mt-3">${perguntas[adj[0]][1]}</h5>
        <select name="opcoes" id="opcoes" class="form-select mb-3 w-50 m-auto">
            ${opt}
        </select>
        <button class="btn btn-danger px-5 py-2 fs-4 " id="btnVoltar" onclick="voltar()" type="button">Voltar</button>
        <button class="btn btn-primary px-5 py-2 fs-4 " id="btnProximo" onclick="prox()" type="button">Próximo</button>
        `
    
}

function etapaDrawNumber(etapa, adj) {
    porc = etapa/5*100;
    porc = (porc > 100)? 100:porc;
    return`
        <h1 id="titulo">Etapa ${etapa}</h1>
        <div class="progress w-50 m-auto" role="progressbar" aria-label="barra de progresso" aria-valuenow="${porc}" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
            <div class="progress-bar" style="width: ${porc}%">${porc}%</div>
        </div>
        <h5 class="mt-3">${perguntas[adj[0]][1]}</h5>
        <input class="form-control w-25 m-auto mb-3" type="number" id="resposta" min='0'>
        <button class="btn btn-danger px-5 py-2 fs-4 " id="btnVoltar"  onclick="voltar()" type="button">Voltar</button>
        <button class="btn btn-primary px-5 py-2 fs-4 " id="btnProximo" onclick="prox()" type="button">Próximo</button>
        `
    
}

let fruta = null;
let etapa = 1;
let pergunta = 0;

function prox() {
    if (perguntas[adj[pergunta][0]][0] == 0) {
        if($.inArray($('#opcoes option:selected').val(), adj[pergunta][2]) == 1)
        {
            pergunta = adj[pergunta][1];
        }else{
            pergunta = adj[pergunta][1]+1;
        }
        respostas[adj[pergunta][0]] = $('#opcoes option:selected').val();
        etapa++;
        if (respostas[adj[pergunta][0]] != null) {
            if($.inArray(respostas[adj[pergunta][0]], adj[pergunta][2]) == 1)
            {
                pergunta = adj[pergunta][1];
            }else{
                pergunta = adj[pergunta][1]+1;
            }
            respostas[adj[pergunta][0]] = respostas[adj[pergunta][0]];
        }else{
            $("#central").html(etapaDrawSelect(etapa, adj[pergunta]));
        }
    }else{
        if($('#resposta').val()  <= adj[pergunta][4])
        {
            pergunta = adj[pergunta][1];
        }else{
            pergunta = adj[pergunta][1]+1;
        }
        respostas[adj[pergunta][0]] = $('#resposta').val();
        etapa++;
        if (respostas[adj[pergunta][0]] != null) {
            if($.inArray(respostas[adj[pergunta][0]], adj[pergunta][2]) == 1)
            {
                pergunta = adj[pergunta][1];
            }else{
                pergunta = adj[pergunta][1]+1;
            }
            respostas[adj[pergunta][0]] = respostas[adj[pergunta][0]];
            prox();
        }else{
            $("#central").html(etapaDrawNumber(etapa, adj[pergunta]));
        }
    }
}

function ini() {
    fruta = null;
    etapa = 1;
    pergunta = 0;
    limpaResp();
    $("#central").html(etapaDrawSelect(etapa, adj[pergunta]));
}

function voltar() {
    $("#central").html(iniciar);
}

