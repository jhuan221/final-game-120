
class Final extends Phaser.Scene {
    constructor() {
        super('s_final');
    }

    preload() {
        // INSTRUCTIONS
        this.load.image('instructionBG', './assets/Final/Final_Instructions.png');
        this.load.spritesheet({
            key: 'final-sheet',
            url: './assets/Final/Final_Sheet_New.png',
            frameConfig: {
                frameWidth: 1280,
                frameHeight: 720
            }
        });
    }

    create() {
        // ANIMATIONS
        this.anims.create({
            key: 'eyes-anim',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('final-sheet', { start: 0, end: 28 }),
            repeat: 0
        });
        this.eyesAnim = this.add.sprite(game.config.width/2, game.config.height/2, 'final-sheet', 0).setScale(0, 0.5);
        this.eyesAnim.play('eyes-anim');

        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'instructionBG')
            .setOrigin(0.5, 0.5);

        this.instructions = [
            this.instructionBG
        ];
        
        this.instructions.forEach((elem) => {
            elem.visible = false;
            elem.alpha = 0.0;
        });

        this.hideInstructionsConfig = {
            callback: () => {
                this.instructions.forEach((elem) => {
                    elem.alpha -= 0.1;
                });
            },
            callbackScope: this,
            delay: 2000,
            loop: false
        }

        this.displayInstructionsConfig = {
            callback: () => {
                this.instructions.forEach((elem) => {
                    elem.visible = true;
                    elem.alpha += 0.1;
                    this.hideInstructions = this.time.addEvent(this.hideInstructionsConfig);
                });
            },
            callbackScope: this,
            delay: 50,
            loop: false,
            repeat: 8
        }

        this.displayInstructions = this.time.addEvent(this.displayInstructionsConfig);
    }
}