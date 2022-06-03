
class Relax extends Phaser.Scene {
    constructor() {
        super('s_relax');
    }

    init(data) {
        this.nextScene = data.next != null ? data.next : 's_overview';
        this.pg = data.pg;
    }

    preload () {
        // INSTRUCTIONS
        this.load.image('relax-title-text', './assets/Relax/Relax_Instructions/Relax_Text.png');
        this.load.image('relax-instructionBG', './assets/Relax/Relax_Instructions/Instruction_Background.png');
        this.load.spritesheet({
            key: 'relax-arrows-sheet',
            url: './assets/Relax/Relax_Instructions/Relax_Key_Sheet.png',
            frameConfig: {
                frameWidth: 304,
                frameHeight: 230
            }
        });

        // MAIN UI
        this.load.image('relaxBG', './assets/Relax/Relax_Background.png');
        this.load.image('still-all', './assets/Relax/Still_All.png');
        this.load.image('move-down', './assets/Relax/Move_Down.png');
        this.load.image('move-left', './assets/Relax/Move_Left.png');
        this.load.image('move-right', './assets/Relax/Move_Right.png');
        this.load.image('move-up', './assets/Relax/Move_Up.png');
        this.load.spritesheet({
            key: 'bird-sheet', 
            url: './assets/Relax/Bird_Dance_Sheet.png',
            frameConfig: {
                frameWidth: 603,
                frameHeight: 479
            }
        });
        this.load.spritesheet({
            key: 'relax-sheet',
            url: './assets/animations/relax_anim/relax.png',
            frameConfig: {
                frameWidth: 120,
                frameHeight: 85
            }
        });
        this.load.spritesheet({
            key: 'relax-complete-sheet',
            url: './assets/Complete_Sheet.png',
            frameConfig: {
                frameWidth: 665,
                frameHeight: 665
            }
        });

        // AUDIO
        this.load.audio('left-audio', './assets/audio/new sound/Bird_01.wav');
        this.load.audio('right-audio', './assets/audio/new sound/Bird_02.wav');
        this.load.audio('up-audio', './assets/audio/new sound/Bird_03.wav');
        this.load.audio('down-audio', './assets/audio/new sound/Bird_05.wav');
        this.load.audio('missed-audio', './assets/audio/new sound/Bird_04.wav');
        this.load.audio('relaxBG-audio', './assets/audio/new sound/new_BGM2.wav');
        this.load.audio('relax-complete-audio', './assets/audio/new sound/Bird Complete.wav');
    }

