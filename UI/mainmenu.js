import {ui} from '../sketch.js'

let mainMenu

export function initMainMenu() {
    mainMenu = new Group()
    mainMenu.visible = false 
    mainMenu.layer = 99999
    mainMenu.overlap(allSprites)

    let logo = new mainMenu.Sprite()
    logo.img = "assets/logo.png"
    logo.physics = STATIC
    logo.stroke = 'transparent'; 
    logo.scale = .2

    

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