import Laser from "./Laser.js";

export default class Player {
    constructor(x, y) {
        // First, create an Image object
        this.img = new Image();
        // Then, set the src attribute to your image file
        this.img.src = 'media/img/downArrow.svg';
        this.x = x;
        this.y = y-this.img.height;
        this.speed = 5;
        this.lasers = [];
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
        this.canvas = document.getElementById("game");
        this.lastShootTime = Date.now();
        this.delay = 250;
        this.rotationAngle = 0; // Initialize rotation angle
    }

    draw(ctx) {
        ctx.save(); // Save the current context state
        ctx.translate(this.x + this.img.width / 2, this.y + this.img.height / 2); // Translate to the center of the player
        ctx.rotate(this.rotationAngle * Math.PI / 180); // Rotate the canvas
        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2); // Draw the image centered
        ctx.restore(); // Restore the context to its original state
        this.move(); // Move the player
    }
    
    
    

    move() {
        if (this.leftPressed && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.rightPressed && this.x < this.canvas.width - this.img.width) {
            this.x += this.speed;
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
            e.preventDefault();
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
            e.preventDefault();
            this.shootPressed = false;
        }
    }

    shoot() {
        this.now = Date.now();
        this.difference = this.now - this.lastShootTime;
        if (this.shootPressed && this.difference > this.delay) {
            console.log("shoti");

            this.lasers.push(new Laser(this.x+this.img.width / 2, this.y-this.img.height / 2));
            console.log("shooti");
            this.lastShootTime = this.now;
        }
    }

    // Method to rotate the player
    rotate() {
        if(this.rotationAngle < 180){
            this.rotationAngle++; // Increment the rotation angle by 180 degrees
        }
    }
}
