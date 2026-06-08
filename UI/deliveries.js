import {runTimer, timerRunning, remainingTime} from "./timer.js"
import {initLevels, levelUp, giveExp} from './levels.js'
import {addTime} from './timer.js'
import {giveMoney} from './money.js'
import {ui} from "../sketch.js"

export let currentDelivery = {
    destination: [0,0],
    time: 0,
    inProgress: false
}
let popup
let deliveryLocation

export function initdelivery(player) {
    let deliveries = new Group()
    let deliveryText = new deliveries.Sprite()

    deliveryText.img = "assets/arrow.jpg"
    deliveryText.physics = STATIC
    deliveryText.overlap(allSprites)
    deliveryText.stroke = 'transparent'; 
    deliveryText.scale = .2
    // Start position will be managed dynamically in the update loop
    deliveryText.x = player.x
    deliveryText.y = player.y
    deliveryText.rotationLock = true; 
    
    deliveryLocation = new deliveries.Sprite()
    deliveryLocation.physics = STATIC
    deliveryLocation.overlap(allSprites)
    deliveryLocation.stroke = "white"
    deliveryLocation.strokeWeight = 5
    deliveryLocation.fill = "transparent"
    deliveryLocation.w = 20
    deliveryLocation.h = deliveryLocation.w
    deliveryLocation.layer = 2

    return deliveryText
}

export function finishDelivery() {
    giveExp(100)
    giveMoney(50.50)
    addTime(30)
    currentDelivery.inProgress = false

    if (popup) return;
    let minutes = Math.floor( Math.floor(remainingTime / 1000) / 60);
    let seconds =  Math.floor(remainingTime / 1000) % 60;
    
    let strMins = minutes < 10 ? "0" + minutes : minutes;
    let strSecs = seconds < 10 ? "0" + seconds : seconds;
    
    popup = new ui.Sprite();
    popup.text = `Finished Delivery! + 30 sec`;
    popup.fill = "transparent"
    popup.stroke = "transparent"
    popup.textFill = 'black';
    popup.textSize = 14;
    popup.layer = 1000; 
        
    popup.life = 90; 

    setTimeout(() => {
        popup = undefined
    }, 1450)
}

export function deliver(player, deliveryText) {
    // Distance (radius) the arrow will hover away from the player
    let orbitDistance = 100; 

    if (currentDelivery.inProgress) {
        let targetX = currentDelivery.destination[0];
        let targetY = currentDelivery.destination[1];

        // 1. Calculate angle from player to the destination target
        let targetAngleRad = Math.atan2(targetY - player.y, targetX - player.x);
        let targetAngleDeg = targetAngleRad * (180 / Math.PI);

        // Offset if your original asset image points the wrong way (e.g., targetAngleDeg -= 180;)
        
        // 2. Smoothly rotate the arrow sprite
        deliveryText.rotation = lerpAngle(deliveryText.rotation, targetAngleDeg, 0.2);

        // 3. Position the arrow in an orbit around the player using the current visual rotation
        let currentRad = deliveryText.rotation * (Math.PI / 180);
        
        let orbitX = player.x + Math.cos(currentRad) * orbitDistance;
        let orbitY = player.y + Math.sin(currentRad) * orbitDistance;

        
        deliveryText.x = lerp(deliveryText.x, orbitX, 0.5)
        deliveryText.y = lerp(deliveryText.y, orbitY, 0.5)
        deliveryText.opacity = 1
        
        if (popup) {
            popup.x = deliveryText.x
            popup.y = deliveryText.y + 30
        }
        
    } else {
        // Fallback: If no delivery, keep arrow hidden or centered inside player

        
        deliveryText.x = player.x;
        deliveryText.y = player.y;
        deliveryText.opacity = 0

        if (popup) {
            popup.x = deliveryText.x
            popup.y = deliveryText.y + 30
        }
    }
}

function lerpAngle(current, target, step) {
    let diff = ((target - current + 180) % 360) - 180;
    if (diff < -180) diff += 360;
    return current + diff * step;
}

export function startDelivery() {
    if (currentDelivery.inProgress === false) {
        currentDelivery.destination = [random(-750, 750), random(-750, 750)]

        deliveryLocation.x = currentDelivery.destination[0]
        deliveryLocation.y = currentDelivery.destination[1]

        runTimer(1000 * 5)
        currentDelivery.inProgress = true

        //while (timerRunning === true) {}
        // currentDelivery.inProgress = false

    }
}

// q5.update = function() {
//     if (timerRunning === false && currentDelivery.inProgress === true) {
//         currentDelivery.inProgress = false 
//     }
// }