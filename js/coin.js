/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: coin.js
 * Last Modified By: Noel Euzebe On Dec 3, 2014
 * Description: defines the item used to increase player score
 */
function Coin()
{
    this.image;
    this.coin_speed = 35;
    
    //initialises default attributes and position and sets the image for the coin
    this.init = function()
    {        
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('coin'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;        
        this.image.x = 60;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.85) - (background.ground.image.height * 0.95) - character.image.image.height;                                
    }
    
    //called every frame to update the coin position
    this.update = function(event)
    {
        var delta = event.delta / 1000;

        this.image.x -= delta * this.coin_speed * 3;

        if(this.image.x + this.image.image.width < 0)
            this.reset();        
    }
    
    //called to reset the coin's position when it leaves screen or is captured by the player
    this.reset = function()
    {
        this.image.x = stage.canvas.width + this.image.image.width;
        this.coin_speed = Math.random() * 25 + 45;          
    }
}