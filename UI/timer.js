export let timer;
let timeLimit = 480 * 1000; 
let startTime;
export let timerRunning = false;

export function initTimer(){
    timer = new Sprite();
    timer.w = 100;
    timer.h = 40;
    timer.overlap(allSprites);
    timer.collider = 'static';
    timer.text = "";
    timer.color = 'black';
    timer.layer = 222222222222222222222222222222222;
    timer.textSize = 24;
}

export function runTimer(time) {
    timerRunning = true
    timer.textFill = "red";
    timeLimit = time; 
    console.log(time)
    startTime = millis(); 
}

export function addTime(secondsToAdd) {
    if (timerRunning) {
        timeLimit += secondsToAdd * 1000;
    }
}

export function timerCount(){
    let timeLeft = 0;

    if (timerRunning) {
        let elapsedTime = millis() - startTime;
        let remainingTime = timeLimit - elapsedTime;

        if (timeLimit > 5999000) {
            timeLimit = 5999000 + elapsedTime
        }
        
        if (remainingTime > 5999000) {
            remainingTime = 5999000
        }
        
        if (remainingTime <= 0) {
            remainingTime = 0;
            timerRunning = false;
        }

        timeLeft = Math.floor(remainingTime / 1000);
    }

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    let strMins = minutes < 10 ? "0" + minutes : minutes;
    let strSecs = seconds < 10 ? "0" + seconds : seconds;
    
    timer.text = `${strMins}:${strSecs}`;

    // Check timerRunning directly to swap colors
    if (timerRunning === false) {
        timer.textFill = "green";
    }
    

    timer.x = camera.x;
    timer.y = camera.y - (canvas.height / 3) - 50; 
}