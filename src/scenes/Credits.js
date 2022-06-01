
class Credits extends Phaser.Scene {
    constructor() {
        super('s_credits');
    }
    
    preload(){
        this.load.image('credits', './assets/credits.png');
    }
    create(){
        this.add.sprite(game.config.width/2, game.config.height/2, 'credits').setOrigin(0.5);
        keyLt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLt)){
            this.scene.start('s_menu');
        }
    }
  
}