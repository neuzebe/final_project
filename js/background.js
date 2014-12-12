/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: background.js
 * Last Modified By: Noel Euzebe On Dec 3, 2014
 * desciption: defines the background and ground seen on the stage
 */
function Background()
{
    this.backdrop;
    this.ground;
    
    //sets up initial values and positions, and images
    this.init = function()
    {
        this.backdrop = new createjs.Bitmap(asset_manager.queue.getResult('background'));
        this.backdrop.regX = this.backdrop.image.width / 2;
        this.backdrop.regY = this.backdrop.image.height / 2;
        this.backdrop.x = stage.canvas.width / 2;
        this.backdrop.y = stage.canvas.height / 2;  
        
        this.ground = new createjs.Bitmap(asset_manager.queue.getResult('ground'));
        this.ground.regX = this.ground.image.width / 2;
        this.ground.regY = this.ground.image.height / 2;
        this.ground.x = stage.canvas.width / 2;
        this.ground.y = stage.canvas.height - (this.ground.image.height * 0.5);         
    }
    
    //called every frame to update positions of the background
    this.update = function(event)
    {
        var delta = event.delta / 1000;
        this.ground.x -= delta * stage_speed;

        if ( (this.ground.x) < 0)
            this.reset();        
    }
    
    //resets the position of the ground once it has scrolled a certain distance
    this.reset = function()
    {
        this.ground.x = stage.canvas.width / 2; 
    }
}