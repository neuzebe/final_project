function TextManager()
{
    
    this.play_btn;
    this.menu_text;
    this.title_text;
    this.life_image;
    this.game_over_text;
    this.lives_text;
    this.score_text;
    
    this.init = function()
    {
        this.life_image = new createjs.Bitmap(queue.getResult('life'));
        this.life_image.regX = this.life_image.image.width / 2;
        this.life_image.regY = this.life_image.image.height / 2;
        this.life_image.x = stage.canvas.width - 150;
        this.life_image.y = stage.canvas.height - 25;          
        stage.addChild(this.life_image); 
    
        this.score_text = new createjs.Text("Score: " + character.score, "bold 24px Arial", "#000000");
        this.score_text.x = 30;
        this.score_text.y = stage.canvas.height - 35;     
        stage.addChild(this.score_text);

        this.lives_text = new createjs.Text("x" + character.lives, "bold 24px Arial", "#000000");
        this.lives_text.x = stage.canvas.width - 130;
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
        this.play_btn = new createjs.Bitmap(queue.getResult('play_button'));
        this.play_btn.regX = this.play_btn.image.width / 2;
        this.play_btn.regY = this.play_btn.image.height / 2;
        this.play_btn.x = stage.canvas.width / 2;
        this.play_btn.y = stage.canvas.height / 2 ; 
        stage.addChild(this.play_btn);    

        this.play_btn.on('rollover', function(){this.alpha = 0.5;});
        this.play_btn.on('rollout', function(){this.alpha = 1;});
        this.play_btn.on('click', function(){ playGame();});

        this.menu_text = new createjs.Text("Press SPACE to jump!\nGet points by capturing the Pokeballs \nbut make sure to dodge the bullets.", "bold 24px Arial", "#ffffff");
        this.menu_text.x = 50;
        this.menu_text.y =  105;     
        stage.addChild(this.menu_text);   

        this.title_text = new createjs.Text("The Dark Knight's Gotta Catch Em All", "bold 24px Arial", "#ffff00");
        this.title_text.x = 50;
        this.title_text.y =  30;     
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
        stage.addChild(this.play_btn);
        stage.addChild(this.game_over_text);        
    }
    
    this.removeMenuItems = function()
    {
        stage.removeChild(this.play_btn);
        stage.removeChild(this.menu_text);
        stage.removeChild(this.game_over_text);
        stage.removeChild(this.title_text);        
    }
}