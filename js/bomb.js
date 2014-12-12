/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: bomb.js
 * Last Modified By: Noel Euzebe on Dec 07, 2014
 * Description: Bomb class, enemy object dropped towards player by Balloon
 */
function Bomb()
{
    this.image;
    this.speed = 50;
    this.active = false;
    
    //initialises default attributes for the bomb
    this.init = function(x, y)
    {
        this.active = true;
        this.image = new createjs.Bitmap(asset_manager.queue.getResult('bomb'));
        this.image.regX = this.image.image.width / 2;
        this.image.regY = this.image.image.height / 2;
        this.image.x = x;
        this.image.y = y;

    }
    
    //called every frame once bomb on stage. updates bomb position
    this.update = function(event)
    {
        var delta = event.delta / 1000;

        this.image.y += delta * this.speed * 3;

        if(this.image.x + this.image.image.width < 0)
            this.reset();     
        
        if(this.image.y > stage.canvas.height)
            this.selfDestruct();
    }
    
    //resets the bomb's position and randomises its speed
    this.reset = function()
    {
        this.speed = Math.random() * 30 + 60;
        this.image.x = stage.canvas.width + this.image.image.width;        
    }
    
    //clears the variable and removes bomb from the stage
    this.selfDestruct = function()
    {
        this.active = false;
        stage.removeChild(this.image);
    }
}