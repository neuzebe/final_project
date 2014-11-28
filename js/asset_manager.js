   var queue;
   
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    //queue.addEventListener("complete", init);
    queue.loadManifest([        
        { id: "background", src: "images/background.png"},
        { id: "ground", src: "images/ground.png"},
        { id: "cloud", src: "images/cloud.png"},
        { id: "character", src: "images/character.png"},
        { id: "character_jump", src: "images/character_jump.png"},
        { id: "coin", src: "images/coin.png"},
        { id: "help_button", src: "images/help.png"},
        { id: "life", src: "images/life.png"},
        { id: "play_button", src: "images/play_button.png"},
        { id: "bullet", src: "images/bullet.png"},
        { id: "damage", src: "sounds/damage.ogg"},
        { id: "mushroom", src: "sounds/powerup.ogg"},
        { id: "yahoo", src: "sounds/yahoo.ogg"},
        { id: "gameover", src: "sounds/gameover.ogg"},
        { id: "tree", src: "images/tree.png"}
    ]);