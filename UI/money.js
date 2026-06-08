import {ui} from '../sketch.js'

export let balance = 0
let paymentComplete = false
let cashUI
let popup

export function initMoney(){
    cashUI = new ui.Sprite()
    cashUI.text = ""
    cashUI.textSize = 16
    cashUI.textFill = "green"
    cashUI.fill = "transparent"
    cashUI.stroke = "transparent"
    cashUI.layer = 999
    
}

export function giveMoney(pay){
    if(!paymentComplete){
        balance += pay
        paymentComplete = true

        if (popup) return;
        popup = new ui.Sprite();
        popup.text = pay > 0? `+$${pay.toFixed(2)}` : `-$${(pay*-1).toFixed(2)}`
        popup.stroke = "transparent"
        popup.fill = "transparent"
        popup.textFill = 'black';
        popup.textSize = 14;
        popup.layer = 1000; 
                
        popup.life = 90; 

        setTimeout(() => {
            popup = undefined
        }, 1450)
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
    if (popup) {
        popup.x = cashUI.x
        popup.y = cashUI.y + 30
    }
}

