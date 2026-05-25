let currentDelivery = {
    destination: [0,0],
    time: 0,
    inProgress: false
}
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


    return deliveryText
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
        deliveryText.x = player.x + Math.cos(currentRad) * orbitDistance;
        deliveryText.y = player.y + Math.sin(currentRad) * orbitDistance;
        deliveryText.opacity = 1
        
        
    } else {
        // Fallback: If no delivery, keep arrow hidden or centered inside player
        deliveryText.x = player.x;
        deliveryText.y = player.y;
        deliveryText.opacity = 0
    }
}

function lerpAngle(current, target, step) {
    let diff = ((target - current + 180) % 360) - 180;
    if (diff < -180) diff += 360;
    return current + diff * step;
}

export function startDelivery() {
    print(currentDelivery.inProgress )
    if (currentDelivery.inProgress === false) {
        currentDelivery.inProgress = true
        currentDelivery.destination = [random(-100, 100), random(-100, 100)]

        deliveryLocation.x = currentDelivery.destination[0]
        deliveryLocation.y = currentDelivery.destination[1]
    }
}
