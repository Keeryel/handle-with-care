import {initPlayer, playerActions, holding} from './plyr.js' 
import {initTimer, timerCount, addTime, timerRunning} from './UI/timer.js'
import {deliver, initdelivery, startDelivery, currentDelivery} from "./UI/deliveries.js"
import {initMoney, giveMoney, displayMoney} from './UI/money.js'

await Canvas();

export let ui
ui = new Group
ui.autoDraw = false
ui.layer = 9999

let player = initPlayer();
initTimer()
initMoney()

let deliveryText = initdelivery(player)



let boxes = new Group()

let smallBox = new boxes.Sprite()
smallBox.x = 50
smallBox.drag = 5
smallBox.mass = 2
smallBox.scale = 0.6
smallBox.rotationDrag = 5
smallBox.layer = 2
smallBox.opacity = 0

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
	deliver(player, deliveryText)

  displayMoney()
  if (holding) {
    startDelivery()
  }
  playerActions(smallBox)
  timerCount()

  if (timerRunning === false && currentDelivery.inProgress === true) {
    currentDelivery.inProgress = false 
  }
};

