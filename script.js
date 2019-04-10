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


// TROPHY
class Trophy{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 25;
        this.color = 'gold';
        this.position = true;
    }

    draw() {
        if(this.position === true){
            ctx.fillStyle = 'gold';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }else {
            this.x = -10;
            this.y = -10;
        }
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
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}


// DRAWNING WALLS
const createWalls = () => {
    for(let i = 0;i < canvas.width; i += 100){
        for(let j = 0; j< canvas.height;j += 100){
            wallStore.push(new Grid(i, j))
        }
    }
}

const draWalls = () => {
    wallStore.forEach(wall => wall.draw())
}


// THE HERO
class Hero {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 25;
        this.color = 'blue';
        this.items = [];
    }
    
    draw() {
        if(this.x < 25) this.x = 25;
        if(this.x > canvas.width - this.size - 25) this.x = canvas.width - 50;
        if(this.y < 25) this.y = 25;
        if(this.y > canvas.height - this.size - 25) this.y = canvas.height -50;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.beginPath();
        ctx.fillStyle = radius(this.x + 10, this.y + 10);
        ctx.rect(this.x - 1250,this.y - 850, 2500, 1800);
        ctx.fill();
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

    // COLLISION HERO
    colisioncheck (){
        wallStore.forEach(elem => {
            // RIGHT BARRIER
            if(elem.x === this.x + this.size -5 && this.y > elem.y - this.size && this.y < elem.y + this.size){
                this.x = this.x - this.size/5;
            }
            // TOP BARRIER
            if(elem.y === this.y + this.size -5 && this.x > elem.x - this.size && this.x < elem.x + this.size){
                this.y = this.y - this.size/5;
            }
            // LEFT BARRIER
            if(elem.x === this.x - this.size + 5 && this.y < elem.y + this.size && this.y > elem.y -this.size){
                this.x = this.x + this.size/5;
            }
            // BOTTOM BARRIER
            if(elem.y === this.y - this.size + 5 && this.x < elem.x + this.size && this.x > elem.x - this.size){
                this.y = this.y + this.size/5;
        }
        })        
    }


    catch(e) {
        if(e.keyCode === 32) {
            if(getItens () === true){
                console.log('peguei');
                this.items.push(ourTrophy);
                ourTrophy.position = false;
                gameWon = true;
            }
        }
    }
}

// GETTING ITENS
const getItens = () => {
    if(ourHero.x === ourTrophy.x ){
        return true;
    }
    else if(ourHero.y === ourTrophy.y ){
        return true;
    }
    else if(ourHero.x === ourTrophy.x ){
        return true;
    }
    else if(ourHero.y === ourTrophy.y ){
        return true;
    }else{
        return false
    }
}

// RADIAl VISION
function radius(x,y) {
    var grd = ctx.createRadialGradient(x, y, 50, x, y, 200);
    grd.addColorStop(0, "rgba(0,0,0,0)");
    grd.addColorStop(1, "black")
    return grd;
}



// MINOROUS
class Minorous{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 50;
        this.color = 'brown';
        this.direction = 'right';
    }

    draw() {
        if(this.x < 25) this.x = 25;
        if(this.x > canvas.width - 75) this.x = canvas.width - 75;
        if(this.y < 25) this.y = 25;
        if(this.y > canvas.height - 75) this.y = canvas.height - 75;
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

    // COLISION HERO WITH MINOROUS
    colisionMinos() {
        if(this.x === ourHero.x + ourHero.size && this.y > ourHero.y - ourHero.size && this.y < ourHero.y + ourHero.size){
            return gameOver = true;
        }
        if(this.y === ourHero.y + ourHero.size && this.x > ourHero.x - ourHero.size && this.x < ourHero.x + ourHero.size){
            return gameOver = true;
        }
        if(this.x === ourHero.x - ourHero.size && this.y < ourHero.y + ourHero.size && this.y > ourHero.y - ourHero.size){
         return gameOver = true;
        }
        if(this.y === ourHero.y - ourHero.size && this.x < ourHero.x + ourHero.size && this.x > ourHero.x - ourHero.size){
            return gameOver = true;
        }
    }

    // MINOS AND WALL COLLISIONS
    minosWallColision() {
        wallStore.forEach(elem => {
             // BORDERS CHECK
            if(this.x <= 50){
                this.direction = 'right';
            }
            else if(this.y <= 50){
                this.direction = 'up';
            }
            else if(this.x >= canvas.width - 75){
                this.direction = 'left';
            }
            else if(this.y >= canvas.height - 75){
                this.direction = 'down';
            }
    
            // COLLISIONS WITH WALLS
            if(elem.x === this.x + this.size -5 && this.y > elem.y - this.size && this.y < elem.y + this.size){
                console.log('bateu em dir')
                this.x = this.x - 5;
                this.direction = 'down';
            }
            if(elem.y === this.y + this.size -5 && this.x > elem.x - this.size && this.x < elem.x + this.size){
                console.log('bateu em top')
                this.y = this.y - 5;
                this.direction = 'right';
            }
            if(elem.x === this.x - this.size +5 && this.y < elem.y + this.size && this.y > elem.y - this.size){
                console.log('bateu em esq')
                this.x = this.x + 5;
                this.direction = 'up';
           }
            if(elem.y === this.y - this.size +5 && this.x < elem.x + this.size && this.x > elem.x - this.size){
                console.log('bateu em bot')
                this.y = this.y + 5;
                this.direction = 'left';
            }
        })
    }

    // GENERATE RANDOM DIRECTION MINOS
    randDirection() {
        if(this.direction === 'right' && bingoDirection() === 0){
            this.direction = 'up';
        }else if(this.direction === 'right' && bingoDirection() === 1){
            this.direction = 'down';
        }else if(this.direction === 'right' && bingoDirection() === 2){
            this.direction = 'left';
        }else if(this.direction === 'up' && bingoDirection() === 0){
            this.direction = 'right';
        }else if(this.direction === 'up' && bingoDirection() === 1){
            this.direction = ' down';
        }else if(this.direction === 'up' && bingoDirection() === 2){
            this.direction = 'left';
        }else if(this.direction = 'down' && bingoDirection() === 0){
            this.direction = 'up';
        }else if(this.direction = 'down' && bingoDirection() === 1){
            this.direction = 'right';
        }else if(this.direction = 'down' && bingoDirection() === 2){
            this.direction = 'left';
        }else if(this.direction = 'left' && bingoDirection() === 0){
            this.direction = 'up';
        }else if(this.direction = 'left' && bingoDirection() === 1){
            this.direction = 'down';
        }else if(this.direction = 'left' && bingoDirection() === 2){
            this.direction = 'right';
        }
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
            alert('you won')
        }
    } else {
        alert('game over')
    }
}

startGame()

document.onkeydown = function(e) {
    ourHero.moveHero(e)
    ourHero.catch(e)
}

// north, east, west, south
// a cada n tempo, sortear qual a nova direção
// o minotauro pode mudar de posição a cada meio segundo, a cada segundo, ou 2 segundos ou 3 segundos ou 4 segundos