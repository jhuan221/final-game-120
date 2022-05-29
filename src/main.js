// GAME SETTINGS

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [
        //Baby_Sleeping
        //Baby_Eating
        //Baby_Cry
        // Menu,
        // S_Overview,
        // Baby_DrinkWater
        Game_Over
        
    ]
}

let game = new Phaser.Game(config);

let keySp, keyEnter;


