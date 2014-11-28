/* Version 1.0
 * Bootstrapped from SlotMachine code
 * Version 1.1
 * Added assets on screen
 * Version 1.2
 * Got on-screen assets moving and resetting
 * Version 1.3
 * Added player input, character jumps in response to input
 * Version 1.4
 * Added collision detection
 * Version 1.5
 * Added scoring and lives
 * Version 1.5
 * Added menu, playing and gameover state
 * Version 1.6
 * Refactored, cleaned up
 * Noel Euzebe 300709334
 * Last Modified By: Noel Euzebe
 * Date Last Modified: 10th Nov 2014
 * ---------
 * game.js
 .
 */
var stage;
var queue;
/*

var bullet_speed = 50;
var coin_speed = 35;




var background;
var ground;
var character;
var coin;
var bullet;
var life;



var play_btn;
var help_btn;

var is_player_jumping = false;
var is_player_falling = false;
var jump_time = 0.75;
var jump_counter = 0;
var jump_speed = 135;
var fall_speed = 135;

var score = 0;
var score_text;
var lives = 3;
var lives_text;

var menu_text;
var game_over_text;
var title_text;
*/
var KEYCODE_SPACE = 32;

/* POST-REFACTOR WORK */

var MENU = 1;
var PLAYING = 2;
var GAME_OVER = 3;
var game_state = MENU;

var cloud_count = 3;
var tree_count = 2;
var clouds = [];
var trees = [];

var character = new Player();
var coin = new Coin();
var bullet = new Bullet();
var clouds = [];
var text_manager = new TextManager();

var stage_speed = 40;
/*
 * preload()
 * preloads all game assets
 */
function preload() {
    //hook back up to assets
    setTimeout(function(){init();}, 2000);
}

/*
 * init()
 * sets up the stage and calls other initial functions
 */
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);    
    gameStart();    
}


/*handleTick
 * 
 * @param {type} event
 * @returns {undefined}
 * called every frame, used to update the stage
 */
function handleTick(event) {
    
    switch(game_state)
    {
        case MENU:            
            break;
        case PLAYING:   
            updateBackground(event);            
            coin.update(event);
            bullet.update(event);
            character.update(event);            
            break;
        case GAME_OVER:           
            break;
    }

    stage.update();
}

/*
 * gameStart()
 * sets up the User interface, places the background inmages as well as buttons
 * responsible for creating event handlers
 */
function gameStart() {
    // Add code here
    // Some example code here - to be replaced
    background = new Background();
    background.init();
               
    stage.addChild(background.backdrop);
    stage.addChild(background.ground);  
                       
    for(var i = 0; i < cloud_count; i++)
    {
        clouds[i] = new Cloud();
        clouds[i].init();                 
    }
    
    for(var i = 0; i < tree_count; i++)
    {
        trees[i] = new Tree();
        trees[i].init();                
        stage.addChild(trees[i].image);         
    }    
    
    character.init();                 
    stage.addChild(character.image); 
    
    coin.init();
    stage.addChild(coin.image);               
        
    bullet.init();
    stage.addChild(bullet.image);    
            
    text_manager.init();
    text_manager.showMenu();       
    this.document.onkeydown = keyPressed;
}

/*
 * updateBackground
 * used to update the ground every frame, resets it once
 * it moves more than halfway across the screen
 * calls updateTrees and updateCloud
 */
function updateBackground(event)
{    
    background.update(event)
    
    for(var i = 0; i < tree_count; i++)
        trees[i].update(event);
            
    for(var i = 0; i < cloud_count; i++)
        clouds[i].update(event);    
}


/*
 * event listener for key events
 * used to listen for and process the spacebar being pressed
 */
function keyPressed(event) {
    switch(event.keyCode) {
        case KEYCODE_SPACE:	            
                character.jump();
            break;
    }
    stage.update();
}


function showGameOver()
{   
    text_manager.showGameOver();
}

/*
 * playGame
 * called when the play button is called
 * removes menu/game over text, updates the game state
 * resets the score and life display, and resets the bullet and pokeball
 */

function playGame()
{
    text_manager.removeMenuItems();

    
    
    bullet.reset();
    coin.reset();
    character.reset();
    text_manager.updateText();
    game_state = PLAYING;
    
    for(var i = 0; i < cloud_count; i++)
        stage.addChild(clouds[i].image);
}
