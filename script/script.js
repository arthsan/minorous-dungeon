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
let activeKey = document.querySelectorAll('.active')
function activeChar(){
    
}

// Loading canvas
const canvas = document.getElementById('labyrinth');
const ctx = canvas.getContext('2d');


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
    
    // AUDIO SWITCH
    horrorAudio();

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
            stopHorrorAudio();
            wonAudio();
        }
    } else {
        document.getElementById('canvas-lab').style.display = 'none';
        document.getElementById('game-over').style.display = 'block';
        stopHorrorAudio();
        gameOverAudio ();
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