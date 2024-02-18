import Laser from "./Laser.js";

export default class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.speed= 10
        this.lasers = [];
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
        this.canvas = document.getElementById("game");
        this.lastShootTime = Date.now();
        this.delay = 250;
        // First, create an Image object
        this.img = new Image();

        // Then, set the src attribute to your image file
        this.img.src = 'media/img/upArrow.svg';
    }
    
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y)
        this.move();
    }
    move() {
        if (this.leftPressed) {
        if (this.x > 0){
                this.x -= this.speed;
                console.log("moving");
                
            } else {
                console.log("stop");
            }
        }
        if (this.rightPressed) {
        if (this.x < this.canvas.width-this.img.width ){
                console.log("moving1");
                this.x += this.speed;
            }else {
                console.log("stop1");
                this.x= this.canvas.width-this.img.width ;
            }
        }
    
    }
    
    keydown = (e) => {
        if (e.code === "ArrowLeft") {
            this.leftPressed = true;
        }
        if (e.code === "ArrowRight") {
            this.rightPressed = true;
        }
        if (e.code === "Space") {
            e.preventDefault()
            this.shootPressed = true;
        }
    }

    keyup = (e) => {
        if (e.code === "ArrowLeft") {
            this.leftPressed = false;
        }
        if (e.code === "ArrowRight") {
            this.rightPressed = false;
        }
        if (e.code === "Space") {
            e.preventDefault()
            this.shootPressed = false;
        }
    }

    shoot() {
        this.now = Date.now();
        this.difference = this.now-this.lastShootTime;
        if (this.shootPressed && this.difference > this.delay) {
            console.log("shooting");
            this.lasers.push(new Laser(this.x+this.img.width/2,this.y));
            this.lastShootTime = this.now;
        }
    }
}