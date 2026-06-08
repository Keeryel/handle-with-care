import {ui, menu} from '../sketch.js'

let mainMenu

export function initMainMenu() {
    mainMenu = new menu.Group()
    mainMenu.visible = false 
    mainMenu.layer = 99
    mainMenu.overlap(allSprites)

    let logo = new mainMenu.Sprite()
    logo.img = "assets/logo.png"
    logo.physics = STATIC
    logo.stroke = 'transparent'; 
    logo.scale = .2
    logo.layer = 99
    logo.overlap(allSprites)

    

    //to-do: create main menu
}

export function showMainMenu() {
    mainMenu.x = camera.x
    mainMenu.y = camera.y

    mainMenu.visible = true
}

export function hideMainMenu() {
    mainMenu.visible = false
}