function Bullet()
{
    this.image;
    this.bullet_speed = 50;
    
    this.init = function()
    {
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('bullet'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = stage.canvas.width + this.image.image.width;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95);                

    }
    
    this.update = function(event)
    {
        var delta = event.delta / 1000;

        this.image.x -= delta * this.bullet_speed * 3;

        if(this.image.x + this.image.image.width < 0)
            this.reset();        
    }
    
    this.reset = function()
    {
        bullet_speed = Math.random() * 30 + 60;
        this.image.x = stage.canvas.width + this.image.image.width;        
    }
}