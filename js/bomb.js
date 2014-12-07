function Bomb()
{
    this.image;
    this.speed = 50;
    this.active = false;
    
    this.init = function(x, y)
    {
        this.active = true;
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('bomb'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = x;
        this.image.y = y;

    }
    
    this.update = function(event)
    {
        var delta = event.delta / 1000;

        this.image.y += delta * this.speed * 3;

        if(this.image.x + this.image.image.width < 0)
            this.reset();     
        
        if(this.image.y > stage.canvas.height)
            this.selfDestruct();
    }
    
    this.reset = function()
    {
        this.speed = Math.random() * 30 + 60;
        this.image.x = stage.canvas.width + this.image.image.width;        
    }
    
    this.selfDestruct = function()
    {
        stage.removeChild(this.image);
    }
}