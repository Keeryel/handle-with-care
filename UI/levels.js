import {ui} from '../sketch.js'
import { giveMoney } from "./money.js"

export let level

let exp = 0
let currentLevel = 0

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
        
    }

    level.text = `LVL: ${currentLevel}`

    let cx = camera.x + 300
    let cy = camera.y - (canvas.h / 3) - 30

    level.x = lerp(level.x, cx, .5)
    level.y = lerp(level.y, cy, .5)
}