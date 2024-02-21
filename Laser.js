export default class Laser {
    constructor(x,y) {
        this.width = 5;
        this.height = 15;
        this.color = "#F34569";
        this.x = x -this.width/2;
        this.y = y;
        this.speed = 5;
        this.damage = 10;
    
        
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        this.y -= this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }      
}