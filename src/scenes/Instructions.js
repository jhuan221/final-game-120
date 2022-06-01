
class Instructions extends Phaser.Scene {
    constructor() {
        super('s_instructions');
    }
    
    preload(){
        // loading sprites for instructions pages
        this.load.image('one', './assets/instructions/instruct1.png');
        this.load.image('two', './assets/instructions/instruct2.png');
        this.load.spritesheet('health','./assets/Health_Bar_Sheet.png',{frameWidth: 399,
            frameHeight: 29, startFrame: 0, endFrame: 17} );
    }
    create(){
        this.first_in = this.add.sprite(game.config.width/2, game.config.height/2, 'one').setOrigin(0.5);
        this.second_in = this.add.sprite(game.config.width/2, game.config.height/2, 'two').setOrigin(0.5);
        this.second_in.visible = false;
        this.start = this.add.sprite(game.config.width/2, game.config.height/2.5, 'down');
        this.start.visible = false;
        // key bind for player to flip through instructions and start game
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // anim config 
        this.anims.create({
            key: 'down', 
            frames: this.anims.generateFrameNumbers('health', { start: 0, end: 17, first: 0}),
            frameRate: 10
            });

    }
    
    update(){
        if (Phaser.Input.Keyboard.JustDown(keySp)){
            this.scene.start('s_overview');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRt)){
            this.first_in.visible = false;
            this.second_in.visible = true;
            this.start.visible = true;
            //let start = this.add.sprite(game.config.width/2, game.config.height/2.5, 'down');
            this.start.anims.play('down');
        }
        if (Phaser.Input.Keyboard.JustDown(keyLt)){
            this.start.visible = false;
            this.second_in.visible = false;
            this.first_in.visible = true;

        }
    }
  
}