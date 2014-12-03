function Player()
{
    this.image;
    this.is_player_jumping = false;
    this.is_player_falling = false;
    this.jump_counter = 0;
    this.jump_time = 0.74;
    this.jump_speed = 135;
    this.fall_speed = 135;
    this.lives = 3;
    this.score = 0;
    this.facing_right = true;
    this.move_speed = 50;
    this.turn_left = false;    
    this.turn_right = false;
    
    this.init = function()
    {
        this.image = new createjs.Bitmap(queue.getResult('character'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = 60;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95);           
    }    
    
    this.update = function(event)
    {        
        var delta = event.delta / 1000;
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
        else if(this.is_player_falling)
        {
            this.jump_counter += delta;
            if(this.jump_counter >= this.jump_time)
            {
                this.is_player_falling = false;
                this.jump_counter = 0;
                this.image.image = queue.getResult('character');
            }
            else
            {
                this.image.y += delta * this.fall_speed;
            }
        }     
        
        this.updateSpeed();
        
        if(Math.abs(this.move_speed) > 0)
            this.image.x += delta * this.move_speed;
        
        this.checkPlayerBulletCollision();
        this.checkPlayerCoinCollision();
    }
    this.jump = function()
    {
        if(!this.is_player_jumping && !this.is_player_falling)
        {        
            this.is_player_jumping = true;
            this.jump_counter = 0;        
            this.image.image = queue.getResult('character_jump');
        }        
    }


    this.updateSpeed = function()
    {
        if(this.moving_right)
            this.move_speed = -200;
        else if(this.moving_left)
            this.move_speed = 200;
        else if(!this.moving_left && !this.moving_right)
            this.move_speed = 0;
    }

    this.reset = function()
    {
        this.score = 0;
        this.lives = 3;
        this.move_speed = 0;
        this.image.x = 60;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95); 
    }
    /*
     * checkCollision(object_one, object_two)
     * utility function to determine whether two on-stage objects
     * are colliding
     */
    this.checkCollision = function(object)
    {
        var p1 = new createjs.Point();
        var p2 = new createjs.Point();
        p1.x = this.image.x;
        p1.y = this.image.y;
        p2.x = object.image.x;
        p2.y = object.image.y;

        return (this.distanceBetween(p1, p2) < ((this.image.image.height/2) + (object.image.image.height/2)));        
    }
    
    /*
    * distanceBetween(point1, point2)
    * utility function to calculate the distance between two objects
    * on the stage
    */
    this.distanceBetween = function(p1, p2)
    {
        var result = 0;
        var xPoints = 0;
        var yPoints = 0;

        xPoints = p2.x - p1.x;
        xPoints = xPoints * xPoints;

        yPoints = p2.y - p1.y;
        yPoints = yPoints * yPoints;

        result = Math.sqrt(xPoints + yPoints);

        return result;    
    }    
    
    /*
     * checkPlayerBulletCollision
     * checks to see if the player has collided with the bullet
     * deducts life and plays apt sound effect in such an event
     */
    this.checkPlayerBulletCollision = function()
    {
        if(this.checkCollision(bullet))
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
            bullet.reset();
        }
    }    

    /*
     * checks to see if the player has collected a pokeball
     * and handles the score increase and sound effects if so
     */
    this.checkPlayerCoinCollision = function()
    {
        if(this.checkCollision(coin))
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
    
    this.onKeyDown = function(event)
    {        
        switch(event.keyCode) {
            case KEYCODE_SPACE:	            
                this.jump();
                break;
            case KEYCODE_A:
                if(this.facing_right)
                    this.flip();     
                this.moving_right = true;
                break;
            case KEYCODE_D:
                if(!this.facing_right)
                    this.flip();  
                this.moving_left = true;
                break;            
        }
    }
    
    
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
    
    this.flip = function()
    {
        this.facing_right = !this.facing_right;
        this.image.scaleX *= -1;
    }
    
}
