export let boxes
export let smallBox

export function initBoxes(){
    boxes = new Group()
    boxes.layer = 2
    boxes.collider = 'dynamic'
    boxes.drag = 5
    boxes.rotationDrag = 5
    boxes.opacity = 1
    boxes.color = "brown"

    smallBox = new boxes.Group()
    smallBox.x = 50
    smallBox.y = 0
    smallBox.visible = false
    smallBox.mass = 2
    smallBox.scale = 0.6
}