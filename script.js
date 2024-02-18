import Player from "./Player.js";
import Dot from "./Dot.js";


let player;
let dots = [];
let timeStamp = 0;
let interval = 1500;
let score = 0
let textX = 550

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 550;
canvas.height = 600;

player = new Player(canvas.width/2, canvas.height-100);
// timeStamp = millis(); <--- omskriv med setInterval

const PercentOfCanvasHeight = canvas.height * 0.3 ; // Calculate 10% of canvas height

for (let i = 50; i < canvas.width; i += 50) { // x
    for (let j = 50; j < canvas.height - PercentOfCanvasHeight; j += 50) { // y
        dots.push(new Dot(i, j));
    }
}



function gameLoop() {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dots.forEach((dot) => {
        dot.draw(ctx);
    });
    player.draw(ctx);
    player.shoot();
    player.lasers.forEach((laser) => {
        if (laser.y<-laser.height) {
            const index = player.lasers.indexOf(laser);
            player.lasers.splice(index, 1);
        }
        laser.draw(ctx);
    });
}

setInterval(gameLoop, 1000 / 60);





















// Run this function when the window has finished loading
//------------------------ kilde chatgpt, virker ikke lige nu
// https://chat.openai.com/share/37266c94-caf0-4b3c-8639-6e268e9d3fc4
window.onload = function() {
    // Call the function to update the body height
    updateBodyHeight();
};

// Run this function whenever the window is resized
window.onresize = function() {
    // Call the function to update the body height  
    updateBodyHeight();
};

// Function to update the body height based on the background image size and viewport dimensions
function updateBodyHeight() {
    // Create a new image object
    var img = new Image();
    // Set the source of the image
    img.src = 'media/img/pb.png';
    // Once the image has loaded
    img.onload = function() {
        // Calculate the body height based on the image's aspect ratio and the current viewport width
        var bodyHeight = (window.innerWidth * img.height) / img.width;
        // Set the body's height to the calculated value
        document.body.style.height = bodyHeight + 'px';
    };
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
nedpil.onclick = function(event){
    event.preventDefault();
    scrollToSection("ommig")
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