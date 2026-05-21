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
    let targetPos = { x: currentDelivery.destination[0], y: currentDelivery.destination[1]}

    deliveryText.x = player.x-200
    deliveryText.y = player.y-200

    if (currentDelivery.inProgress) {
        deliveryText.text = "-->"
        deliveryText.rotateTowards(targetPos, .1, 90);
    }
}

export function startDelivery() {
    print(currentDelivery.inProgress )
    if (currentDelivery.inProgress === false) {
        currentDelivery.inProgress = true
        currentDelivery.destination = [random(-400, 400), random(-400, 400)]
    }
}