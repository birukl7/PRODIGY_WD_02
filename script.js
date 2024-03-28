/**
 *  elements
 */
const display = document.getElementById("display"); //The main time displayer
const startBtn = document.querySelector('#start'); // The start button
const lapBtn = document.querySelector('#lap'); // The lap button
const resetBtn = document.querySelector('#reset'); // The reset button
const playPause = document.querySelector('#play-pause'); // The play and pause icon
const lapContainer = document.querySelector('#lap-container'); // Container for the laps
const mainConatiner = document.querySelector('#container') //The top level under body element Main container 


/**
 * Booleans and variables for the timer functions
 */
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let counter = 1;
let lapStart = false;
let isRunning = false;



lapBtn.addEventListener('click',()=>{
    updateLap()
})


/**
 * 
 * Main funciton that update the lap
 */
const updateLap = ()=>{
    if(!lapStart) return;
    if(mainConatiner.offsetHeight >= document.body.offsetHeight){
        document.body.classList.remove('h-screen')
    }
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = 
    String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
   
        lapContainer.innerHTML += `
        <div><span class="mr-4">#${counter++}</span><span>${hours}:${minutes}:${seconds}:${milliseconds}</span></div>
     `


}

startBtn.addEventListener('click', ()=>{
    lapBtn.classList.remove('invisible')
    resetBtn.classList.remove('invisible')
    if(!isRunning){
        start()
        isRunning = !isRunning;
        playPause.classList.remove('fa-play')
        playPause.classList.add('fa-pause')
        lapStart = !lapStart;
    
    } else {
        stop()
        isRunning = !isRunning;
        playPause.classList.remove('fa-pause')
        playPause.classList.add('fa-play')
        lapStart = !lapStart;
       
    }
})

resetBtn.addEventListener('click', ()=>{
    reset()
    playPause.classList.remove('fa-pause')
    playPause.classList.add('fa-play')
})


/**
 * Some neccessary functions
 */
function start(){
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
}

function stop(){
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
  
}
 
function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;    
    display.textContent = "00:00:00:00";
    lapContainer.innerHTML = ''
    counter = 1
    lapStart = false;
    document.body.classList.add('h-screen')
}

function update(){

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
   
}