
class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create(){
        this.add.text(game.config.width/2, game.config.height/2, "the premise of the game is to play mini games to address your body's daily maintence")
        .setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5, "click on task to work on them\npress enter to start")
        .setOrigin(0.5);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyEnter)){
            this.scene.start('s_overview');
        }
    }

  
}