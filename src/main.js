// GAME SETTINGS

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    scene: [
        Menu,
        World
    ]
}

let game = new Phaser.Game(config);

// init key for menu

let keySp;
