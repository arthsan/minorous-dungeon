var   canvas = null,
         ctx = null,
       width = 500,
      height = 500,
        game = {},
      colors = [
        '#f35d4f',
        '#006849',
        '#c0d988',
        '#6ddaf1',
        '#f1e85b'];

function init() {
  canvas = document.getElementById('game'),
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d'),
  createGame(50, 50, 0);
  setupKeyEvents();
  loop();
}

function setupKeyEvents() {
  document.onkeydown = function(e) {
    move(game.p1, e.which, {left: 37, up: 38, right: 39, down: 40});
    move(game.p2, e.which, {left: 65, up: 87, right: 68, down: 83});
  };
}

function move(p, which, keys) {
  switch (which) {
    case keys.left:
      if (game.map[p.y][p.x-1] == " ") {
        game.map[p.y][p.x-1] = game.map[p.y][p.x];
        game.map[p.y][p.x] = " ";
        p.x -= 1;
      }
      break;
    case keys.up:
      if (game.map[p.y-1][p.x] == " ") {
        game.map[p.y-1][p.x] = game.map[p.y][p.x];
        game.map[p.y][p.x] = " ";
        p.y -= 1;
      }
      break;
    case keys.right:
      if (game.map[p.y][p.x+1] == " ") {
        game.map[p.y][p.x+1] = game.map[p.y][p.x];
        game.map[p.y][p.x] = " ";
        p.x += 1;
      }
      break;
    case keys.down:
      if (game.map[p.y+1][p.x] == " ") {
        game.map[p.y+1][p.x] = game.map[p.y][p.x];
        game.map[p.y][p.x] = " ";
        p.y += 1;
      }
      break;
  }
}

function loop() {
  draw();
  requestAnimFrame(loop);
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  drawMap();

  var h = height / game.map.length;
  var w = width / game.map[0].length;

  game.p1.px = (game.p1.x + 0.5) * w;
  game.p1.py = (game.p1.y + 0.5) * h;
  game.p2.px = (game.p2.x + 0.5) * w;
  game.p2.py = (game.p2.y + 0.5) * h;

  ctx.beginPath();
  ctx.fillStyle = visionRadial(game.p1.px, game.p1.py);
  ctx.rect(game.p1.px - 50, game.p1.py - 50, 100, 100);
  ctx.fill();

  var p1 = ctx.getImageData(game.p1.px - 50, game.p1.py - 50, 100, 100);

  drawMap();

  ctx.beginPath();
  ctx.fillStyle = visionRadial(game.p2.px, game.p2.py);
  ctx.rect(0, 0, width, height);
  ctx.fill();

  ctx.putImageData(p1, game.p1.px - 50, game.p1.py - 50);
}

function drawMap() {
  var h = height / game.map.length;
  for (var y = 0; y < game.map.length; y++) {
    var row = game.map[y];
    var w = width / row.length;
    for (var x = 0; x < row.length; x++) {
      var c = row[x];
      ctx.beginPath();
      ctx.fillStyle = colors[charToColor(c)];
      ctx.rect(w * x, h * y, w, h);
      ctx.fill();
    }
  }
}

function visionRadial(x, y) {
  var grd = ctx.createRadialGradient(x, y, 10, x, y, 50);
  grd.addColorStop(0, "rgba(0,0,0,0)");
  grd.addColorStop(1, "black");
  return grd;
}

function charToColor(c) {
  switch (c) {
    case '#': return 1;
    case ' ': return 2;
    case '1': return 3;
    case '2': return 4;
    case '!': return 0;
    default: throw "No color mapping for char: " + c;
  }
}

function createGame(w, h, torches) {
  var others = "12!",
           x = null,
           y = null;

  game.map = [];
  for (y = 0; y < h; y++) {
    game.map[y] = [];
    for (x = 0; x < w; x++) {
      if (x === 0 || x == w-1 || y === 0 || y == h-1) {
        game.map[y][x] = "##";
      } else {
        game.map[y][x] = "#";
      }
    }
  }

  // prim's algorithm
  var cell = {
    x: Math.floor(Math.random() * (w - 1) + 1),
    y: Math.floor(Math.random() * (h - 1) + 1)
  };
  game.map[cell.y][cell.x] = " ";
  var walls = [
    {x: cell.x - 1, y: cell.y},
    {x: cell.x + 1, y: cell.y},
    {x: cell.x, y: cell.y - 1},
    {x: cell.x, y: cell.y + 1}
  ];
  while (walls.length > 0) {
    var wall = walls.splice(Math.floor(Math.random() * walls.length), 1)[0];

    if (game.map[wall.y - 1] && game.map[wall.y + 1] &&
      game.map[wall.y - 1][wall.x] == " " && game.map[wall.y + 1][wall.x] == "#")
    {
      game.map[wall.y + 1][wall.x] = game.map[wall.y][wall.x] = " ";
      walls.push({x: wall.x - 1, y: wall.y + 1});
      walls.push({x: wall.x + 1, y: wall.y + 1});
      walls.push({x: wall.x, y: wall.y + 2});
    }
    else if (game.map[wall.y - 1] && game.map[wall.y + 1] &&
      game.map[wall.y + 1][wall.x] == " " && game.map[wall.y - 1][wall.x] == "#")
    {
      game.map[wall.y - 1][wall.x] = game.map[wall.y][wall.x] = " ";
      walls.push({x: wall.x - 1, y: wall.y - 1});
      walls.push({x: wall.x + 1, y: wall.y - 1});
      walls.push({x: wall.x, y: wall.y - 2});
    }
    else if (game.map[wall.y] && game.map[wall.y] &&
      game.map[wall.y][wall.x - 1] == " " && game.map[wall.y][wall.x + 1] == "#")
    {
      game.map[wall.y][wall.x + 1] = game.map[wall.y][wall.x] = " ";
      walls.push({x: wall.x + 1, y: wall.y - 1});
      walls.push({x: wall.x + 1, y: wall.y + 1});
      walls.push({x: wall.x + 2, y: wall.y});
    }
    else if (game.map[wall.y] && game.map[wall.y] &&
      game.map[wall.y][wall.x + 1] == " " && game.map[wall.y][wall.x - 1] == "#")
    {
      game.map[wall.y][wall.x - 1] = game.map[wall.y][wall.x] = " ";
      walls.push({x: wall.x - 1, y: wall.y - 1});
      walls.push({x: wall.x - 1, y: wall.y + 1});
      walls.push({x: wall.x - 2, y: wall.y});
    }
  }

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      if (game.map[y][x] == "##") {
        game.map[y][x] = "#";
      }
    }
  }

  // place players and torches
  while (others.length > 0) {
    x = Math.floor(Math.random() * w);
    y = Math.floor(Math.random() * h);
    if (game.map[y][x] == " ") {
      game.map[y][x] = others[
        Math.floor(Math.random() * others.length)
      ];
      switch (game.map[y][x]) {
        case "1":
          game.p1 = {x: x, y: y};
          others = others.replace("1", "");
          break;
        case "2":
          game.p2 = {x: x, y: y};
          others = others.replace("2", "");
          break;
        case "!":
          torches--;
          if (torches <= 0) {
            others = others.replace("!", "");
          }
          break;
        default:
          throw "Invalid char: " + game.map[y][x];
      }
    }
  }
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

init();
