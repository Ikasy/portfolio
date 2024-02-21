import Player from "./Player.js";
import Dot from "./Dot.js";

let player;
let dots = [];

let score = 0;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startSpilKnap = document.getElementById("startSpil");
const topdiv = document.getElementById("top");

function initializeGame(){
    // Clear the canvas with a transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots = []

    // størrelse på kanvas
    canvas.width =  window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    

    const PercentOfCanvasHeight = canvas.height * 0.25; // Calculate 10% of canvas height
    const PercentOfCanvasHeightPlayer = canvas.height * 0.1; // Calculate 10% of canvas height
    for (let i = 10; i < canvas.width; i += 50) {
        for (let j = 10; j < canvas.height - PercentOfCanvasHeight; j += 50) {
            dots.push(new Dot(i, j));
        }
    }
    dots.forEach((dot) => {
        dot.draw(ctx);
    });
    
    startSpilKnap.onclick = function(event){
        topdiv.classList.add('hidden');
        setInterval(gameLoop, 1000 / 60);
    }
    player = new Player(canvas.width / 2, canvas.height-PercentOfCanvasHeightPlayer);
    player.draw(ctx)
}

function gameLoop() {
    // Clear the canvas with a transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background elements
    dots.forEach((dot) => {
        dot.draw(ctx);
    });
    ctx.fillStyle = "white";
    ctx.font = "calc(15px + 0.390625vw) handskrift";
    ctx.fillText("Piletaster = bevægelse, Mellemrum = Skyde", 0, canvas.height-50);
    ctx.fillText(` ${score}`, canvas.width-100, canvas.height-50);


    // Draw player and its lasers
    player.draw(ctx);
    player.shoot();     
    player.lasers.forEach((laser, laserIndex) => {
        // Check if laser is out of bounds
        if (laser.y < -laser.height) {
            player.lasers.splice(laserIndex, 1);
            console.log(player.lasers.length);
        } else {
            laser.draw(ctx); // Moved draw here to ensure laser is always drawn if not removed
            dots.forEach((dot, dotIndex) => {
                // Check for collision between laser and dot
                if (
                    laser.x + laser.width / 2 > dot.x - dot.radius &&
                    laser.x + laser.width / 2 < dot.x + dot.radius &&
                    laser.y < dot.y + dot.radius &&
                    laser.y + laser.height > dot.y
                ) {
                    console.log("hit");
                    player.lasers.splice(laserIndex, 1);
                    dots.splice(dotIndex, 1);
                    score += 10;
                }
            });
        }
    });
    
player.rotate();
}

if (window.innerWidth > 1200) {
    window.onload = function() {
        initializeGame();
    };
    window.onresize = function() {
        initializeGame();
    };
} else{
    initializeGame();
    startSpilKnap.style.display = "none";
    
}


// Scroll smooth ned til elementer 
// Fra tidligere projekt. Interaktiv Storytelling.

//laver en funkion kaldet scrollToSection, den får elementId når den bliver kalds
function scrollToSection(elementId) {

    //henter sektionen den skal sxroll til
    const element = document.getElementById(elementId);
    const offset = 100; // offset til headeren, kan justeres
    const position = element.offsetTop - offset; //finder positionen . Element.offsetTop er toppen af elementet - den bestemte offset

    //ruller ned til stedet og gør det smooth
    window.scrollTo({
        top: position,
        behavior: "smooth"
    });
}

const ommiglink = document.getElementById("ommiglink");
const projektlink = document.getElementById("projektlink");
const kontaktlink = document.getElementById("kontaktlink");
const nedpil = document.getElementById("nedpil");

// AKTIVERE SCROLLS
ommiglink.onclick = function(event){
    event.preventDefault();
    scrollToSection("ommig")
}
projektlink.onclick = function(event){
    event.preventDefault();
    scrollToSection("projekt")
}
kontaktlink.onclick = function(event){
    event.preventDefault();
    scrollToSection("kontakt")
}
tilbageTilTop.onclick = function(event){
    event.preventDefault();
    scrollToSection("top")
}

let scrollPosition; 
document.body.onscroll = function(){
    scrollPosition = Math.round(window.scrollY);
    if (scrollPosition > 670){
        tilbageTilTop.style.display = "block";
    }
    else{
        tilbageTilTop.style.display = "none";
        
    }
}