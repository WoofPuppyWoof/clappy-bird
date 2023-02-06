var bird;
var pipes = [];
var mic;

function setup() {
  createCanvas(400, 600);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  var vol = mic.getLevel();


  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }


  fill(0, 255, 0);
  console.log(vol);
  var y = map(vol, 0, 1, height, 0);
  rect(width-50, y, 50, height - y);



}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}