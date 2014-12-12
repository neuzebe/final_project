/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: balloon.js
 * Last Modified By: Noel Euzebe On Dec 7, 2014
 * Description: describes the attributes and behaviours of the Balloon enemy
 */
function Balloon()
{
    this.image;
    this.speed = -50;
    this.timer = 0;
    this.shoot_cooldown = 2;
    this.bomb;
    
    //sets up initial values and image
    this.init = function()
    {
        this.bomb = new Bomb();
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('balloon'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = stage.canvas.width / 2;
        this.image.y = 200;

    }
    
    //updates balloon position every frame, and controls when to drop bombs
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
    
    //inverts balloon direction of movement once it reaches the edge of the screen
    this.reset = function()
    {
        
        this.speed *= -1;           
    }
    
    //drops a bomb towards the player
    this.shoot = function()
    {               
        this.bomb.init(this.image.x, this.image.y);
        stage.addChild(this.bomb.image);
    }    
}