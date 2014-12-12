/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: boss.js
 * Last Modified By: Noel Euzebe On Dec 10th, 2014
 * Description: Defintion for the boss, PenguinBoss
 */
function Boss()
{
    this.image;
    this.projectile;
    this.facing_right = false;
    this.speed = 50;
    this.active = false;
    this.timer = 0;
    this.shoot_cooldown = 2;
    this.lives = 3;
    
    //sets up default boss attributes, image and location and adds to the stage
    this.init = function()
    {        
        this.active = true;
        this.projectile = new Projectile();
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('boss'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = stage.canvas.width - this.image.image.width;
        this.image.y = 395;
        stage.addChild(this.image);
    }
    
    //called when the boss takes damage, when hit by player's laser. reduces boss health
    this.takeDamage = function()
    {
        createjs.Sound.play("yeah");
        if(this.lives === 0)
        {            
            game_state = GAME_WON;
            createjs.Sound.play("win");
            showGameWon();
        }
        else
            this.lives--;

        text_manager.updateBossText();        
    }    
    
    //called every frame once the boss is on the stage. determines when the boss is to fire
    //and when to update the boss' bullets
    this.update = function(event)
    {
        var delta = event.delta / 1000;
        this.timer += delta;
        
        if(this.timer >= this.shoot_cooldown)
        {
            this.shoot();
            this.timer = 0;
            this.shoot_cooldown = Math.random() * 4 + 2;
        }

        if(this.projectile.active)
            this.projectile.update(event);
    }
    
    //reset the boss' attributes
    this.reset = function()
    {        
        this.lives = 3;
        this.active = false;
        this.image.x = stage.canvas.width + this.image.image.width;        
    }
    
    //removes the boss from the stage
    this.selfDestruct = function()
    {        
        stage.removeChild(this.image);
    }
    
    //resets the boss' bullet when it leaves screen or hits player
    this.resetProjectile = function()
    {
        this.projectile = new Projectile();
    }    
    
    //fires a projectile/bullet towards the player
    this.shoot = function()
    {        
        this.projectile.init(this.image.x, this.image.y);
        if(this.facing_right)
            this.projectile.flip();                
    }
}