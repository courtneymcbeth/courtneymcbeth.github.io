function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var divOut = document.getElementById('graphicsBackground')

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x090E29,
  antialias: true,
  autoDensity: true,
  resolution: 2
});
document.body.prepend(app.view);

// Bubbles
num_per_color = 10
colors = [0x3AA95C, 0xF6F2F3, 0xCA3368]

sprites = []
vel_x = []
vel_y = []

for (let i = 0; i < colors.length; ++i) {
  const color = colors[i];

  var gr = new PIXI.Graphics();
  gr.beginFill(color, 0.7);
  gr.lineStyle(0);
  gr.drawCircle(30, 30, 30);
  gr.endFill();

  for (let j = 0; j < num_per_color; ++j) {
    var texture = app.renderer.generateTexture(gr);
    var sprite = new PIXI.Sprite(texture);
    sprites.push(sprite)

    sprite.y = getRandomInt(window.innerHeight)
    sprite.x = getRandomInt(window.innerWidth)

    vel_x.push(0)
    vel_y.push(0)

    app.stage.addChild(sprite);
  }
}

let elapsed = 0.0;
ticks = 0
app.ticker.add((delta) => {
  elapsed += delta;

  for (let i = 0; i < sprites.length; ++i) {
    if (ticks % 20 == 0) {
      vel_x[i] = getRandomInt(5)
      vel_y[i] = getRandomInt(5)
    }

    sprites[i].x += (vel_x[i] - 2) / 4.0
    sprites[i].y += (vel_y[i] - 2) / 4.0
  }

  ticks += 1
});