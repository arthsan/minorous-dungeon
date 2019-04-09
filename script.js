// game setup
let frames = 0;
let wallsX = [];
let wallsY = [];
let wallsArr = []
let walls = [];
let wallStore = []

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
    for(let i = 0;i < canvas.width; i += 25){
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

const colisioncheck = () => {
    wallStore.forEach(elem => {
        if(elem.x === ourHero.x + ourHero.size -5 && elem.y <= ourHero.y && ourHero.y < elem.y + 25){
            ourHero.x = ourHero.x - ourHero.size/5;
        }
        if(elem.y === ourHero.y + ourHero.size -5 && elem.x <= ourHero.x && ourHero.x < elem.x + 25){
            ourHero.y = ourHero.y - ourHero.size/5;
        }
        if(elem.x === ourHero.x - ourHero.size + 5 && elem.y <= ourHero.y && ourHero.x < elem.y - 25){
            ourHero.x = ourHero.x + ourHero.size/5;
        }
        if(elem.y === ourHero.y - ourHero.size + 5 && elem.x <= ourHero.x && ourHero.y > elem.x - 25){
            ourHero.y = ourHero.y + ourHero.size/5;
        }
    })        
}

// hero
const ourHero = new Hero();
const ourWalls = new Grid()

// Canvas cleaner
const resetCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wallsX = [];
    wallsY = [];
    wallsArr = [];
    walls = [];
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
    
    // colision check
    colisioncheck()
    
    // increment for each loop
    frames += 1;
    
    // move listener
    window.requestAnimationFrame(render)
}

startGame()

document.onkeydown = function(e) {
    ourHero.moveHero(e)
}