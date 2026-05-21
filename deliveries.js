let currentDelivery = {
    destination: [0,0],
    time: 0,
    inProgress: false
}

export function initdelivery(player) {
    let deliveries = new Group()
    let deliveryText = new deliveries.Sprite()

    deliveryText.img = "assets/arrow.jpg"
    deliveryText.physics = STATIC
    //deliveryText.color = 'transparent'; 
    deliveryText.stroke = 'transparent'; 
    deliveryText.x = player.x-200
    deliveryText.y = player.y-200
    deliveryText.rotationLock = true; 
    deliveryText.speed = 21

    return deliveryText
}
export function deliver(player, deliveryText) {
    // 1. Maintain the UI placement relative to the player
    deliveryText.x = player.x - 200;
    deliveryText.y = player.y - 200;

    if (currentDelivery.inProgress) {
        let targetX = currentDelivery.destination[0];
        let targetY = currentDelivery.destination[1];

        let targetAngleRad = Math.atan2(targetY - deliveryText.y, targetX - deliveryText.x);
        let targetAngleDeg = targetAngleRad * (180 / Math.PI);

        targetAngleDeg -= 180;

        deliveryText.rotation = lerpAngle(deliveryText.rotation, targetAngleDeg, 0.1);
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
    }
}