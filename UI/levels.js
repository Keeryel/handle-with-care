import {ui} from '../sketch.js'
import { giveMoney } from "./money.js"

export let level

let exp = 0
let currentLevel = 0
let popup

export function initLevels(){
    level = new ui.Sprite()
    level.text = ''
    level.fill = 'transparent'
    level.stroke = 'transparent'
}
//make sure to call this only once upon gaining xp
export function giveExp(e){
    exp += e
    
}

export function levelUp(){
    let t = 100 * 2 ** currentLevel
    
    while (exp >= t){
        exp -= t
        currentLevel += 1
        t = t
        giveMoney(3.00)
        
        if (popup) return;
        popup = new ui.Sprite();
        popup.text = `Level Up! Level:${currentLevel}`;
        popup.fill = "transparent"
        popup.stroke = "transparent"
        popup.textFill = 'black';
        popup.textSize = 14;
        popup.layer = 1000; 
            
        popup.life = 90; 
    
        setTimeout(() => {
            popup = undefined
        }, 1450)
    }

    level.text = `LVL: ${currentLevel}`

    let cx = camera.x + 300
    let cy = camera.y - (canvas.h / 3) - 30

    level.x = lerp(level.x, cx, .5)
    level.y = lerp(level.y, cy, .5)

    if (popup) {
        popup.x = level.x
        popup.y = level.y + 30
    }
}