    create(data) {
        // GAME SETUP
        this.background = this.add.sprite(0, 0, 'relaxBG').setOrigin(0,0);
        data.music.stop();
        this.relaxBGAudio = this.sound.add(
            'relaxBG-audio',
            {
                volume: 0.2,
                loop: true
            }
        );
        this.relaxBGAudio.play();
        this.leftAudio = this.sound.add('left-audio', { volume: 0.5 });
        this.rightAudio = this.sound.add('right-audio', { volume: 0.5 });
        this.upAudio = this.sound.add('up-audio', { volume: 0.5 });
        this.downAudio = this.sound.add('down-audio', { volume: 0.5 });
        this.missAudio = this.sound.add('missed-audio', { volume: 0.5 });
        this.compAudio = this.sound.add('relax-complete-audio', { volume: 0.5 });

        // GAME OBJECTS
        this.bird = this.add.sprite( ((7*game.config.width)/10)-50, (4*game.config.height)/10, 'bird-sheet', 0 )
            .setOrigin(0.5, 0.5)
            .setScale(0.5, 0.5);

        this.birdFrame = 0;
        this.birdDanceInterval = this.time.addEvent({
            callback: () => {
                this.birdFrame = (this.birdFrame + 1) % 4;
                this.bird.setFrame(this.birdFrame, false, false);
            },
            delay: 100,
            loop: true
        });

        this.completeAnim = this.add.sprite(game.config.width/2, game.config.height/2, 'relax-complete-sheet', 0)
	        .setOrigin(0.5, 0.5);
        this.completeAnim.setDepth(100);
        this.completeAnim.visible = false;
        
        let x = 50;
        let width = 119
        this.leftArrowX = x;
        this.downArrowX = this.leftArrowX + width;
        this.upArrowX = (this.leftArrowX + 2*width) - 8;
        this.rightArrowX = (this.leftArrowX + 3*width) - 15;

        this.still_all = this.add.sprite(x, 100, 'still-all')
            .setOrigin(0, 0.5);

        this.arrowConfig = [
            { 
                id: 'leftArrow', 
                pos: this.leftArrowX, 
                text: 'move-left' 
            },
            { 
                id: 'downArrow', 
                pos: this.downArrowX, 
                text: 'move-down'
            },
            { 
                id: 'rightArrow', 
                pos: this.rightArrowX,
                text: 'move-right' 
            },
            { 
                id: 'upArrow', 
                pos: this.upArrowX,
                text: 'move-up' 
            }
        ];

        this.arrowArray= [];

        this.arrowSpawnConfig = {
            callback: () => {
                let index = Math.floor(Phaser.Math.Between(0,3));
                let arrow = this.add.sprite(
                    this.arrowConfig[index].pos, 
                    Phaser.Math.Between(game.config.height + 25, game.config.height + 120), 
                    this.arrowConfig[index].text
                    )
                    .setOrigin(0,0.5);
                this.arrowArray.push(
                    {
                        id: this.arrowConfig[index].id,
                        obj: arrow
                    }
                );
            },
            delay: 450,
            loop: true
        };

        // GAME CONTROLS
        keyLt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // ANIMATIONS
        this.anims.create({
            key: 'relax-display-arrows',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('relax-arrows-sheet', { start: 0, end: 11 }),
            repeat: -1
        });
        this.anims.create({
            key: 'relax-anim',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('relax-sheet', { start: 0, end: 4 }),
            repeat: -1
        });
        this.anim = this.add.sprite(
            game.config.width, 
            game.config.height, 
            'relax-sheet', 
            0)
            .setOrigin(1, 1);
        this.anim.play('relax-anim');
        this.anims.create({
            key: 'relax-complete-anim',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('relax-complete-sheet', { start: 0, end: 6 }),
            repeat: 0
        });

        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'relax-instructionBG')
            .setOrigin(0.5, 0.5);
        this.title = this.add.image(this.instructionBG.x, (3*game.config.height)/10, 'relax-title-text')
            .setOrigin(0.5, 0.5);
        this.arrowKeys = this.add.sprite(this.instructionBG.x, (game.config.height/2) + 25, 'relax-arrows-sheet', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        this.arrowKeys.play('relax-display-arrows');
        
        this.instructions = [
            this.instructionBG,
            this.title,
            this.arrowKeys,
            //this.spaceKey
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
        this.startGame = this.time.addEvent({
            callback: () => {
                this.arrowSpawnInterval = this.time.addEvent(this.arrowSpawnConfig);
            },
            callbackScope: this,
            delay: 2000,
            loop: false
        });

        // GAME VARIABLES
        this.score = 0;

        this.endAudio = this.time.addEvent({
            callback: () => {
                this.compAudio.play();
            },
            paused: true
        })
        
        this.end = this.time.addEvent({
            callback: () => {
                this.relaxBGAudio.stop();
                data.music.play();
                this.scene.stop(this);
            },
            delay: 4000,
            paused: true
        });

        this.completeEvent = this.time.addEvent({
            callback: () => {
                this.completeAnim.visible = true;
                this.completeAnim.play('relax-complete-anim');
            },
            callbackScope: this,
            delay: 2000,
            paused: true
        });
    }

    update() {
        if (game.config.HEALTH > 17)
            this.scene.stop();

        for (let i = 0; i < this.arrowArray.length; i += 1) {
            this.arrowArray[i].obj.y -= 3;
            
            if (this.arrowArray[i].obj.y < -100) {
                this.missAudio.play();
                this.arrowArray.splice(i, 1);
            }

            if (this.arrowArray[i].obj.y < 150 && 
                this.arrowArray[i].obj.y > 25) {
                    if (this.arrowArray[i].id == 'leftArrow' &&
                        Phaser.Input.Keyboard.JustDown(keyLt)) {
                            this.leftAudio.play();
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }

                    if (this.arrowArray[i].id == 'rightArrow' &&
                        Phaser.Input.Keyboard.JustDown(keyRt)) {
                            this.rightAudio.play();
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }

                    if (this.arrowArray[i].id == 'upArrow' && 
                        Phaser.Input.Keyboard.JustDown(keyUp)) {
                            this.upAudio.play();
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }

                    if (this.arrowArray[i].id == 'downArrow' &&
                        Phaser.Input.Keyboard.JustDown(keyDn)) {
                            this.downAudio.play();
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }
            }
        }
        

        if (this.score >= 40) {
            this.endAudio.paused = false;
            this.completeEvent.paused = false;
            this.end.paused = false;
        }
    }
}