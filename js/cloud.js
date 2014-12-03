function Cloud()
{
    this.image;
    
    this.init = function()
    {
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('cloud'));        
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.y = (Math.random() * (stage.canvas.height / 2));
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
        this.image.y = (Math.random() * (stage.canvas.height / 2)) ;        
    }
}