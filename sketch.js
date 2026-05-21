import {initPlayer, playerActions, holding} from './plyr.js'
import {deliver, initdelivery, startDelivery} from "./deliveries.js"

await Canvas();

let player = initPlayer();

let boxes = new Group();
let deliveryText = initdelivery(player)

let smallBox = new boxes.Sprite();
smallBox.x = 50
smallBox.drag = 5
smallBox.mass = 2
smallBox.scale = 0.6
smallBox.rotationDrag = 5


let wallA = new Sprite();
wallA.x = -120;
wallA.width = 220;
wallA.rotation = 30;
wallA.physics = STATIC;

let wallB = new Sprite();
wallB.x = 120;
wallB.width = 220;
wallB.rotation = -30;
wallB.physics = STATIC;


q5.update = function () {
	background('green');
	
  playerActions(boxes)

  deliver(player, deliveryText)

  if (holding) {
    startDelivery()
  }
};
