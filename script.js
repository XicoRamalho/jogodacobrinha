let canvas = document.getElementById("cobra"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let cobra = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
cobra[0] ={
    x: 8 * box,
    y: 8 * box
}
let direcao = "direita";
let comida ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "#1d3557";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){
    for(i = 0; i < cobra.length; i++){
        context.fillStyle = "#a8dadc";
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}

function drawcomida (){
    context.fillStyle = "#e63946";
    context.fillRect(comida.x, comida.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direcao != 'direita') direcao = 'left';
    if(event.keyCode == 38 && direcao != 'down') direcao = 'up';
    if(event.keyCode == 39 && direcao != 'left') direcao = 'direita';
    if(event.keyCode == 40 && direcao != 'up') direcao = 'down';
}

function iniciarJogo(){    

    if(cobra[0].x > 15*box && direcao == "direita") cobra[0].x = 0;
    if(cobra[0].x < 0 && direcao == 'left') cobra[0].x = 16 * box;
    if(cobra[0].y > 15*box && direcao == "down") cobra[0].y = 0;
    if(cobra[0].y < 0 && direcao == 'up') cobra[0].y = 16 * box;
    
    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawcomida();

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if(direcao == "direita") cobraX += box;
    if(direcao == "left") cobraX -= box;
    if (direcao == "up") cobraY -= box;
    if(direcao == "down") cobraY += box;

    if(cobraX != comida.x || cobraY != comida.y){
        cobra.pop(); //pop tira o último elemento da lista
    }else{
        comida.x = Math.floor(Math.random() * 15 +1) * box;
        comida.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);