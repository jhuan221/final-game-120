// GAME SETTINGS

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    scene: [
        
    ]
}

let game = new Phaser.Game(config);

let keyUp, keyDn, keyLt, keyRt; // reserve movement keys