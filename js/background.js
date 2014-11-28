function Background()
{
    this.backdrop;
    this.ground;
    
    this.init = function()
    {
        this.backdrop = new createjs.Bitmap(queue.getResult('background'));
        this.backdrop.regX = this.backdrop.image.width / 2;
        this.backdrop.regY = this.backdrop.image.height / 2;
        this.backdrop.x = stage.canvas.width / 2;
        this.backdrop.y = stage.canvas.height / 2;  
        
        this.ground = new createjs.Bitmap(queue.getResult('ground'));
        this.ground.regX = this.ground.image.width / 2;
        this.ground.regY = this.ground.image.height / 2;
        this.ground.x = stage.canvas.width / 2;
        this.ground.y = stage.canvas.height - (this.ground.image.height * 0.5);         
    }
    
    this.update = function(event)
    {
        var delta = event.delta / 1000;
        this.ground.x -= delta * stage_speed;

        if ( (this.ground.x) < 0)
            this.reset();        
    }
    
    this.reset = function()
    {
        this.ground.x = stage.canvas.width / 2; 
    }
}