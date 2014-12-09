function AssetManager()
{              
    this.queue = new createjs.LoadQueue();
    this.queue.installPlugin(createjs.Sound);
    this.queue.addEventListener("complete", init);
    this.queue.loadManifest([        
        { id: "background", src: "images/background.png"},
        { id: "ground", src: "images/ground.png"},
        { id: "cloud", src: "images/cloud.png"},
        { id: "character", src: "images/character.png"},
        { id: "character_jump", src: "images/character_jump.png"},
        { id: "coin", src: "images/coin.png"},
        { id: "help_button", src: "images/help.png"},
        { id: "life", src: "images/life.png"},
        { id: "play_button", src: "images/play_button.png"},
        { id: "easy", src: "images/easy.png"},
        { id: "medium", src: "images/medium.png"},
        { id: "hard", src: "images/hard.png"},
        { id: "balloon", src: "images/balloon.png"},
        { id: "bullet", src: "images/bullet.png"},
        { id: "bomb", src: "images/bomb.png"},
        { id: "boss", src: "images/boss.png"},
        { id: "boss_life", src: "images/boss_life.png"},
        { id: "victory", src: "images/victory.png"},
        { id: "laser", src: "images/laser.png"},
        { id: "damage", src: "sounds/damage.ogg"},
        { id: "mushroom", src: "sounds/powerup.ogg"},
        { id: "yahoo", src: "sounds/yahoo.ogg"},
        { id: "gameover", src: "sounds/gameover.ogg"},
        { id: "win", src: "sounds/win.ogg"},
        { id: "yeah", src: "sounds/yeah.ogg"},
        { id: "laser_shot", src: "sounds/laser.ogg"},
        { id: "tree", src: "images/tree.png"}
    ]);
}