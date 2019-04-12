// TROPHY
class Trophy{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 25;
        this.img = new Image();
        this.img.src = "images/treasure.png"
        this.position = true;
    }

    draw() {
        if(this.position === true){
            ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        }else {
            this.x = -10;
            this.y = -10;
        }
    }
}

// THE HERO
class Hero {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 25;
        this.img = new Image();
        this.img.src = "images/elf-bot.png";
        this.items = [];
    }
    
    draw() {
        if(this.x < 25) this.x = 25;
        if(this.x > canvas.width - this.size - 25) this.x = canvas.width - 50;
        if(this.y < 25) this.y = 25;
        if(this.y > canvas.height - this.size - 25) this.y = canvas.height -50;
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        ctx.beginPath();
        ctx.fillStyle = radius(this.x + 10, this.y + 10);
        ctx.rect(this.x - 1350,this.y - 850, 2800, 1800);
        ctx.fill();
    }
    
    moveHero(e) {
        if(e.keyCode === 37) {
            this.x -= this.size/5;
            this.img.src = "images/elf-left.png";
        }
        if(e.keyCode === 39){
            this.x += this.size/5;
            this.img.src = "images/elf-right.png";
        }
        if(e.keyCode === 38){
            this.y -= this.size/5;
            this.img.src = "images/elf-top.png"
        } 
        if(e.keyCode === 40){
            this.y += this.size/5;
            this.img.src = "images/elf-bot.png"
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
