// GAME SETTINGS

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [
        Menu,
        S_Overview,
        S_Minigame
        
    ]
}

let game = new Phaser.Game(config);

let keySp, keyEnter;


