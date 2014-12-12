/*
 * Author: Noel Euzebe | 300709334
 * COMP 397
 * Final Project: The Dark Knight's Patrols
 * File: game.js
 * Last Modified By: Noel Euzebe On Dec 10, 2014
 * Description: main controller of the game, sets up all major objects, the stage and the state handler
 */
var stage;
var queue;

var KEYCODE_SPACE = 32;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_F = 70;

var EASY_MODE = 1;
var MEDIUM_MODE = 2;
var HARD_MODE = 3;
var game_difficulty = EASY_MODE;
/* POST-REFACTOR VARS */

var MENU = 1;
var PLAYING = 2;
var GAME_OVER = 3;
var GAME_WON = 4;
var game_state = MENU;

var cloud_count = 3;
var tree_count = 2;
var clouds = [];
var trees = [];

var character = new Player();
var coin = new Coin();
var bullet = new Bullet();
var balloon = new Balloon();
var boss = new Boss();
var clouds = [];
var text_manager = new TextManager();
var stage_speed = 40;

var asset_manager = new AssetManager();
var collision_manager = new CollisionManager();


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
            if(game_difficulty === MEDIUM_MODE || game_difficulty === HARD_MODE)
            {
                balloon.update(event);
            }
            
            if(game_difficulty === HARD_MODE)
            {                
                if(character.score >= 3000 && !boss.active)  
                {
                    boss.init();
                    text_manager.addBossLife();
                }
                
                if(boss.active)
                    boss.update(event);
            }
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
                                    
    text_manager.init();
    text_manager.showMenu();       
    
    this.document.onkeydown = onKeyDown;
    this.document.onkeyup = onKeyUp;
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
 * used to listen for and process player input
 */

function onKeyDown(event) {        
    character.onKeyDown(event);
    stage.update();
}

function onKeyUp(event) {    
    character.onKeyUp(event);
    stage.update();
}

    /*
    * showGameOver()
    * called when the player's lives run out
    * shows the game over text, removes objects from stage
    */
function showGameOver()
{   
    stage.removeChild(character.image);
    stage.removeChild(coin.image);
    stage.removeChild(bullet.image);
    if(game_difficulty === MEDIUM_MODE || game_difficulty === HARD_MODE)
    {
        stage.removeChild(balloon.image);
        stage.removeChild(balloon.bomb.image);
    }
    if(game_difficulty === HARD_MODE)
    {        
        
        stage.removeChild(text_manager.boss_life); 
        stage.removeChild(text_manager.boss_text);          
        stage.removeChild(boss.image);
    }    
    text_manager.showGameOver();
}

/*
 * showGameWon
 * called when the player has won the game
 * Shows victory text and disables gameplay
 */
function showGameWon()
{
    var victory = new createjs.Bitmap(asset_manager.queue.getResult('victory'));
    victory.regX = victory.image.width / 2;
    victory.regY = victory.image.height / 2;
    victory.x = stage.canvas.width / 2;
    victory.y = stage.canvas.height / 2;
    stage.addChild(victory); 
}

/*
 * playGame
 * called when the play button is called
 * removes menu/game over text, updates the game state
 * resets the score and life display, and resets the bullet and pokeball
 */

function playGame(difficulty)
{
    text_manager.removeMenuItems();
            
    game_state = PLAYING;
    game_difficulty = difficulty;
    
    bullet.init();
    stage.addChild(bullet.image); 
    
    character.init();
    stage.addChild(character.image); 
    
    coin.init();
    stage.addChild(coin.image);   
     
    if(game_difficulty === MEDIUM_MODE)
    {
        bullet.bullet_speed = 75;
        
        balloon.init();
        balloon.speed = 40;
                
        stage.addChild(balloon.image);
    }
    else if(game_difficulty === HARD_MODE)
    {        
        balloon.init();
        balloon.speed = 60;
        boss = new Boss();        
        stage.addChild(balloon.image);
    }
    
    
    bullet.reset();
    coin.reset();
    character.reset();    
    
    text_manager.updateText();
    
    for(var i = 0; i < cloud_count; i++)
        stage.addChild(clouds[i].image);
}
