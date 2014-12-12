/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: cloud.js
 * Last Modified By: Noel Euzebe On Dec 3, 2014
 * Description: describes the background clouds in the stage
 */
function Cloud()
{
    this.image;
    
    //initialises default position and attributes and image for the cloud
    this.init = function()
    {
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('cloud'));        
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.y = (Math.random() * (stage.canvas.height / 2));
        this.image.x = (Math.random() * (stage.canvas.width)) + 1;        
    }
    
    //called every frame to update the cloud's position
    this.update = function(event)
    {
        var delta = event.delta / 1000;

        this.image.x -= delta * stage_speed;
        if(this.image.x + this.image.image.width < 0)
            this.reset();               
    }
    
    //resets the cloud position once it has left the screen
    this.reset = function()
    {
        this.image.x = stage.canvas.width + this.image.image.width;
        this.image.y = (Math.random() * (stage.canvas.height / 2)) ;        
    }
}