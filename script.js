// game setup
let frames = 0;
let wallsX = [];
let wallsY = [];
let wallsArr = [];
let walls = [];
let wallStore = [];
let gameOver = false;

// Loading canvas
const canvas = document.getElementById('labyrinth');
const ctx = canvas.getContext('2d');


// TROPHY
class Trophy{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 25;
        this.color = 'gold';
    }

    draw() {
        ctx.fillStyle = 'gold';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}


// GRID FOR CANVAS
class Grid{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = ourHero.size;
        this.height = ourHero.size;
    }
    
    // border canvas
    borderCanvas = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 25, canvas.height);
        ctx.fillRect(0, 0, canvas.width, 25);
        ctx.fillRect(canvas.width - 25, 0, 25, canvas.height);
        ctx.fillRect(0, canvas.height - 25, canvas.width, 25);
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}


// DRAWNING WALLS
const createWalls = () => {
    for(let i = 0;i < canvas.width; i += 50){
        for(let j = 0; j< canvas.height;j += 50){
            wallStore.push(new Grid(i, j))
        }
    }
}

const draWalls = () => {
    wallStore.forEach(wall => wall.draw())
}


// THE HERO
class Hero {
    constructor(){
        this.x = 325;
        this.y = 325;
        this.size = 25;
        this.color = 'blue'
    }
    
    draw() {
        if(this.x < 25) this.x = 25;
        if(this.x > canvas.width - this.size - 25) this.x = canvas.width - 50;
        if(this.y < 25) this.y = 25;
        if(this.y > canvas.height - this.size - 25) this.y = canvas.height -50;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }
    
    moveHero(e) {
        if(e.keyCode === 37) {
            this.x -= this.size/5;
        }
        if(e.keyCode === 39){
            this.x += this.size/5;
        }
        if(e.keyCode === 38){
            this.y -= this.size/5;
        } 
        if(e.keyCode === 40){
            this.y += this.size/5;
        }
    }
}

// COLLISION HERO
const colisioncheck = () => {
    wallStore.forEach(elem => {
        // RIGHT BARRIER
        if(elem.x === ourHero.x + ourHero.size -5 && ourHero.y > elem.y - 25 && ourHero.y < elem.y + 25){
            ourHero.x = ourHero.x - ourHero.size/5;
        }
        // TOP BARRIER
        if(elem.y === ourHero.y + ourHero.size -5 && ourHero.x > elem.x - 25 && ourHero.x < elem.x + 25){
            ourHero.y = ourHero.y - ourHero.size/5;
        }
        // LEFT BARRIER
        if(elem.x === ourHero.x - ourHero.size + 5 && ourHero.y < elem.y + 25 && ourHero.y > elem.y -25){
            ourHero.x = ourHero.x + ourHero.size/5;
        }
        // BOTTOM BARRIER
        if(elem.y === ourHero.y - ourHero.size + 5 && ourHero.x < elem.x + 25 && ourHero.x > elem.x - 25){
            ourHero.y = ourHero.y + ourHero.size/5;
        }
    })        
}

// COLISION WITH MINOROUS
const colisionMinos = () => {
    if(ourMinos.x === ourHero.x + ourHero.size && ourMinos.y > ourHero.y - ourHero.size && ourMinos.y < ourHero.y + ourHero.size){
        return gameOver = true;
    }
    if(ourMinos.y === ourHero.y + ourHero.size && ourMinos.x > ourHero.x - ourHero.size && ourMinos.x < ourHero.x + ourHero.size){
        return gameOver = true;
    }
    if(ourMinos.x === ourHero.x - ourHero.size && ourMinos.y < ourHero.y + ourHero.size && ourMinos.y > ourHero.y - ourHero.size){
        return gameOver = true;
    }
    if(ourMinos.y === ourHero.y - ourHero.size && ourMinos.x < ourHero.x + ourHero.size && ourMinos.x > ourHero.x - ourHero.size){
        return gameOver = true;
    }
}


// MINOROUS
class Minorous{
    constructor(){
        this.x = 375;
        this.y = 375;
        this.size = 25;
        this.color = 'brown';
        this.direction = 'right';
    }

