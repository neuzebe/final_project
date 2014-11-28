function Tree()
{
    this.image;
    
    this.init = function()
    {
        this.image = new createjs.Bitmap(queue.getResult('tree'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95);
        this.image.x = (Math.random() * (stage.canvas.width)) + 1;            
    }
    
    this.update = function(event)
    {
        var delta = event.delta / 1000;
        this.image.x -= delta * stage_speed;        
        if(this.image.x + this.image.image.width < 0)
            this.reset();             
    }
    
    this.reset = function()
    {
       this.image.x = stage.canvas.width + this.image.image.width;
    }
}