function Balloon()
{
    this.image;
    this.speed = -50;
    this.timer = 0;
    this.shoot_cooldown = 2;
    this.bomb;
    
    this.init = function()
    {
        this.bomb = new Bomb();
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('balloon'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = stage.canvas.width / 2;
        this.image.y = 200;

    }
    
    this.update = function(event)
    {        
        var delta = event.delta / 1000;
        this.timer += delta;
        
        if(this.timer >= this.shoot_cooldown)
        {
            this.shoot();
            this.timer = 0;
        }
        
        if(this.bomb.active)
            this.bomb.update(event);
        
        this.image.x -= delta * this.speed * 4;

        if(this.image.x < 0 || this.image.x > stage.canvas.width )
            this.reset();        
    }
    
    this.reset = function()
    {
        
        this.speed *= -1;           
    }
    
    this.shoot = function()
    {               
        this.bomb.init(this.image.x, this.image.y);
        stage.addChild(this.bomb.image);
    }    
}