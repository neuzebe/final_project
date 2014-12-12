/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: laser.js
 * Last Modified By: Noel Euzebe On Dec 9, 2014
 * Description: Describes the player's laser, used to fire at enemies 
 */
function Laser()
{
    this.image;
    this.speed = 150;
    this.active = false;
    this.facing_right = true;
    
    //sets up initial attributes and image, adds the laser to the stage
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
        stage.addChild(this.image);
        createjs.Sound.play("laser_shot");
    }
    
    //called every frame once the laser is on screen, updates the position of laser
    //and checks for collisions
    this.update = function(event)
    {            
        var delta = event.delta / 1000;          
        
        this.image.x += delta * this.speed * 3;
        
        this.checkLaserBulletCollision();
        if(boss.active)
            this.checkLaserBossCollision();        

        if(this.image.x < 0 || this.x > stage.canvas.width)
            this.selfDestruct();        
    }
    
    //resets the laser position and speed
    this.reset = function()
    {
        this.speed = Math.random() * 30 + 60;
        this.image.x = stage.canvas.width + this.image.image.width;        
    }
    
    //checks for and handles a collision between the laser and a BulletHead enemy
    this.checkLaserBulletCollision = function()
    {
        if(collision_manager.checkCollision(this, bullet))
        {                       
            this.selfDestruct();
            character.resetLaser();
            bullet.reset();
        }
    }  
    
    //checks for and handles a collision between the laser and a the PenguinBoss
    this.checkLaserBossCollision = function()
    {        
        if(this.active)
            if(collision_manager.checkCollision(this, boss))
            {                       
                this.selfDestruct();
                character.resetLaser();
                boss.takeDamage();
            }
    }    
    
    //removes the laser from the stage
    this.selfDestruct = function()
    {        
        stage.removeChild(this.image);
    }
    
    //flips the sprite if it's facing the wrong direction
    this.flip = function()
    {
        this.facing_right = !this.facing_right;
        this.speed *= -1;
        this.image.scaleX *= -1;
    }

}