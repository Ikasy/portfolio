export default class Dot {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle = "#ffffff1a";
        ctx.fill();
    }
}