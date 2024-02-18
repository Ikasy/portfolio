export default class Dot {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    
    draw(ctx) {
        console.log("working")
        ctx.beginPath();
        ctx.arc(this.x, this.y,10,0,2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}