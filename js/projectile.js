/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: projectile.js
 * Last Modified By: Noel Euzebe On Dec 9, 2014
 * Description: describes the projectile/bullet which the penguinboss shoots towards the player
 */
function Projectile()
{
    this.image;
    this.speed = -150;
    this.active = false;
    this.facing_right = false;
    
    //sets up initial values and object image, adds to stage
    this.init = function(x, y)
    {
        this.facing_right = true;
        this.speed = -150;
        this.active = true;
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('projectile'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = x;
        this.image.y = y;
        stage.addChild(this.image);
        createjs.Sound.play("laser_shot");
    }
    
    //called every frame that the projectile is on the stage, updates position
    //and checks for certain collisions
    this.update = function(event)
    {            
        var delta = event.delta / 1000;          
        
        this.image.x += delta * this.speed * 3;
        
        if(this.active)
            this.checkProjectilePlayerCollision();

        if(this.image.x < 0 || this.x > stage.canvas.width)
            this.selfDestruct();        
    }
    //checks for and handles a collision between the projectile and the player
    this.checkProjectilePlayerCollision = function()
    {
        if(collision_manager.checkCollision(this, character))
        {                     
            console.log("proj hit player");
            this.selfDestruct();
            boss.resetProjectile();
            character.takeDamage();
        }
    }    
    
    //resets the position of the projectile
    this.reset = function()
    {
        this.speed = Math.random() * 30 + 60;
        this.image.x = stage.canvas.width + this.image.image.width;        
    }
    
    //removes the object from the stage
    this.selfDestruct = function()
    {        
        stage.removeChild(this.image);
    }
    
    //flips the sprite if it's facing the wrong direction
    this.flip = function()
    {
        console.log("flipped");
        this.facing_right = !this.facing_right;
        this.speed *= -1;
        this.image.scaleX *= -1;
    }

}