    draw() {
        if(this.x < 25) this.x = 25;
        if(this.x > canvas.width - 50) this.x = canvas.width - 50;
        if(this.y < 25) this.y = 25;
        if(this.y > canvas.height - 50) this.y = canvas.height - 50;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    moveMinos() {
        if (this.direction === 'right') {
            this.x += 5;
        }else if (this.direction === 'left'){
            this.x -= 5;
        }else if (this.direction === 'up'){
            this.y += 5;
        }else if (this.direction === 'down'){
            this.y -= 5;
        }   
    }
}

// GENERATE RANDOM DIRECTION MINOS
const randDirection = () => {
    if(ourMinos.direction === 'right' && bingoDirection() === 0){
        ourMinos.direction = 'up';
    }else if(ourMinos.direction === 'right' && bingoDirection() === 1){
        ourMinos.direction = 'down';
    }else if(ourMinos.direction === 'right' && bingoDirection() === 2){
        ourMinos.direction = 'left';
    }else if(ourMinos.direction === 'up' && bingoDirection() === 0){
        ourMinos.direction = 'right';
    }else if(ourMinos.direction === 'up' && bingoDirection() === 1){
        ourMinos.direction = ' down';
    }else if(ourMinos.direction === 'up' && bingoDirection() === 2){
        ourMinos.direction = 'left';
    }else if(ourMinos.direction = 'down' && bingoDirection() === 0){
        ourMinos.direction = 'up';
    }else if(ourMinos.direction = 'down' && bingoDirection() === 1){
        ourMinos.direction = 'right';
    }else if(ourMinos.direction = 'down' && bingoDirection() === 2){
        ourMinos.direction = 'left';
    }else if(ourMinos.direction = 'left' && bingoDirection() === 0){
        ourMinos.direction = 'up';
    }else if(ourMinos.direction = 'left' && bingoDirection() === 1){
        ourMinos.direction = 'down';
    }else if(ourMinos.direction = 'left' && bingoDirection() === 2){
        ourMinos.direction = 'right';
    }
}

// GENERATE RANDOM NUMBER
const bingoYorN = () => {
    let r2 = Math.floor(Math.random()*2);
    return r2;
}

const bingoDirection = () => {
    let r3 = Math.floor(Math.random()*3);
    return r3;
}

const bingoTrophyX = () => {
    let rtx = Math.floor(Math.random()*25);
    let mult25x = rtx * 50 + 25;
    return mult25x;
}

const bingoTrophyY = () => {
    let rty = Math.floor(Math.random()*17);
    let mult25y = rty * 50 + 25;
    return mult25y;
}


// SET TIME INTERVAL
const timeBingo = () => {
    if(frames === 15 && bingoYorN() === 1){
        randDirection();
        frames = 0;
    }else if(frames === 30 && bingoYorN() ===1) {
        randDirection();
        frames = 0;
    } else if (frames > 30) {
        frames = 0
    }
    // frames = 0;
    // console.log(frames)
}


// MINOS AND WALL COLLISIONS
const minosWallColision = () => {
    wallStore.forEach(elem => {
        // BORDERS CHECK
        if(ourMinos.x <= 50){
            ourMinos.direction = 'right';
        }
        else if(ourMinos.y <= 50){
            ourMinos.direction = 'up';
        }
        else if(ourMinos.x >= canvas.width - 50){
            ourMinos.direction = 'left';
        }
        else if(ourMinos.y >= canvas.height - 50){
            ourMinos.direction = 'down';
        }

        // COLLISIONS WITH WALLS
        if(elem.x === ourMinos.x + ourMinos.size -5 && ourMinos.y > elem.y - ourMinos.size && ourMinos.y < elem.y + ourMinos.size){
            console.log('bateu em dir')
            ourMinos.x = ourMinos.x - 5;
            ourMinos.direction = 'up';
        }
        if(elem.y === ourMinos.y + ourMinos.size -5 && ourMinos.x > elem.x - ourMinos.size && ourMinos.x < elem.x + ourMinos.size){
            console.log('bateu em top')
            ourMinos.y = ourMinos.y - 5;
            ourMinos.direction = 'right';
        }
        if(elem.x === ourMinos.x - ourMinos.size +5 && ourMinos.y < elem.y + ourMinos.size && ourMinos.y > elem.y - ourMinos.size){
            console.log('bateu em esq')
            ourMinos.x = ourMinos.x + 5;
            ourMinos.direction = 'down';
        }
        if(elem.y === ourMinos.y - ourMinos.size +5 && ourMinos.x < elem.x + ourMinos.size && ourMinos.x > elem.x - ourMinos.size){
            console.log('bateu em bot')
            ourMinos.y = ourMinos.y + 5;
            ourMinos.direction = 'left';
        }
    })
}

// INSTANCES
const ourHero = new Hero();
const ourWalls = new Grid();
const ourMinos = new Minorous();
const ourTrophy = new Trophy(bingoTrophyX (), bingoTrophyY ());


// Canvas cleaner
const resetCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // wallsX = [];
    // wallsY = [];
    // wallsArr = [];
    // walls = [];
    wallStore = [];
}

const startGame = () => {
    // start animation
    render();
    
    // start one random number for TROPHY X AND Y
    bingoTrophyX();
    bingoTrophyY();
    
    
}

const render = () => {
    if(gameOver === false){
        // clean everything
        resetCanvas();
        
        // canvas drawning
        // ourWalls.gridWallX()
        // ourWalls.gridWallY()
        // ourWalls.gridCoord()
        
        // attempt drawing
        createWalls()
        draWalls()
        ourWalls.borderCanvas()
        
        // DRAWNING TROPHY IN RANDOM POSITION
        ourTrophy.draw()

        // DRAWNING HERO IN CURRENT POSITION
        ourHero.draw();

        // DRANING MINOS IN CURRENT POSITION
        ourMinos.draw();
        ourMinos.moveMinos();
        
        
        
        // colision check
        colisioncheck();
        colisionMinos();
        minosWallColision();
        
        // increment for each loop
        frames += 1;
        timeBingo()
        
        // move listener
        window.requestAnimationFrame(render)
    } else {
        alert('game over')
    }
}

startGame()

document.onkeydown = function(e) {
    ourHero.moveHero(e)
}


// north, east, west, south
// a cada n tempo, sortear qual a nova direção
// o minotauro pode mudar de posição a cada meio segundo, a cada segundo, ou 2 segundos ou 3 segundos ou 4 segundos