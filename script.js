// game setup
let frames = 0;

// Loading canvas
const canvas = document.getElementById('labyrinth');
const ctx = canvas.getContext('2d');

// grid canvas
const gridCanvas = () => {
    ctx.fillStyle = 'grey';
    for(let i = 25; i <= 1325; i += 50){
        ctx.fillRect(i, 0, 25, canvas.height);
        ctx.fillRect(0, i, canvas.width, 25)
    }
}

// border canvas
const borderCanvas = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 25, canvas.height);
    ctx.fillRect(0, 0, canvas.width, 25);
    ctx.fillRect(canvas.width - 25, 0, 25, canvas.height);
    ctx.fillRect(0, canvas.height - 25, canvas.width, 25);
}

// Our hero
class Hero {
    constructor(){
        this.x = 50;
        this.y = 50;
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

// hero
const ourHero = new Hero();

// Canvas cleaner
const resetCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

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
    gridCanvas()
    borderCanvas()
    
    // drawing hero in current position
    ourHero.draw();
    
    // increment for each loop
    frames += 1;
    
    // move listener
    window.requestAnimationFrame(render)
}

startGame()

document.onkeydown = function(e) {
    ourHero.moveHero(e)
}