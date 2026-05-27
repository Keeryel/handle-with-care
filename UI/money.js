import {ui} from '../sketch.js'

let balance = 0
let paymentComplete = false
let cashUI

export function initMoney(){
    cashUI = new ui.Sprite()
    cashUI.overlap(allSprites)
    cashUI.text = ""
    cashUI.textSize = 12
    cashUI.fill = "gray"
    cashUI.stroke = "gray"
    cashUI.layer = 999
}

export function giveMoney(pay){
    if(!paymentComplete){
        balance += pay
        paymentComplete = true
    }
    if(paymentComplete){
        pay = 0
        paymentComplete = false
    }
}

export function displayMoney(){
    let money = balance.toFixed(2)
    cashUI.text = `$${money}`
    let cx = camera.x - 300
    let cy = camera.y - (canvas.h / 3) - 30
    cashUI.x = lerp(cashUI.x, cx, .5)
    cashUI.y = lerp(cashUI.y, cy, .5)
}

