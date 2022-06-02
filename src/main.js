// GAME SETTINGS

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [
        Menu,
        Credits,
        Instructions,
        Overview,
        Game_Over,
        Medicine,
        DrinkWater,
        Sickness,
        Relax,
        Vomiting,
        Eating,
        Sleeping, 
        Final
    ],
}

let game = new Phaser.Game(config);

game.config.HEALTH = 0;
game.config.GRADER = false;

let keyG, keyLt, keyRt, keyUp, keyDn, keySp, keyEnter, keyM, keyR;


