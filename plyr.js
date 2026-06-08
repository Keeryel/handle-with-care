import {deliver, initdelivery, startDelivery, currentDelivery} from "./UI/deliveries.js"
import {speed} from "./UI/shop.js"

export let plyr;
export let holding = null;
export let isHoldingItem = false
let maxDist =90
let offset;

export function initPlayer() {
  plyr = new Sprite();
  plyr.w = 50;
  plyr.h = plyr.w;
  plyr.drag = 15;
  plyr.mass = 20;
  plyr.img = "./assets/guy.png"
  plyr.rotationDrag = 0.1; // Fixed rotation drag

  const offsetDistance = plyr.w; 
  offset = offsetDistance;

  return plyr
}

// 2. Export the frame loop actions to pass into q5.update
export function playerActions(boxes) {
  plyr.rotation = Math.atan2(mouseY - plyr._canvasPos.y, mouseX - plyr._canvasPos.x) * (180/Math.PI)

  camera.x = lerp(camera.x, plyr.x, 0.2);
  camera.y = lerp(camera.y, plyr.y, 0.2);

  // Movement
  if (keyIsDown("w")) plyr.vel.y -= 3*speed;
  if (keyIsDown("s")) plyr.vel.y += 3*speed;
  if (keyIsDown("a")) plyr.vel.x -= 3*speed;
  if (keyIsDown("d")) plyr.vel.x += 3*speed;

  if (kb.presses("r") && currentDelivery.inProgress == false) {
    startDelivery()
    holding = boxes
    boxes.visible = true
  }
  if (currentDelivery.inProgress == false && boxes != undefined) {
    holding = null
    boxes.visible = false
  }

  // Grabbing / Dropping
  if (kb.presses("e")) {
    if (holding) {
        isHoldingItem = true
        holding.vel.x = 0;
        holding.vel.y = 0;
        holding = null;
      }
    else {
        let near = null;
        let min = 100; 
        if (typeof(boxes) != Array) return;
        for (let box of boxes) {
          let d = dist(mouse.x, mouse.y, box.x, box.y);
          let plyr_d = dist(plyr.x, plyr.y, box.x, box.y);

          if (plyr_d < maxDist) {
            if (d < min) {
              min = d;
              near = box;
            }
          }
        }
        if (near) holding = near;
      }
  }

  // Lock holding position
  if (holding) {
    holding.x = plyr.x + cos(plyr.rotation) * offset;
    holding.y = plyr.y + sin(plyr.rotation) * offset;
    holding.rotation = plyr.rotation;
    holding.vel.x = plyr.vel.x;
    holding.vel.y = plyr.vel.y;
  }

  // Throwing (kind of buggy, just walk around the box untill it works)
  if (kb.presses("q") && holding) {
    isHoldingItem = false
    const strength = 10;
    
    let f_app = (plyr.vel.x * cos(plyr.rotation)) + (plyr.vel.y * sin(plyr.rotation));
    if (f_app < 0) f_app = 0; 
    
    let force = strength + f_app;

    holding.vel.x = (cos(plyr.rotation) * force) + plyr.vel.x;
    holding.vel.y = (sin(plyr.rotation) * force) + plyr.vel.y;

    holding = null;
  }
}
