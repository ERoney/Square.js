/*
 * Square.js
 *
 * por Roney 15-05-2024
 */

const Square = { }


Square.Game = class Game {

	constructor(game) {

		this.canvas = game.canvas;
		this.canvas_render = this.canvas.getContext('2d');

		this.scene = game.scene;

		this._loop = ()=>{
			this._update();
			requestAnimationFrame(this._loop);
		}
	}

	load() {

	}

	update() {

	}

	iscollision(a, b) {

		a = a.transform;
		b = b.transform;

		return this.iscollisionrect(a, b);
	}

	iscollisionrect(a, b) {
		return (a.x + a.w >= b.x && a.x <= b.x + b.w &&
				a.y + a.h >= b.y && a.y <= b.y + b.h )
	}

	_update() {
		this.canvas_render.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.scene._update(this);
		this.update();
	}

	_init() {
		this.load();
		this._loop();
	}
}

Square.Scene = class Scene {

	constructor(scene) {

		this.elements = [];
	}

	instance(elmt) {

		if (elmt.length) {
			elmt.forEach((e)=>{
				this.elements.push(e);
			})
		} else {
			this.elements.push(elmt);
		}
	}

	_update(game) {
		this.elements.forEach((elmt)=>{
			if (elmt) {
				elmt._update(game)
			}
		})
	}
} 

Square.Element = class Element {

	constructor(elmt) {

		this.setTransform(0, 0, 0, 0);
		this.setVel(0, 0);

		this.color = 'black';
	}

	setTransform(x, y, w, h) {
		this.transform = {
			x: x,
			y: y,
			w: w,
			h: h
		}
	}

	setVel(x, y) {
		this.vel = { 
			x: x,
			y: y
		}
	}

	update() {

	}

	_update(game) {
		this.update();
		this._move();
		this._draw(game.canvas_render);
	}

	_move() {
		this.transform.x += this.vel.x;
		this.transform.y += this.vel.y;
	}

	_draw(canvas_render) {
		
		canvas_render.fillStyle = this.color;
		canvas_render.fillRect(this.transform.x, this.transform.y, this.transform.w, this.transform.h);
		// canvas_render.drawImage(this.sprite.image, this.transform.x, this.transform.y, this.transform.w, this.transform.h);
	}
}

Square.Sprite = class Sprite {

	constructor(image) {

		this.image = image;
	}

	_update() {

	}
}

Square.Input = { }

Square.Input.Keyboard = {
	'ArrowLeft': {'isdown':false, 'ispress':false, 'isup':false},
	'ArrowDown': {'isdown':false, 'ispress':false, 'isup':false},
	'ArrowUp': {'isdown':false, 'ispress':false, 'isup':false},
	'ArrowRight': {'isdown':false, 'ispress':false, 'isup':false},
}

Square.Input.iskeydown = function(key) {
	if (Square.Input.Keyboard[key]) {
		return Square.Input.Keyboard[key].isdown;
	}
}

Square.Input.iskeypress = function(key) {
	if (Square.Input.Keyboard[key]) {
		return Square.Input.Keyboard[key].ispress;
	}
}

Square.Input.iskeyup = function(key) {
	if (Square.Input.Keyboard[key]) {
		return Square.Input.Keyboard[key].isup;
	}
}

window.addEventListener('keydown', (e)=>{
	if (Square.Input.Keyboard[e.key]) {
		Square.Input.Keyboard[e.key].isdown = true;
	}
})

window.addEventListener('keypress', (e)=>{
	if (Square.Input.Keyboard[e.key]) {
		Square.Input.Keyboard[e.key].ispress = true;
		// requestAnimationFrame(()=>{Square.Input.Keyboard[e.key].ispress = false});
	}
})

window.addEventListener('keyup', (e)=>{
	if (Square.Input.Keyboard[e.key]) {
		Square.Input.Keyboard[e.key].isup = true;
		Square.Input.Keyboard[e.key].isdown = false;
		requestAnimationFrame(()=>{Square.Input.Keyboard[e.key].isup = false});
	}
})

Square.loadImage = function(src) {

	let img = new Image();
		img.src = src;

	return img;
}

Square.createCanvas = function(width, height) {

	let can = document.createElement('canvas');
		can.width = width;
		can.height = height;

	return can;
}