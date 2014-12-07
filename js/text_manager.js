function TextManager()
{
    
    this.easy;
    this.menu_text;
    this.title_text;
    this.life_image;
    this.game_over_text;
    this.lives_text;
    this.score_text;
    
    this.init = function()
    {
        this.life_image = new createjs.Bitmap(asset_manager.queue.getResult('life'));
        this.life_image.regX = this.life_image.image.width / 2;
        this.life_image.regY = this.life_image.image.height / 2;
        this.life_image.x = 250;
        this.life_image.y = stage.canvas.height - 25;          
        stage.addChild(this.life_image); 
    
        this.score_text = new createjs.Text("Score: " + character.score, "bold 24px Arial", "#000000");
        this.score_text.x = 30;
        this.score_text.y = stage.canvas.height - 35;     
        stage.addChild(this.score_text);

        this.lives_text = new createjs.Text("x" + character.lives, "bold 24px Arial", "#000000");
        this.lives_text.x = 270;
        this.lives_text.y = stage.canvas.height - 35;     
        stage.addChild(this.lives_text);    

        this.game_over_text = new createjs.Text("GAME OVER!\n Your Score is " + character.score, "bold 24px Arial", "#ffffff");
        this.game_over_text.x = 50;
        this.game_over_text.y =  105;        
    }
    /*
 * updateText
 * utility function to refresh the text display on screen
 */

    this.updateText = function()
    {        
        this.score_text.text = "Score: " + character.score;
        this.lives_text.text = "x" + character.lives;
    }
    
    this.showMenu = function()
    {
        this.easy = new createjs.Bitmap(asset_manager.queue.getResult('easy'));
        this.easy.regX = this.easy.image.width / 2;
        this.easy.regY = this.easy.image.height / 2;
        this.easy.x = stage.canvas.width / 2;
        this.easy.y = stage.canvas.height / 2 - 30; 
        stage.addChild(this.easy);    
        
        
        this.medium = new createjs.Bitmap(asset_manager.queue.getResult('medium'));
        this.medium.regX = this.medium.image.width / 2;
        this.medium.regY = this.medium.image.height / 2;
        this.medium.x = stage.canvas.width / 2;
        this.medium.y = stage.canvas.height / 2 + 40; 
        stage.addChild(this.medium);
        
        this.hard = new createjs.Bitmap(asset_manager.queue.getResult('hard'));
        this.hard.regX = this.hard.image.width / 2;
        this.hard.regY = this.hard.image.height / 2;
        this.hard.x = stage.canvas.width / 2;
        this.hard.y = stage.canvas.height / 2 + 110; 
        stage.addChild(this.hard);        

        this.easy.on('rollover', function(){this.alpha = 0.5;});
        this.easy.on('rollout', function(){this.alpha = 1;});
        this.easy.on('click', function(){ playGame(EASY_MODE);});
        
        this.medium.on('rollover', function(){this.alpha = 0.5;});
        this.medium.on('rollout', function(){this.alpha = 1;});
        this.medium.on('click', function(){ playGame(MEDIUM_MODE);});
        
        this.hard.on('rollover', function(){this.alpha = 0.5;});
        this.hard.on('rollout', function(){this.alpha = 1;});
        this.hard.on('click', function(){ playGame(HARD_MODE);});        

        this.menu_text = new createjs.Text("Press SPACE to jump!\nGet points by capturing the Pokeballs \nbut make sure to dodge the bullets.", "bold 24px Arial", "#ffffff");
        this.menu_text.x = 50;
        this.menu_text.y =  60;     
        stage.addChild(this.menu_text);   

        this.title_text = new createjs.Text("The Dark Knight's Gotta Catch Em All", "bold 24px Arial", "#ffff00");
        this.title_text.x = 50;
        this.title_text.y =  20;     
        stage.addChild(this.title_text);        
    }
    
    /*
    * showGameOver()
    * called when the player's lives run out
    * shows the game over text
    */
    this.showGameOver = function()
    {
        for(var i = 0; i < cloud_count; i++)
            stage.removeChild(clouds[i].image);    

        this.game_over_text.text = "GAME OVER!\n Your Score is " + character.score;
        stage.addChild(this.easy);
        stage.addChild(this.medium);
        stage.addChild(this.hard);
        stage.addChild(this.game_over_text);        
    }
    
    this.removeMenuItems = function()
    {
        stage.removeChild(this.easy);
        stage.removeChild(this.medium);
        stage.removeChild(this.hard);
        stage.removeChild(this.menu_text);
        stage.removeChild(this.game_over_text);
        stage.removeChild(this.title_text);        
    }
}