
class DrinkWater extends Phaser.Scene {
    constructor() {
        super('s_drinkwater');
    }

    init(data) {
        this.nextScene = data.next != null ? data.next : 's_overview';
        this.pg = data.pg;
    }

    preload() {
        // INSTRUCTIONS
        this.load.image('title-text', './assets/Drink/Drink_Instructions/Drink_Text.png');
        this.load.image('instructionBG', './assets/Drink/Drink_Instructions/Instruction_Background.png');
        this.load.image('space-text', './assets/Drink/Drink_Instructions/Drink_Space.png');

        // water [hold spacebar] game sprite
        this.load.audio('glass-clink', './assets/audio/minigame_sfx/BABY/Glass Clink.wav');
        this.load.audio('swallow-water', './assets/audio/minigame_sfx/BABY/Swallowing Water Sound Effect.wav')
        this.load.image('BG', './assets/drink/Drink_Background.png');
        this.load.spritesheet({
            key: 'glass-sheet',
            url: './assets/drink/Glass_Sheet.png',
            frameConfig: {
                frameWidth: 270,
                frameHeight: 460
            }
        });
        this.load.spritesheet({
            key: 'thirst-sheet',
            url: './assets/drink/Thirst_Sheet.png',
            frameConfig: {
                frameWidth: 207,
                frameHeight: 20
            }
        });
        this.load.spritesheet({
            key: 'drink-sheet',
            url: './assets/animations/drink_anim/drinking.png',
            frameConfig: {
                frameWidth: 120,
                frameHeight: 85
            }
        });
    }

    create() {
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bg = this.add.sprite(0, -80, 'BG', 0)
            .setOrigin(0, 0);
        this.thirst = this.add.sprite(game.config.width/2, game.config.height - 140, 'thirst-sheet', 0)
            .setOrigin(0.5, 0.5);
        this.glass = this.add.sprite(game.config.width/2, (game.config.height/2) - 80, 'glass-sheet', 0)
            .setOrigin(0.5, 0.5);
        this.drinkAnim = this.add.sprite(game.config.width, game.config.height, 'drink-sheet', 0)
            .setOrigin(1, 1);
        
        // ANIMATIONS
        this.anims.create({
            key: 'drink-anim',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('drink-sheet', { start: 0, end: 4 }),
            repeat: -1
        });
        this.drinkAnim.play('drink-anim');

        // GAME VARIABLES
        this.frame = 0;
        this.drinkCounter = 0;

        this.drinkTimer = this.time.addEvent({
            callback: () => {
                this.swallowWaterAudio = this.sound.add(
                    'swallow-water',
                    {
                        volume: 0.2,
                        loop: false
                    }
                );
                this.swallowWaterAudio.play();
                this.drinkCounter += 1;
                if (this.drinkCounter == 3 ){
                    this.glass.setFrame(1, false, false);
                }
                if(this.drinkCounter == 6){
                    this.glass.setFrame(2, false, false);
                }
                if (this.drinkCounter == 9){
                    this.glass.setFrame(3, false, false);
                }
                if (this.drinkCounter == 12){
                    this.glass.setFrame(4, false, false);
                    this.clinkAudio = this.sound.add(
                        'glass-clink',
                        {
                            volume: 0.2,
                            loop: false
                        }
                    );
                    this.clinkAudio.play();
                    this.end = this.time.addEvent({
                        callback: () => {
                            this.scene.start(this.nextScene, { pg: this.pg });
                        },
                        callbackScope: this,
                        delay: 2000
                    });
                }
            },
            delay: 1000,
            loop: true,
            stopAt: 10000,
            paused: true
        });
        this.done = false;

        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'instructionBG')
            .setOrigin(0.5, 0.5);
        this.title = this.add.image(this.instructionBG.x, (3*game.config.height)/10, 'title-text')
            .setOrigin(0.5, 0.5);
        this.spaceKey = this.add.sprite(this.instructionBG.x, game.config.height/2 + 25, 'space-text', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        //this.spaceKey.play('display-space');

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
    }

    update() {
        // if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
        //     this.scene.stop('baby_drinkwater').start('s_overview');
        // }
        // water [hold spacebar] functionality
        this.drinkWater(this.drinkTimer);
        // if (this.done){
        //     this.scene.stop('s_drinkwater').start('s_overview');
        // }
    }

    // player hold spacebar for 10 seconds consectively to drink water
    // if player releases spacebar timer stops 
    drinkWater(dtimer){
        if (Phaser.Input.Keyboard.JustDown(keySp)){
          if (dtimer.paused){
              dtimer.paused = false;
          }
        }
        if (Phaser.Input.Keyboard.JustUp(keySp)){
            dtimer.paused = true;
        }
    }
}