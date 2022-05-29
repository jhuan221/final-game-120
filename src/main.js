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
        S_Eating,
        S_Sleeping    
    ]
}

let game = new Phaser.Game(config);

let keySp, keyEnter;


