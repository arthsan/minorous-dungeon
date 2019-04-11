// game setup
let frames = 0;
let wallsX = [];
let wallsY = [];
let wallsArr = [];
let walls = [];
let wallStore = [];
let gameOver = false;
let gameWon = false;
let arrMinos = [];

// Loading canvas
const canvas = document.getElementById('labyrinth');
const ctx = canvas.getContext('2d');


// GENERATE RANDOM NUMBER
const bingoYorN = () => {
    let r2 = Math.floor(Math.random()*2);
    return r2;
}

const bingoDirection = () => {
    let r3 = Math.floor(Math.random()*3);
    return r3;
}

// TROPHY POSITION
const bingoTrophyX = () => {
    let rtx = Math.floor(Math.random()*15);
    let mult25x = rtx * 50 + 525;
    return mult25x;
}

const bingoTrophyY = () => {
    let rty = Math.floor(Math.random()*7);
    let mult25y = rty * 50 + 500;
    return mult25y;
}

// HERO START POSTION
const bingoHeroX = () => {
    let rtx = Math.floor(Math.random()*5);
    let mult25x = rtx * 50 + 25;
    return mult25x;
}

const bingoHeroY = () => {
    let rty = Math.floor(Math.random()*7);
    let mult25y = rty * 50 + 25;
    return mult25y;
}

// MINOS START POSTION
const bingoMinosX = () => {
    let rtx = Math.floor(Math.random()*15);
    let mult25x = rtx * 50 + 500;
    return mult25x;
}

const bingoMinosY = () => {
    let rty = Math.floor(Math.random()*7);
    let mult25y = rty * 50 + 500;
    return mult25y;
}

// SET TIME INTERVAL
const timeBingo = () => {
    if(frames === 15 && bingoYorN() === 1){
        arrMinos.forEach(rand =>{
            rand.randDirection();
        })
        frames = 0;
    }else if(frames === 30 && bingoYorN() ===1) {
        arrMinos.forEach(rands =>{
            rands.randDirection();
        })
        frames = 0;
    } else if (frames > 30) {
        frames = 0
    }
}


// INSTANCES
const ourHero = new Hero(bingoHeroX (), bingoHeroY ());
const ourWalls = new Grid();
const ourTrophy = new Trophy(bingoTrophyX (), bingoTrophyY ());


// Canvas cleaner
const resetCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wallStore = [];
}

const startGame = () => {
    document.getElementById('player-select').style.display = 'none';
    document.getElementById('canvas-lab').style.display = 'block';

    // instance minos
    arrMinos.push(new Minorous(bingoMinosX(), bingoHeroY ()));
    arrMinos.push(new Minorous(bingoMinosX(), bingoHeroY ()));
    arrMinos.push(new Minorous(bingoMinosX(), bingoHeroY ()));    
    arrMinos.push(new Minorous(bingoMinosX(), bingoHeroY ()));    
    arrMinos.push(new Minorous(bingoMinosX(), bingoHeroY ()));    
    arrMinos.push(new Minorous(bingoMinosX(), bingoHeroY ()));    

    // start animation
    render();
    
    // start one random number for TROPHY X AND Y
    bingoTrophyX();
    bingoTrophyY();

}

const render = () => {
    if(gameOver === false){
        if(gameWon === false){
        // clean everything
        resetCanvas();
        
        // attempt drawing
        createWalls()
        draWalls()
        ourWalls.borderCanvas()
        
        // DRAWNING TROPHY IN RANDOM POSITION
        ourTrophy.draw()

      

        // DRANING MINOS IN CURRENT POSITION
        arrMinos.forEach(min => {
            min.draw();
            min.moveMinos();
            min.colisionMinos();
            min.minosWallColision();
        })
      
        // DRAWNING HERO IN CURRENT POSITION
        ourHero.draw();

        // COLLISION CHECKER
        ourHero.colisioncheck();
        getItens()
        
        // increment for each loop
        frames += 1;
        timeBingo()
        
        // move listener
        window.requestAnimationFrame(render)
        } else {
            document.getElementById('canvas-lab').style.display = 'none';
            document.getElementById('game-won').style.display = 'block';
        }
    } else {
        document.getElementById('canvas-lab').style.display = 'none';
        document.getElementById('game-over').style.display = 'block';
        
    }
}

function selectPlayer(){
    document.getElementById('home').style.display = 'none';
    document.getElementById('player-select').style.display = 'block';
}


document.onkeydown = function(e) {
    e.preventDefault();
    ourHero.moveHero(e)
    ourHero.catch(e)
}

// north, east, west, south
// a cada n tempo, sortear qual a nova direção
// o minotauro pode mudar de posição a cada meio segundo, a cada segundo, ou 2 segundos ou 3 segundos ou 4 segundos