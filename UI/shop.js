import {ui} from '../sketch.js'
import {balance, giveMoney} from "./money.js"

let spriteButton
let shopMenu
let shopButton
let shopButtons = []

export let speed = 1

export function initShop(){
    spriteButton = new ui.Sprite();
    spriteButton.text = "Shop";
    spriteButton.color = "crimson";
    spriteButton.textColor = "white";
    spriteButton.textSize = 20;
    spriteButton.physics = STATIC
    spriteButton.w = 150
    spriteButton.h = 50

    shopMenu = new ui.Sprite()
    shopMenu.w = 400
    shopMenu.h = 100
    shopMenu.visible = false

    shopButton = new Group()
    shopButton.w = 50
    shopButton.h = 50
    shopButton.textSize = 20;
    shopButton.physics = STATIC
    shopButton.visible = false
    shopButton.textSize = 10
    shopButton.color = "green"

    let bttn =  new shopButton.Sprite()
    bttn.text = "increase speed \n$1.00"
    bttn.x = 50
    shopButtons.push(bttn)
}


export function displayShop(){
    let cx = camera.x - 300
    let cy = camera.y + (canvas.h / 3) - 30
    spriteButton.x = lerp(spriteButton.x, cx, .5)
    spriteButton.y = lerp(spriteButton.y, cy, .5)

    shopMenu.x = lerp(shopMenu.x, cx+300, .5)
    shopMenu.y = lerp(shopMenu.y, cy, .5)

    for (let i = 0; i < shopButtons.length; i++) {
        shopButtons[i].x = cx*i
        shopButtons[i].y = cy
    }

    if (mouse.x <= cx+(spriteButton.w/2) && mouse.x >= cx-(spriteButton.w/2) &&
    mouse.y <= cy+(spriteButton.h/2) && mouse.y >= cy-(spriteButton.h/2)
    )
    {
        spriteButton.color = "pink"

        if (mouse.presses()) {
            shopMenu.visible = !shopMenu.visible

            for (let i = 0; i < shopButtons.length; i++) {
                shopButtons[i].visible = shopMenu.visible
            }               
         }
     } else {
        spriteButton.color = "crimson"
     }

     for (let i = 0; i < shopButtons.length; i++) {
        if (mouse.x <= shopButtons[i].x+(shopButtons[i].w/2) && mouse.x >= shopButtons[i].x-(shopButtons[i].w/2) &&
        mouse.y <= shopButtons[i].y+(shopButtons[i].h/2) && mouse.y >= shopButtons[i].y-(shopButtons[i].h/2)
        )
        {
            shopButtons[i].color = "gray"
    
            if (mouse.presses() && balance >= 1) {
                giveMoney(-1)
                speed++
                shopButtons[i].color = "darkgray"

                setTimeout(() => {
                    shopButtons[i].color = "green"
                }, 1000)
             }
         } else {
            shopButtons[i].color = "green"
         }
    }
}
