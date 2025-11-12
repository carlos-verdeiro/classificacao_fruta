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
    2:[0, 5, ["Azul", "Marrom", "Verde", "Rosa"], ["marrom", "rosa"]],    
    3:[2, 7, ["Redondo", "Longo", "Oval"], ["redondo"]],
    4:[3, 9, null, 88],
    5:[4, 11, null, 11],
    6:[1, 13, null, 219.9],
    7:[4, 15, null, 1.1],
    8:[1, 17, null, 11],
    9:[2, 19, ["Redondo", "Longo", "Oval"], ["redondo", "oval"]],
    10:[4, 21, null, 7.7],
    11:[4, 23, null, 2.2],
    12:[2, 25, ["Redondo", "Longo", "Oval"], ["redondo"]],
    13:[2, 27, ["Redondo", "Longo", "Oval"], ["redondo"]],
    14:[4, 29, null, 8.8],
    18:[0, 31, ["Roxo", "Vermelho", "Amarelo", "Laranja"], ["roxo", "vermelho", "amarelo"]],
    19:[2, 33, ["Redondo", "Oval"], ["redondo"]],
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
    let opt = "";

    porc = etapa/5*100;
    porc = (porc > 100)? 100:porc;
    for(let p in adj[2]) {
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

function etapaDrawNumber(etapa, adjNode) {
    porc = etapa/5*100;
    porc = (porc > 100)? 100:porc;
    return`
        <h1 id="titulo">Etapa ${etapa}</h1>
        <div class="progress w-50 m-auto" role="progressbar" aria-label="barra de progresso" aria-valuenow="${porc}" aria-valuemin="0" aria-valuemax="100" style="height: 20px">
            <div class="progress-bar" style="width: ${porc}%">${porc}%</div>
        </div>
        <h5 class="mt-3">${perguntas[adjNode[0]][1]}</h5>
        <input class="form-control w-25 m-auto mb-3" type="number" id="resposta" min='0'>
        <button class="btn btn-danger px-5 py-2 fs-4 " id="btnVoltar"  onclick="voltar()" type="button">Voltar</button>
        <button class="btn btn-primary px-5 py-2 fs-4 " id="btnProximo" onclick="prox()" type="button">Próximo</button>
        `
    
}

function etapaDrawResultado(nomeFruta) {
    fruta = nomeFruta; // Armazena a fruta encontrada
    return `
        <h1 id="titulo">Fruta Encontrada!</h1>
        <div class="alert alert-success w-50 m-auto mb-2">
            <h2>A fruta é: <strong>${nomeFruta}</strong></h2>
        </div>
        <button class="btn btn-primary px-5 py-2 fs-4 " id="btnReiniciar" onclick="ini()" type="button">Jogar Novamente</button>
    `
}

let fruta = null;
let etapa = 1;
let pergunta = 0;

function prox() {
    let noAtual = adj[pergunta];
    let tipoPergunta = perguntas[noAtual[0]][0];
    let proximoNoID;
    let respostaUsuario;

    if (tipoPergunta == 0) { // Select
        respostaUsuario = $('#opcoes option:selected').val();
        respostas[noAtual[0]] = respostaUsuario;
        
        if ($.inArray(respostaUsuario, noAtual[3]) != -1) {
            proximoNoID = noAtual[1]; // Caminho da esquerda (condição satisfeita)
        } else {
            proximoNoID = noAtual[1] + 1; // Caminho da direita
        }

    } else { // Number
        respostaUsuario = $('#resposta').val();
        if (respostaUsuario === "" || respostaUsuario === null) {
            alert("Por favor, insira um valor.");
            return;
        }
        respostaUsuario = parseFloat(respostaUsuario);
        respostas[noAtual[0]] = respostaUsuario;

        if (respostaUsuario <= noAtual[3]) {
            proximoNoID = noAtual[1]; // Caminho da esquerda (condição satisfeita)
        } else {
            proximoNoID = noAtual[1] + 1; // Caminho da direita
        }
    }

    etapa++;
    pergunta = proximoNoID;

    if (frutas[pergunta]) {
        // É uma fruta
        $("#central").html(etapaDrawResultado(frutas[pergunta]));
    
    } else if (adj[pergunta]) {
        // outra pergunta.
        let proximoNo = adj[pergunta];
        if (perguntas[proximoNo[0]][0] == 0) { // Próxima é Select
            $("#central").html(etapaDrawSelect(etapa, proximoNo));
        } else { // Próxima é Number
            $("#central").html(etapaDrawNumber(etapa, proximoNo));
        }
    } else {
        // Caso algo dê errado
        alert("Ocorreu um erro na árvore de decisão. Nó não encontrado: " + pergunta);
        voltar();
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

