// GAME SETTINGS

let config = {
    type: Phaser.WEBGL,
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
        Menu,
        World
    ]
}

let game = new Phaser.Game(config);

// init key for menu

let keySp;