
class Sleeping extends Phaser.Scene {
    constructor() {
        super('s_sleeping');

        this.SHEEP_START_X = -50;
        this.SHEEP_START_Y = game.config.height-200;
        this.SHEEP_MAXACC_Y = -525;
        this.FENCE_START_X = (2*game.config.width)/3;
        this.CHARGE_THRESHOLD = 600;

    }

    preload() {
        // INSTRUCTIONS
        this.load.image('title-text', './assets/Sleep/Sleep_Instructions/Sleep_Text.png');
        this.load.image('instructionBG', './assets/Sleep/Sleep_Instructions/Instruction_Background.png');
        // this.load.spritesheet({
        //     key: 'arrows-sheet',
        //     url: './assets/Relax/Relax_Instructions/Relax_Key_Sheet.png',
        //     frameConfig: {
        //         frameWidth: 304,
        //         frameHeight: 230
        //     }
        // });
        this.load.spritesheet({
            key: 'space-sheet',
            url: './assets/Sleep/Sleep_Instructions/Sleep_Space_Sheet.gif',
            frameConfig: {
                frameWidth: 304,
                frameHeight: 110
            }
        });

        this.load.image('curtains', './assets/Sleep/Curtains.png');
        this.load.image('nightsky', './assets/Sleep/Night_Sky.png');
        this.load.image('sheep', './assets/Sleep/Sheep.png');
        this.load.image('ground', './assets/Sleep/Ground.png');
        this.load.image('fence', './assets/Sleep/Fence.png');
    }

    create() {
        // SCENE SETUP
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keySPC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // HOLD SPACEBAR TO CHARGE JUMP / LONGER CHARGE = HIGHER JUMP

        // GAME OBJECTS
        this.nightsky = this.add.sprite(0, 0, 'nightsky').setOrigin(0,0);
        this.curtains = this.add.sprite(0, 0, 'curtains').setOrigin(0,0);
        this.sheep = this.physics.add.sprite(this.SHEEP_START_X, this.SHEEP_START_Y, 'sheep').setOrigin(0,1).setScale(0.5,0.5);
        this.sheep.setVelocityX(100,0);
        this.sheep.setGravity(0,300);
        this.fence = this.physics.add.sprite(this.FENCE_START_X, game.config.height-100, 'fence').setOrigin(0.5,1);
        this.fence.body.immovable = true;
        this.fence.body.allowGravity = false;
        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height, 'ground').setOrigin(0.5,1);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        
        this.physics.add.collider(this.sheep, this.fence);
        this.physics.add.collider(this.sheep, this.ground);
        
        // GAME LOGIC VARIABLES
        this.successCount = 0;
        this.isCharging = false;
        this.isJump = false;
        this.jumpStartTime;

        // TIMER CONFIGS
        this.failConfig = {
            callback: () => {
                this.sheep.x = this.SHEEP_START_X;
                this.sheep.y = this.SHEEP_START_Y;
                this.keySPC.enabled = true;
                this.sheep.setVelocityX(100,0);
            },
            delay: 500
        };

        // ANIMATIONS
        this.anims.create({
            key: 'display-space',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('space-sheet', { star: 0, end: 7 }),
            repeat: -1
        })

        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'instructionBG')
            .setOrigin(0.5, 0.5);
        this.title = this.add.image(this.instructionBG.x, (3*game.config.height)/10, 'title-text')
            .setOrigin(0.5, 0.5);
        // this.arrowKeys = this.add.sprite(this.instructionBG.x, (game.config.height/2) + 25, 'arrows-sheet', 0)
        //     .setScale(0.7, 0.7)
        //     .setOrigin(0.5, 0.5);
        // this.arrowKeys.play('display-arrows');
        this.spaceKey = this.add.sprite(this.instructionBG.x, game.config.height/2 + 25, 'space-sheet', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        this.spaceKey.play('display-space');
        
        this.instructions = [
            this.instructionBG,
            this.title,
            // this.arrowKeys,
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
        switch (this.successCount) {
            case 1:
                this.fence.setScale(1,1.7);
                break;
            case 2:
                this.fence.setScale(1,2.25);
                break;
        }
        if (this.keySPC.isDown && this.sheep.body.touching.down) {
            this.isCharging = true;
            this.jumpStartTime = this.keySPC.timeDown;
        }
        if (!this.keySPC.isDown && this.isCharging) {
            let velocity = this.SHEEP_MAXACC_Y * ((this.time.now-this.jumpStartTime)/this.CHARGE_THRESHOLD);
            let vFinal = -velocity < -this.SHEEP_MAXACC_Y ? velocity : this.SHEEP_MAXACC_Y;
            this.sheep.body.setVelocityY(vFinal);
            this.isCharging = false;
            this.timeJump = this.time.addEvent({
                callback: () => {
                    this.isJump = true;
                },
                delay: 200
            });
        }
        if (this.isJump && this.sheep.body.touching.down) {
            this.keySPC.enabled = false;
            if (this.sheep.x < (this.fence.width/2) + this.FENCE_START_X) { 
                    this.fail = this.time.addEvent(this.failConfig);
            }
            this.isJump = false;
        }

        if (!this.isJump && this.sheep.body.touching.right) {
            this.keySPC.enabled = false;
            this.reset = this.time.addEvent(this.failConfig);
        }
        if (this.sheep.x > game.config.width) {
            this.sheep.x = this.SHEEP_START_X;
            this.keySPC.enabled = true;
            this.successCount += 1;
        }
    }
}