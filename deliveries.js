let currentDelivery = {
    destination: [0,0],
    time: 0,
    inProgress: false
}

export function initdelivery(player) {
    let deliveries = new Group()
    let deliveryText = new deliveries.Sprite()

    deliveryText.text = "--"
    deliveryText.physics = STATIC
    deliveryText.color = 'transparent'; 
    deliveryText.stroke = 'transparent'; 
    deliveryText.x = player.x-200
    deliveryText.y = player.y-200
    deliveryText.rotationLock = true; 

    return deliveryText
}

export function deliver(player, deliveryText) {
    deliveryText.x = player.x-200
    deliveryText.y = player.y-200

    if (currentDelivery.inProgress) {
        deliveryText.text = "-->"
        deliveryText.angle = deliveryText.angleTo(currentDelivery.destination[0], currentDelivery.destination[1]);
    }
}

export function startDelivery() {
    if (!currentDelivery.inProgress) {
        currentDelivery.inProgress = true
        currentDelivery.destination = [random(-400, 400), random(-400, 400)]
    }
}