
class DrinkWater extends Phaser.Scene {
    constructor() {
        super('s_drinkwater');
    }

    preload(){
        // INSTRUCTIONS
        this.load.image('title-text', './assets/Drink/Drink_Instructions/Drink_Text.png');
        this.load.image('instructionBG', './assets/Drink/Drink_Instructions/Instruction_Background.png');
        // this.load.spritesheet({
        //     key: 'arrows-sheet',
        //     url: './assets/Relax/Relax_Instructions/Relax_Key_Sheet.png',
        //     frameConfig: {
        //         frameWidth: 304,
        //         frameHeight: 230
        //     }
        // });
        this.load.image('space-text', './assets/Drink/Drink_Instructions/Drink_Space.png');

        // water [hold spacebar] game sprite
        this.load.image('water', './assets/drink/water.png');
        this.load.image('water2', './assets/drink/drinking.jpg');
        this.load.image('water3', './assets/drink/almostthere.jpg')
        this.load.image('empty', './assets/drink/empty.png');
    }
    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'MINI-GAME');
        
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // water [hold spacebar] minigame variables
        // sprite, keybind, timer 
       this.fullglass = this.add.sprite (game.config.width/2, game.config.height/2, 'water');
       
        //temp anim (flipping through the different images currently)
        this.drinking = this.add.sprite (game.config.width/2, game.config.height/2, 'water2');
        this.halfway = this.add.sprite (game.config.width/2, game.config.height/2, 'water3');
        this.emptyglass = this.add.sprite (game.config.width/2, game.config.height/2, 'empty');

        //init the other images visibility to false
        this.drinking.visible = false;
        this.halfway.visible = false;
        this.emptyglass.visible = false;
        
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.drinkCounter = 0;
        this.drinkTimer = this.time.addEvent({
            callback: () => {
                //console.log('Count: ' + this.drinkCounter);
                this.drinkCounter += 1;
                if (this.drinkCounter % 3 == 0){
                    //console.log("change frame");
                    this.fullglass.visible = false;
                    if (this.drinkCounter == 3 ){
                        this.drinking.visible = true;
                    }
                    else if(this.drinkCounter == 6){
                        this.halfway.visible = true;
            
                    }
                    // else if (this.drinkCounter == 9){
                    //     this.emptyglass.visible = true;
                    // }
                }
                if (this.drinkCounter == 10){
                    this.emptyglass.visible = true;
                    console.log("stop");
                    this.time.paused = true;
                    this.done = true;
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
        // this.arrowKeys = this.add.sprite(this.instructionBG.x, (game.config.height/2) + 25, 'arrows-sheet', 0)
        //     .setScale(0.7, 0.7)
        //     .setOrigin(0.5, 0.5);
        // this.arrowKeys.play('display-arrows');
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
        if (this.done){
            this.scene.stop('s_drinkwater').start('s_overview');
        }
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