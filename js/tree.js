/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: tree.js
 * Last Modified By: Noel Euzebe On Dec 3, 2014
 * Description: defines the trees that appear in the background of the stage
 */
function Tree()
{
    this.image;
    
    //sets up initial values image and position
    this.init = function()
    {
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('tree'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.y = stage.canvas.height - (this.image.image.height * 0.5) - (background.ground.image.height * 0.95);
        this.image.x = (Math.random() * (stage.canvas.width)) + 1;            
    }
    
    //updates tree position on screen
    this.update = function(event)
    {
        var delta = event.delta / 1000;
        this.image.x -= delta * stage_speed;        
        if(this.image.x + this.image.image.width < 0)
            this.reset();             
    }
    
    //resets tree position when it leaves the screen
    this.reset = function()
    {
       this.image.x = stage.canvas.width + this.image.image.width;
    }
}