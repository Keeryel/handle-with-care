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

        //let popup = new Sprite(0, 0, 180, 35, 'none');
        // popup.color = 'lightblue';
        // popup.text = "me hwne money";
        
        // // Drift up slightly while active
        // popup.vel.y = -1; 
        
        // Fade out over 1.5 seconds (90 frames)
        //popup.life = 90; 
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

