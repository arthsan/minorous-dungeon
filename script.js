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


// let r1 = Math.floor(Math.random()*3);
// let r2 = Math.floor(Math.random()*2);



// GRID FOR CANVAS
class Grid{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = ourHero.size;
        this.height = ourHero.size;
    }
    
    
    // gridWallY() {
        // ctx.fillStyle = '#ccc';
        // for(let i = 50; i <= this.width; i += 50){
        //     ctx.fillRect(i, 0, 25, canvas.height);
        //     wallsY.push(i);
        // }
    // }
    
    // gridWallX() {
        // ctx.fillStyle = '#ccc';
        // for(let i = 50; i <= this.height; i += 50){
        //     ctx.fillRect(0, i, canvas.width, 25);
        //     wallsX.push(i)
        // }
    // }
    
    // gridCoord() {
        // for(let i = 0; i < wallsX.length ; i +=1){
        //     wallsArr.push(wallsX[i]);
        //     wallsArr.push(wallsY[i]);
        //     walls.push(wallsArr.splice(0,2));
        // }
    // }
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
        this.color = 'red'
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

// MINOROUS
class Minorous{
    constructor(){
        this.x = 375;
        this.y = 375;
        this.size = 25;
        this.color = 'yellow';
        this.direction = 'right';
    }

    draw() {
        if(this.x < 25) this.x = 25;
        if(this.x > canvas.width - 50) this.x = canvas.width - 50;
        if(this.y < 25) this.y = 25;
        if(this.y > canvas.height - 25) this.y = canvas.height - 50;
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    moveMinos() {
        if (this.direction === 'right') {
            this.x += 1;
        }
    }
}

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


// INSTANCES
const ourHero = new Hero();
const ourWalls = new Grid();
const ourMinos = new Minorous()


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
    render()
    // move hero
    // document.onkeydown = ourHero.moveHero;
    // ourHero.moveHero(e);
    
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
        
        
        // drawing hero in current position
        ourHero.draw();

        // drawning minorous
        ourMinos.draw();
        ourMinos.moveMinos();
        
        // colision check
        colisioncheck();
        colisionMinos();

        // increment for each loop
        frames += 1;
        
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