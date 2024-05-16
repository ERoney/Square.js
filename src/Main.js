const Game = new Square.Game({
	canvas: Square.createCanvas(640, 480),
	scene: new Square.Scene({
		elements: [],
	})
})

const Input = Square.Input;

class Box extends Square.Element {

	constructor(x, y, w, h, color = 'black') {
		super()

		this.setTransform(x, y, w, h);
		this.color = color;
	}
}

let player = new Box(10, 10, 40, 40, 'red');
let ground = new Box(0, 400, 640, 40);

let gravity = 0.5;
let jump = 10;

let axisX = 0;
let speedX = 5;

Game.load = function() {
	Game.scene.instance([player, ground]);
}

Game.update = function() {
	
	// Aplicar gravedad

	player.vel.y += gravity;

	if (Game.iscollision(player, ground)) {
		player.vel.y = 0;
		player.transform.y = 360;
	}

	// Movimiento

	if (Input.iskeydown('ArrowLeft')) {
		axisX = -1;
	}
	else if (Input.iskeydown('ArrowRight')) {
		axisX = 1;
	}
	else {
		axisX = 0;
	}

	player.vel.x = speedX * axisX;

	// Salto

	if (Input.iskeyup('ArrowUp')) {
		player.vel.y = -jump; 
	}
}


// Game.canvas_render.imageSmoothingEnabled = false;
Game._init();
document.body.appendChild(Game.canvas);