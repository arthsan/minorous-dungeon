// MINOROUS
class Minorous{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 50;
        this.img = new Image();
        this.img.src = "images/minos-right.png"
        this.direction = 'right';
    }

    draw() {
        if(this.x < 25) this.x = 25;
        if(this.x > canvas.width - 75) this.x = canvas.width - 75;
        if(this.y < 25) this.y = 25;
        if(this.y > canvas.height - 75) this.y = canvas.height - 75;
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }

    moveMinos() {
        if (this.direction === 'right') {
            this.x += 5;
            this.img.src = "images/minos-right.png";
        }else if (this.direction === 'left'){
            this.x -= 5;
            this.img.src = "images/minos-left.png";
        }else if (this.direction === 'up'){
            this.y += 5;
            this.img.src = "images/minos-left.png";
        }else if (this.direction === 'down'){
            this.y -= 5;
            this.img.src = "images/minos-up.png";
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
                this.x = this.x - 5;
                this.direction = 'down';
            }
            if(elem.y === this.y + this.size -5 && this.x > elem.x - this.size && this.x < elem.x + this.size){
                this.y = this.y - 5;
                this.direction = 'right';
            }
            if(elem.x === this.x - this.size +5 && this.y < elem.y + this.size && this.y > elem.y - this.size){
                this.x = this.x + 5;
                this.direction = 'up';
           }
            if(elem.y === this.y - this.size +5 && this.x < elem.x + this.size && this.x > elem.x - this.size){
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