await Canvas(500, 500);
displayMode('maxed');

allSprites.drag = 5;
allSprites.rotationDrag = 1;

let walls = new Group();
walls.color = color(0.8);
walls.isWall = true;

for (let i = 0; i < 30; i++) {
	new walls.Sprite(jit(250), jit(250), random(10, 50), random(10, 50));
}

let targets = new Group();
targets.isTarget = true;

for (let i = 0; i < 100; i++) {
	new targets.Sprite(jit(250), jit(250), random(10, 30), random(10, 30));
}

let player = new Sprite(0, -100, 30);
player.color = 'skyblue';
player.mass = 100;

q5.update = function () {
	background(0);

	player.speed = 2;
	player.direction = world.physicsTime * 50;

	targets.color = color(0.5);

	// limiter callback function returns true if the sprite is a wall
	let sprites = world.rayCastAll(player, mouse, (sprite) => sprite.isWall);

	for (let sprite of sprites) {
		if (sprite.isTarget) sprite.color = 'orange';
	}
};

q5.draw = function () {
	fill(0.15);
	let castRadius = player.distanceTo(mouse);
	circle(player.x, player.y, castRadius * 2);

	stroke('orange');
	strokeWeight(2);
	line(player.x, player.y, mouse.x, mouse.y);

	noStroke();
};
