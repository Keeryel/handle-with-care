import {initPlayer, playerActions, holding} from './plyr.js' 
import {initTimer, timerCount, addTime, timerRunning} from './UI/timer.js'
import {deliver, initdelivery, startDelivery, currentDelivery, finishDelivery} from "./UI/deliveries.js"
import {initMoney, giveMoney, displayMoney} from './UI/money.js'
import {initLevels, levelUp} from './UI/levels.js'
await Canvas();

export let ui
export let menu

menu = new Group()
ui = new Group()

menu.layer = 11
ui.layer = 10

menu.overlap(allSprites)
ui.overlap(allSprites)

menu.physics = STATIC
ui.physics = STATIC

let player = initPlayer();
player.layer = 9

initTimer()
initMoney()
initLevels()

let deliveryText = initdelivery(player)
deliveryText.layer = 8



let boxes = new Group()
boxes.layer = 2

let smallBox = new boxes.Sprite()
smallBox.x = 50
smallBox.drag = 5
smallBox.mass = 2
smallBox.scale = 0.6
smallBox.rotationDrag = 5
smallBox.opacity = 0

let boundiary =  new Group()
boundiary.layer = 3

let borderY1 = new boundiary.Sprite();
borderY1.x = 0;
borderY1.y = -800;
borderY1.w = 1600;
borderY1.h = 100;
borderY1.rotation = 0;
borderY1.physics = STATIC;

let borderY2 = new boundiary.Sprite();
borderY2.x = 0;
borderY2.y = 800
borderY2.w = 1600;
borderY2.h = 100;
borderY2.rotation = 0;
borderY2.physics = STATIC;

let borderX1 = new boundiary.Sprite();
borderX1.x = 800;
borderX1.y = 0;
borderX1.w = 1600;
borderX1.h = 100;
borderX1.rotation = 90;
borderX1.physics = STATIC;

let borderX2 = new boundiary.Sprite();
borderX2.x = -800;
borderX2.y = 0;
borderX2.w = 1600;
borderX2.h = 100;
borderX2.rotation = 90;
borderX2.physics = STATIC;

q5.update = function () {
	background('skyblue');
	

 
  if (holding) {
    startDelivery()
  }
  playerActions(smallBox)
  

  if (timerRunning === false && currentDelivery.inProgress === true) {
    currentDelivery.inProgress = false 
  }

  if (smallBox.x >= currentDelivery.destination[0] && smallBox.x <= currentDelivery.destination[0]+20 &&
    smallBox.y >= currentDelivery.destination[1] && smallBox.y <= currentDelivery.destination[1]+20
    )
  {
    finishDelivery()
  }
  timerCount()
  deliver(player, deliveryText)
  displayMoney()
  levelUp()
};

