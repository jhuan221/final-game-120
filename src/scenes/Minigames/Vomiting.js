
class Vomiting extends Phaser.Scene {
    constructor() {
        super('s_vomiting');
    }

    init(data) {
        this.nextScene = data.next != null ? data.next : 's_overview';
        this.pg = data.pg;
    }

    preload() {
        // INSTRUCTIONS
        this.load.image('title-text', './assets/Vomit/Vomit_Instructions/Vomit_Text.png');
        this.load.image('instructionBG', './assets/Vomit/Vomit_Instructions/Instruction_Background.png');
        this.load.spritesheet({
            key: 'space-sheet',
            url: './assets/Vomit/Vomit_Instructions/Vomit_Space_Sheet.png',
            frameConfig: {
                frameWidth: 304,
                frameHeight: 110
            }
        });

        this.load.image('vomitBG', './assets/Vomit/Pipe_Background.png');
        this.load.spritesheet({
            key: 'pipe-sheet', 
            url: './assets/Vomit/V_Pipe-Sheet.png',
            frameConfig: {
                frameWidth: 1280,
                frameHeight: 800
            }
        });
        this.load.spritesheet({
            key: 'vomit-sheet',
            url: './assets/animations/vomit_anim/vomiting.png',
            frameConfig: {
                frameWidth: 120,
                frameHeight: 85
            }
        });
    }

    create() {
        // SCENE SETUP
        this.background = this.add.sprite(0, 0, 'vomitBG').setOrigin(0,0);

        // CONTROLS
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // ANIMATIONS
        this.anims.create({
            key: 'display-space',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('space-sheet', { start: 0, end: 3 }),
            repeat: -1
        })
        this.anims.create({
            key: 'vomit-anim',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('vomit-sheet', { start: 0, end: 4 }),
            repeat: -1           
        })
        this.anim = this.add.sprite(
            game.config.width,
            game.config.height,
            'vomit-sheet',
            0)
            .setOrigin(1, 1);
        this.anim.play('vomit-anim');

        // GAME VARIABLES
        this.counter = 0;
        this.frame = 9;

        // MAIN SPRITE
        this.vpipe = this.add.sprite(game.config.width/2, game.config.height/2, 'pipe-sheet', this.frame).setScale(0.9, 0.9);
    
        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'instructionBG')
            .setOrigin(0.5, 0.5);
        this.title = this.add.image(this.instructionBG.x, (3*game.config.height)/10, 'title-text')
            .setOrigin(0.5, 0.5);
        this.spaceKey = this.add.sprite(this.instructionBG.x, (game.config.height/2) + 25, 'space-sheet', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        this.spaceKey.play('display-space');
        
        this.instructions = [
            this.instructionBG,
            this.title,
            //this.arrowKeys,
            this.spaceKey
        ];

        this.instructions.forEach((elem) => {
            elem.visible = false;
            elem.alpha = 0.0;
        });

        this.hideInstructionsConfig = {
            callback: () => {
                this.instructions.forEach((elem) => {
                    elem.alpha -= 0.05;
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

        this.end = this.time.addEvent({
            callback: () => {
                this.scene.start(this.nextScene, { pg: this.pg });
            },
            delay: 2000
        });
        this.end.paused = true;
    }
       

    update() {
        this.counter = Phaser.Input.Keyboard.JustDown(keySp) ? this.counter + 1 : this.counter;
        switch (this.counter == 5) {
            case true: 
                this.frame -= 1;
                this.counter = 0;
                break;
        }
        if (this.frame == -1) {
            this.end.paused = false;
        }
        this.vpipe.setFrame(this.frame, false, false);
    }
}