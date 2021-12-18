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

var container = new PIXI.Container();
app.stage.addChild(container);

// Bubbles
num_per_color = 10
// colors = [0x3AA95C, 0xF6F2F3, 0xCA3368]
alphas = [0.2, 0.5, 0.7]

sprites = []
vel_x = []
vel_y = []

for (let i = 0; i < alphas.length; ++i) {
  const alpha = alphas[i];

  var gr = new PIXI.Graphics();
  gr.beginFill(0x3AA95C, alpha);
  gr.lineStyle(0);
  gr.drawCircle(60, 60, 120);
  gr.endFill();

  for (let j = 0; j < num_per_color; ++j) {
    var texture = app.renderer.generateTexture(gr);
    var sprite = new PIXI.Sprite(texture);
    sprites.push(sprite)

    sprite.y = getRandomInt(window.innerHeight * 2)
    sprite.x = getRandomInt(window.innerWidth * 2)

    vel_x.push(0)
    vel_y.push(0)

    container.addChild(sprite);
  }
}

container.cacheAsBitmap = true;
container.scale.set(0.5);

app.ticker.add((delta) => {
  container.cacheAsBitmap = false;
  for (let i = 0; i < sprites.length; ++i) {
    let fixed = false;
    if (sprites[i].x < 10) {
      vel_x[i] = 4;
      fixed = true;
    } else if (sprites[i].x > window.innerWidth * 2 - 10) {
      vel_x[i] = 0;
      fixed = true;
    }
    if (sprites[i].y < 10) {
      vel_y[i] = 4;
      fixed = true;
    } else if (sprites[i].y > window.innerHeight * 2 - 10) {
      vel_y[i] = 0;
      fixed = true;
    }

    if (!fixed && Math.random() < 0.01) {
      vel_x[i] = getRandomInt(5)
      vel_y[i] = getRandomInt(5)
    }

    sprites[i].x += (vel_x[i] - 2) / 4.0
    sprites[i].y += (vel_y[i] - 2) / 4.0
  }
  container.cacheAsBitmap = true;
});