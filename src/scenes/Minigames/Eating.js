
class Eating extends Phaser.Scene {
    constructor() {
        super('s_eating');

        this.PLAYER_ACCEL_Y = -900;
        this.PLAYER_MAX_Y = 300;
        this.PLAYER_START_X = game.config.width/4;
        this.PLAYER_START_Y = game.config.height/3;

    }

    init(data) {
        this.nextScene = data.next != null ? data.next : 's_overview';
        this.nextScene2 = data.next2 != null ? data.next2 : null;
        this.pg = data.pg;
    }

    preload() {
        // INSTRUCTIONS
        this.load.image('eat-title-text', './assets/Eating/Eating_Instructions/Eating_Text.png');
        this.load.image('eat-instructionBG', './assets/Eating/Eating_Instructions/Instruction_Background.png');
        this.load.spritesheet({
            key: 'eating-space-sheet',
            url: './assets/Eating/Eating_Instructions/Eating_Space_Sheet.gif',
            frameConfig: {
                frameWidth: 304,
                frameHeight: 110
            }
        });

        this.load.image('eatBG', './assets/Eating/Eating_Background.png');
        this.load.image('plane', './assets/Eating/Orange_Chicken.png');
        this.load.image('fork', './assets/Eating/Full_Fork.png');
        this.load.image('spoon', './assets/Eating/Full_Spoon.png');
        this.load.image('wall', './assets/test/test-baby-eating/test-wall.png');
        this.load.spritesheet({
            key: 'eating-sheet',
            url: './assets/animations/eat_anim/eating.png',
            frameConfig: {
                frameWidth: 120,
                frameHeight: 85
            }
        });
        this.load.spritesheet({
            key: 'complete-sheet',
            url: './assets/Complete_Sheet.png',
            frameConfig: {
                frameWidth: 665,
                frameHeight: 665
            }
        });

        this.load.audio('eating-audio', './assets/audio/new sound/eat.wav');
    }

    create() {
        // SCENE SETUP
        this.physics.world.gravity.y = 0; // CHANGES TO 200 AFTER INSTRUCTIONS ARE DISPLAYED
        this.scrollspeed = 200;
        this.keySPC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keySPC.enabled = false;
        this.background = this.add.sprite(0, -80, 'eatBG').setOrigin(0,0);
        this.eatingAudio = this.sound.add('eating-audio', { volume: 0.5 });

        this.completeAnim = this.add.sprite(game.config.width/2, game.config.height/2, 'complete-sheet', 0)
	        .setOrigin(0.5, 0.5);
        this.completeAnim.visible = false;

        // PLAYER SETTINGS
        this.player = this.physics.add.sprite(this.PLAYER_START_X, this.PLAYER_START_Y, 'plane');
        this.player.body.setMaxVelocity(200, this.PLAYER_MAX_Y);
        this.player.setCollideWorldBounds(false);

        // TOP BOUNDARY
        this.boundsTop = this.physics.add.sprite(0, -24, 'wall').setOrigin(0,0.5).setScale(26,1);
        this.boundsTop.body.immovable = true;
        this.boundsTop.body.allowGravity = false;
        this.physics.add.collider(this.boundsTop, this.player);
        
        // BOTTOM BOUNDARY
        // this.boundsBot = this.physics.add.sprite(0, game.config.height+24, 'wall').setOrigin(0,0.5).setScale(22,1);
        // this.boundsBot.body.immovable = true;
        // this.boundsBot.body.allowGravity = false;
        // this.physics.add.collider(this.boundsBot, this.player); 

        // SPAWN WALLS
        this.isSpoon = true;
        this.topHalf = true;
        this.wallSpawnInterval = this.time.addEvent({
            callback: () => {
                let wallPosition = this.topHalf ? Phaser.Math.Between(game.config.height/10, (4*game.config.height)/10)
                                                : Phaser.Math.Between((6*game.config.height)/10, (9*game.config.height)/10);
                let wall;
                switch (this.isSpoon) {
                    case true:
                        wall = this.physics.add.sprite(
                            game.config.width + 10, 
                            wallPosition,
                            'spoon'
                        )
                        .setOrigin(0.5,0.5)
                        .setScale(1, Phaser.Math.Between(1,1.5))
                        .setFlipY(true);
                        break;
                    case false:
                        wall = this.physics.add.sprite(
                            game.config.width + 10, 
                            wallPosition,
                            'fork'
                        )
                        .setOrigin(0.5,0.5)
                        .setScale(1, Phaser.Math.Between(1,2));
                        break;
                }
                wall.body.immovable = true;
                wall.body.allowGravity = false;
                wall.setVelocityX(-this.scrollspeed);
                this.physics.add.collider(wall, this.player);
                this.topHalf = !this.topHalf;
                this.isSpoon = !this.isSpoon;
            },
            callbackScope: this,
            delay: 1800,
            startAt: 1,
            loop: true
        });

        // ANIMATIONS
        this.anims.create({
            key: 'eating-display-space',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('eating-space-sheet', { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({
            key: 'eating-anim',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('eating-sheet', { start: 0, end: 4 }),
            repeat: -1
        });
        this.anims.create({
            key: 'complete-anim',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('complete-sheet', { start: 0, end: 6 }),
            repeat: 0
        });

        this.anim = this.add.sprite(
            game.config.width,
            game.config.height,
            'eating-sheet',
            0)
            .setOrigin(1, 1);
        this.anim.play('eating-anim');

        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'eat-instructionBG')
            .setOrigin(0.5, 0.5);
        this.title = this.add.image(this.instructionBG.x, (3*game.config.height)/10, 'eat-title-text')
            .setOrigin(0.5, 0.5);
        this.spaceKey = this.add.sprite(this.instructionBG.x, game.config.height/2 + 25, 'eating-space-sheet', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        this.spaceKey.play('eating-display-space');

        this.instructions = [
            this.instructionBG,
            this.title,
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
                this.physics.world.gravity.y = 200;
                this.keySPC.enabled = true;
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

        this.progress = 0;
        this.flightTime = this.time.addEvent({
            callback: () => {
                this.progress += 1;
            },
            delay: 1000,
            loop: true
        });

        this.end = this.time.addEvent({
            callback: () => {
                this.physics.world.gravity.y = 0;
                this.keySPC.enabled = false;
                this.scene.start(this.nextScene, { next: this.nextScene2, pg: this.pg, main_audio: this.ov_audio });
            },
            delay: 4000,
            paused: true
        });
    }

    update() {
        switch (this.keySPC.isDown) {
            case true:
                this.player.body.setAccelerationY(this.PLAYER_ACCEL_Y);
                break;
            default:
                this.player.body.setAccelerationY(0);
        }
        switch (this.player.x < this.PLAYER_START_X) {
            case true:
                this.player.setVelocityX(25);
                break;
            default:
                this.player.setVelocityX(0);
        }

        if (this.player.y > game.config.height + this.player.height ||
            this.player.x < -this.player.width) {
                this.progress -= 3;
                this.player.x = this.PLAYER_START_X;
                this.player.y = this.PLAYER_START_Y;
        }

        if (this.progress >= 30) {
            this.completeEvent = this.time.addEvent({
                callback: () => {
                    this.completeAnim.visible = true;
                    this.completeAnim.play('complete-anim');
                },
                callbackScope: this,
                delay: 2000
            });
            this.end.paused = false;
        }
    }
}