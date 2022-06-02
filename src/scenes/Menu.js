
class Menu extends Phaser.Scene {
    constructor() {
        super('s_menu');
    }
    
    preload(){
        this.load.image('menu', './assets/menu.png');
    }
    create(){
        this.add.sprite(game.config.width/2, game.config.height/2, 'menu').setOrigin(0.5);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keySp)){
            this.scene.start('s_instructions');
        }
        if (Phaser.Input.Keyboard.JustDown(keyLt)){
            this.scene.start('s_credits');
        }
        if (Phaser.Input.Keyboard.JustDown(keyG)) {
            console.log('grader activated');
            game.config.GRADER = true;
        }
    }
  
}