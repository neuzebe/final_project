function Laser()
{
    this.image;
    this.speed = 150;
    this.active = false;
    this.facing_right = true;
    this.init = function(x, y)
    {
        this.facing_right = true;
        this.speed = 150;
        this.active = true;
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('laser'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = x;
        this.image.y = y;

    }
    
    this.update = function(event)
    {            
        var delta = event.delta / 1000;          
        
        this.image.x += delta * this.speed * 3;

        if(this.image.x < 0 || this.x > stage.canvas.width)
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
    
    this.flip = function()
    {
        this.facing_right = !this.facing_right;
        this.speed *= -1;
        this.image.scaleX *= -1;
    }

}