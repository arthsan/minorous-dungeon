// game setup
let frames = 0;

// Loading canvas
const canvas = document.getElementById('labyrinth');
const ctx = canvas.getContext('2d');


let wallsX = [];
let wallsY = [];
let wallsArr = [];
let walls = [];

// grid canvas
class Grid{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    
    
    gridWallY() {
        // let r = Math.random(Math.floor())*777%50 ;
        // console.log(r)
        ctx.fillStyle = 'black';
        for(let i = 50; i <= this.width; i += 50){
            ctx.fillRect(i, 0, 25, canvas.height);
            wallsY.push(i);
        }
    }
    
    gridWallX() {
        ctx.fillStyle = 'black';
        for(let i = 50; i <= this.height; i += 50){
            ctx.fillRect(0, i, canvas.width, 25);
            wallsX.push(i)
        }   
    }

    gridCoord() {
        for(let i = 0; i < wallsX.length ; i +=1){
            wallsArr.push(wallsX[i]);
            wallsArr.push(wallsY[i]);
            walls.push(wallsArr.splice(0,2));
        }
    }
    // border canvas
    borderCanvas = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 25, canvas.height);
        ctx.fillRect(0, 0, canvas.width, 25);
        ctx.fillRect(canvas.width - 25, 0, 25, canvas.height);
        ctx.fillRect(0, canvas.height - 25, canvas.width, 25);
    }
}

const ourWalls = new Grid();

// Our hero
class Hero {
    constructor(){
        this.x = 300;
        this.y = 300;
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
        if(e.keyCode ===40){
            this.y += this.size/5;
        }
    }
}

const colisioncheck = () => {
    walls.forEach(elem => {
        elem.forEach(() => {
            if(elem[0] < ourHero.x){
                ourHero.x = ourHero.x - ourHero.size/5;
                // console.log(elem[0])
            }
            if(elem[1] < ourHero.y){
                ourHero.y = ourHero.y - ourHero.size/5;
            }
        })
    
    })
}

// hero
const ourHero = new Hero();

// Canvas cleaner
const resetCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wallsX = [];
    wallsY = [];
    wallsArr = [];
    walls = [];
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
    ourWalls.gridWallX()
    ourWalls.gridWallY()
    ourWalls.borderCanvas()
    ourWalls.gridCoord()

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