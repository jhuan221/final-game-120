
class Vomiting extends Phaser.Scene {
    constructor() {
        super('s_vomiting');
    }

    preload() {
        this.load.image('background', './assets/Vomit/Pipe_Background.png');
        this.load.spritesheet({
            key: 'pipe-sheet', 
            url: './assets/Vomit/V_Pipe-Sheet.png',
            frameConfig: {
                frameWidth: 1280,
                frameHeight: 800
            }
        });
    }

    create() {
        // SCENE SETUP
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0,0);

        // CONTROLS
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // GAME VARIABLES
        this.counter = 0;
        this.frame = 9;

        // MAIN SPRITE
        this.vpipe = this.add.sprite(game.config.width/2, game.config.height/2, 'pipe-sheet', this.frame).setScale(0.9, 0.9);
    }
       

    update() {
        this.counter = Phaser.Input.Keyboard.JustDown(keySp) ? this.counter + 1 : this.counter;
        switch (this.counter == 5) {
            case true: 
                this.frame -= 1;
                this.counter = 0;
        }
        this.vpipe.setFrame(this.frame, false, false);
    }
}