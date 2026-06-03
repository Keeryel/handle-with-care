import {ui} from '../sketch.js'

let balance = 0
let paymentComplete = false
let cashUI

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

        let popup = new ui.Sprite(cashUI.x, cashUI.y + 20, 120, 25, 'none');
        popup.color = 'lightblue';
        popup.text = `+$${pay.toFixed(2)}`;
        popup.textFill = 'black';
        popup.textSize = 14;
        popup.layer = 1000; 
        
        popup.vel.y = -0.5; 
        
        popup.life = 90; 
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

