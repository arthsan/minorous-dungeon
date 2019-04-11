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
