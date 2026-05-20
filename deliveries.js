export function initdelivery(player) {
    let deliveries = new Group()
    let deliveryText = new deliveries.Sprite()

    deliveryText.text = ":("
    deliveryText.physics = STATIC
    deliveryText.color = 'transparent'; 
    deliveryText.stroke = 'transparent'; 
    deliveryText.x = player.x-200
    deliveryText.y = player.y-200

    return deliveryText
}

export function deliver(player, deliveryText) {
    deliveryText.x = player.x-200
    deliveryText.y = player.y-200
}