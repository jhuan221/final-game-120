
class Final extends Phaser.Scene {
    constructor() {
        super('s_final');
    }

    preload() {
        // INSTRUCTIONS
        this.load.image('instructionBG', './assets/Final/Final_Instructions.png');
        this.load.image('end-screen', './assets/Ending/End_Screen.png');
        this.load.spritesheet({
            key: 'final-sheet1',
            url: './assets/Final/Final_Sheet_1.png',
            frameConfig: {
                frameWidth: 1279.625,
                frameHeight: 800
            }
        });
        this.load.spritesheet({
            key: 'final-sheet2',
            url: './assets/Final/Final_Sheet_2.png',
            frameConfig: {
                frameWidth: 1280,
                frameHeight: 800
            }
        });
        this.load.spritesheet({
            key: 'final-sheet3',
            url: './assets/Final/Final_Sheet_3.png',
            frameConfig: {
                frameWidth: 1279.9,
                frameHeight: 800
            }
        });
    }

    create(data) {
        this.time.addEvent({
            callback: () => {
                if (data.music.volume > 0) {
                    data.music.volume -= 0.01
                }
            },
            delay: 500,
            loop: true
        })

        // ANIMATIONS
        this.anims.create({
            key: 'eyes-anim1',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('final-sheet1', { start: 0, end: 7 }),
            repeat: 0
        });
        this.anims.create({
            key: 'eyes-anim2',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('final-sheet2', { start: 0, end: 9 }),
            repeat: 0
        });
        this.anims.create({
            key: 'eyes-anim3',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('final-sheet3', { start: 0, end: 10 }),
            repeat: 0
        });
        this.eyesAnim3 = this.add.sprite(game.config.width/2, game.config.height/2, 'final-sheet3', 0).setOrigin(0.5, 0.5);
        this.eyesAnim3.visible = false;
        this.eyesAnim2 = this.add.sprite(game.config.width/2, game.config.height/2, 'final-sheet2', 0).setOrigin(0.5, 0.5);
        this.eyesAnim2.visible = false;
        this.eyesAnim1 = this.add.sprite(game.config.width/2, game.config.height/2, 'final-sheet1', 0).setOrigin(0.5, 0.5);
        this.eyesAnim1.play('eyes-anim1');
        this.eyesAnim1.on('animationcomplete', () => {
            this.eyesAnim1.visible = false;
            this.eyesAnim2.visible = true;
            this.eyesAnim2.play('eyes-anim2');
        });
        this.eyesAnim2.on('animationcomplete', () => {
            this.eyesAnim2.visible = false;
            this.eyesAnim3.visible = true;
            this.eyesAnim3.play('eyes-anim3');
        });
        this.eyesAnim3.on('animationcomplete', () => {
            this.eyesAnim3.visible = false;
            this.add.sprite(game.config.width/2, game.config.height/2, 'end-screen').setOrigin(0.5, 0.5);
        });

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

    update() {

    }

    playSecondAnimation() {

    }
}