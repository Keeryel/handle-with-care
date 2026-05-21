import {initPlayer, playerActions} from './plyr.js'
import {initTimer, timerCount, addTime} from './timer.js'
import {deliver, initdelivery, startDelivery} from "./deliveries.js"

await Canvas();

let player = initPlayer();
initTimer()

let boxes = new Group();
let deliveryText = initdelivery(player)

let smallBox = new boxes.Sprite();
smallBox.x = 50
smallBox.drag = 5
smallBox.mass = 2
smallBox.scale = 0.6
smallBox.rotationDrag = 5
smallBox.layer = 2



let borderY1 = new Sprite();
borderY1.x = 0;
borderY1.y = -800;
borderY1.w = 1600;
borderY1.h = 100;
borderY1.rotation = 0;
borderY1.physics = STATIC;

let borderY2 = new Sprite();
borderY2.x = 0;
borderY2.y = 800
borderY2.w = 1600;
borderY2.h = 100;
borderY2.rotation = 0;
borderY2.physics = STATIC;

let borderX1 = new Sprite();
borderX1.x = 800;
borderX1.y = 0;
borderX1.w = 1600;
borderX1.h = 100;
borderX1.rotation = 90;
borderX1.physics = STATIC;

let borderX2 = new Sprite();
borderX2.x = -800;
borderX2.y = 0;
borderX2.w = 1600;
borderX2.h = 100;
borderX2.rotation = 90;
borderX2.physics = STATIC;

q5.update = function () {
	background('skyblue');
	
  playerActions(boxes)
  if (holding) {
    startDelivery()
  }
  timerCount()};
