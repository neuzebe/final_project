/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: player.js
 * Last Modified By: Noel Euzebe On Dec 9, 2014
 * Description: Describes the Player
 */
function Player()
{
    this.image;
    this.laser;
    this.is_player_jumping = false;
    this.is_player_falling = false;
    this.jump_counter = 0;
    this.jump_time = 0.74;
    this.jump_speed = 135;
    this.fall_speed = 200;
    this.fall_time = 0.4995;
    this.lives = 3;
    this.score = 0;
    this.facing_right = true;
    this.move_speed = 50;
    this.turn_left = false;    
    this.turn_right = false;
    this.timer = 3;
    this.shoot_cooldown = 2;    
    
    //sets up initial values and position as well as player's image
    this.init = function()
    {
        this.laser = new Laser();
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('character'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = 60;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95);           
    }    
    
    //called every frame to update player position, determine if player is jumping
    //or falling, checks for collisions and updates whether player can shoot
    this.update = function(event)
    {        
        var delta = event.delta / 1000;
        this.timer += delta;
        
        //check if player within bounds, if not force him back in
        if(this.image.x <this.image.image.width)
            this.image.x = this.image.image.width;
        else if(this.image.x > stage.canvas.width - this.image.image.width)
            this.image.x = stage.canvas.width - this.image.image.width;
               
        if(this.image.y > stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95))       
            this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95);           
        
        if(this.image.y < stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95) && !this.is_player_jumping && !this.is_player_falling)   
            this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95);           
        
        //handle player jumping by increasing height
        if(this.is_player_jumping)
        {
            this.jump_counter += delta;
            if(this.jump_counter >= this.jump_time)
            {            
                this.jump_counter = 0;
                this.is_player_jumping = false;
                this.is_player_falling = true;                                             
            }
            else
            {
                this.image.y -= delta * this.jump_speed;
            }
        }    
        else if(this.is_player_falling) //handle player falling by decreasing height and switching image
        {
            this.jump_counter += delta;
            if(this.jump_counter >= this.fall_time)
            {
                this.is_player_falling = false;
                this.jump_counter = 0;
                this.image.image = asset_manager.queue.getResult('character');
            }
            else
            {
                this.image.y += delta * this.fall_speed;
            }
        }     
        
        this.updateSpeed();
        
        if(Math.abs(this.move_speed) > 0)
            this.image.x += delta * this.move_speed;
        
        //updates the player's laser if it is active
        if(this.laser.active)        
            this.laser.update(event);
        
        //handle collision checks
        this.checkPlayerBulletCollision();
        this.checkPlayerCoinCollision();
        
        if(game_difficulty === MEDIUM_MODE || game_difficulty === HARD_MODE)
            this.checkPlayerBombCollision();
    }
    
    //called when the player is about to jump, changes character image and sets 
    //player status to jumping
    this.jump = function()
    {
        if(!this.is_player_jumping && !this.is_player_falling)
        {        
            this.is_player_jumping = true;
            this.jump_counter = 0;        
            this.image.image = asset_manager.queue.getResult('character_jump');
        }        
    }

    //based on player input, determines how to set player speed
    this.updateSpeed = function()
    {
        if(this.moving_right)
            this.move_speed = -200;
        else if(this.moving_left)
            this.move_speed = 200;
        else if(!this.moving_left && !this.moving_right)
            this.move_speed = 0;
    }

    //resets player position, speed, lives and score
    this.reset = function()
    {
        this.score = 0;
        this.lives = 3;
        this.move_speed = 0;
        this.image.x = 60;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95); 
    }
    
    //reinstantiates player laser when it leaves screen or collides with an enemy
    this.resetLaser = function()
    {
        this.laser = new Laser();
    }
    
    
    /*
     * checkPlayerBulletCollision
     * checks to see if the player has collided with the bullet
     * deducts life and plays apt sound effect in such an event
     */
    this.checkPlayerBulletCollision = function()
    {
        if(collision_manager.checkCollision(this, bullet))
        {           
            this.takeDamage();
            bullet.reset();
        }
    }         
    
    //called when an enemy has done damage to the player, reduces player health/life
    this.takeDamage = function()
    {
        createjs.Sound.play("damage");
        if(this.lives === 0)
        {            
            game_state = GAME_OVER;
            createjs.Sound.play("gameover");
            showGameOver();
        }
        else
            this.lives--;

        text_manager.updateText();        
    }

    /*
     * checks to see if the player has collected a pokeball
     * and handles the score increase and sound effects if so
     */
    this.checkPlayerCoinCollision = function()
    {
        if(collision_manager.checkCollision(this, coin))
        {                
            createjs.Sound.play("yahoo");        

            this.score += 50;
            if(this.score % 500 === 0)
            {
                 createjs.Sound.play("mushroom");
                this.lives++;
            }

            text_manager.updateText();
            coin.reset();
        }
    }
    
    /*
     * checks to see if the player has collected a bomb
     * and handles the life decrease and sound effects if so
     */    
    this.checkPlayerBombCollision = function()
    {
        if(!balloon.bomb.active)
            return;
        
        if(collision_manager.checkCollision(this, balloon.bomb))
        {
            this.takeDamage();            
            balloon.bomb.selfDestruct();
            balloon.bomb = new Bomb();
        }
    }
    
    //process player input
    this.onKeyDown = function(event)
    {        
        switch(event.keyCode) {
            case KEYCODE_SPACE:	            
                this.jump();
                break;
            case KEYCODE_A:
                if(game_difficulty === HARD_MODE || game_difficulty === MEDIUM_MODE) //only allow movement if difficulty is medium or higher
                {
                    if(this.facing_right)
                        this.flip();     
                    this.moving_right = true;
                }
                break;
            case KEYCODE_D:
                if(game_difficulty === HARD_MODE || game_difficulty === MEDIUM_MODE)//only allow movement if difficulty is medium or higher
                {
                    if(!this.facing_right)
                        this.flip();  
                    this.moving_left = true;
                    break;                    
                }
            case KEYCODE_F:
                if(this.timer >= this.shoot_cooldown && game_difficulty === HARD_MODE) //only allow laser fire if difficulty is hard
                {
                    this.shoot();
                    this.timer = 0;
                } 
            break;
        }
    }
        
    //updates when A or D keys are released so player's movement is halted
    this.onKeyUp = function(event)
    {        
        switch(event.keyCode) {
            case KEYCODE_A:     
                this.moving_right = false;
                break;
            case KEYCODE_D:  
                this.moving_left = false;
                break;            
        }
    }    
    
    //flips player sprite if he or she is facing the wrong direction
    this.flip = function()
    {
        this.facing_right = !this.facing_right;
        this.image.scaleX *= -1;
    }
    
    //fires a laser
    this.shoot = function()
    {
        this.laser.init(this.image.x, this.image.y);
        if(!this.facing_right)
            this.laser.flip();                        
    }
}
