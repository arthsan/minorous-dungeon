

// GRID FOR CANVAS
class Grid{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "images/stone-wall.jpg";
        this.width = ourHero.size;
        this.height = ourHero.size;
    }

    // border canvas
    borderCanvas = () => {
        ctx.drawImage(this.img, 0, 0, 25, canvas.height);
        ctx.drawImage(this.img, 0, 0, canvas.width, 25);
        ctx.drawImage(this.img, canvas.width - 25, 0, 25, canvas.height);
        ctx.drawImage(this.img, 0, canvas.height - 25, canvas.width, 25);
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 25, 25)
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
