
class Medicine extends Phaser.Scene {
    constructor() {
        super('s_medicine');
    }

    init(data) {
        this.nextScene = data.next != null ? data.next : 's_overview';
        this.pg = data.pg;
    }

    preload() {
        // INSTRUCTIONS
        this.load.image('med-title-text', './assets/Med/Med_Instructions/Med_Text.png');
        this.load.image('med-instructionBG', './assets/Med/Med_Instructions/Instruction_Background.png');
        this.load.spritesheet({
            key: 'med-arrows-sheet',
            url: './assets/Med/Med_Instructions/Med_Key_Sheet.png',
            frameConfig: {
                frameWidth: 304,
                frameHeight: 230
            }
        });

        // MAIN UI
        this.load.image('medBG', '/assets/Med/Med_Background.png');
        this.load.image('leftWall', './assets/Med/Med_Left_Wall.png');
        this.load.image('rightWall', './assets/Med/Med_Right_Wall.png');
        this.load.image('player', './assets/Med/Med_Player_New.png');
        this.load.spritesheet({
            key: 'med-sheet',
            url: './assets/animations/medicine_anim/looking_med.png',
            frameConfig: {
                frameWidth: 120,
                frameHeight: 85
            }
        });

        this.load.audio('pill-shake', './assets/audio/new sound/medicine.wav');
    }

    create() {
        // CONSTANTS
        this.BLOCK_SIZE = 28;
        this.PLAYER_START_Y = game.config.height - 29 - (16*this.BLOCK_SIZE);
        this.WALL_START_Y = game.config.height - 29;
        this.PLAYER_POS = [
            ( game.config.width/2 ) + 8 - ( 5*this.BLOCK_SIZE ), // COL 0
            ( game.config.width/2 ) + 8 - ( 4*this.BLOCK_SIZE ), // COL 1
            ( game.config.width/2 ) + 8 - ( 3*this.BLOCK_SIZE ), // COL 2
            ( game.config.width/2 ) + 8 - ( 2*this.BLOCK_SIZE ), // COL 3
            ( game.config.width/2 ) + 8 - this.BLOCK_SIZE,       // COL 4
            ( game.config.width/2 ) + 8,                         // COL 5
            ( game.config.width/2 ) + 8 + this.BLOCK_SIZE,       // COL 6
            ( game.config.width/2 ) + 8 + ( 2*this.BLOCK_SIZE ), // COL 7
            ( game.config.width/2 ) + 8 + ( 3*this.BLOCK_SIZE ), // COL 8
            ( game.config.width/2 ) + 8 + ( 4*this.BLOCK_SIZE ), // COL 9
        ];
        this.BAD_SPOT1 = 551;
        this.BAD_SPOT2 = 579;

        // GAME CONTROLS
        keyLt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.controls = [
            keyLt,
            keyRt
        ];
        this.controls.forEach((elem) => {
            elem.enabled = false;
        });

        // ANIMATIONS
        this.anims.create({
            key: 'med-display-arrows',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('med-arrows-sheet', { start: 0, end: 5 }),
            repeat: -1
        });
        
        this.anims.create({
            key: 'display-anim',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('med-sheet', { start: 0, end: 4 }),
            repeat: -1
        });

        // GAME VARIABLES
        this.index = 5;

        // MAIN UI
        this.background = this.add.image(0, 0, 'medBG')
            .setOrigin(0, 0);
        this.leftWall = this.add.sprite(
            ( (4*game.config.width)/10 ) + 66,
            game.config.height - 29,
            'leftWall')
            .setOrigin(0.5, 1);
        this.rightWall = this.add.sprite(
            ( (6*game.config.width)/10 ) - 30,
            game.config.height - 29,
            'rightWall')
            .setOrigin(0.5, 1);
        this.player = this.add.sprite(
            this.PLAYER_POS[this.index],
            this.PLAYER_START_Y,
            'player')
            .setOrigin(0.5, 1);
        this.anim = this.add.sprite(
            game.config.width,
            game.config.height,
            'med-sheet',
            0)
            .setOrigin(1, 1);
        this.anim.play('display-anim');

        // TIME INTERVALS
        this.playerDescend = this.time.addEvent({
            callback: () => {
                this.controls.forEach((elem) => {
                    elem.enabled = true;
                });
                this.player.y += this.BLOCK_SIZE;
            },
            delay: 750,
            loop: true
        });

        this.playerFailConfig = {
            callback: () => {
                this.player.y = this.PLAYER_START_Y;
                this.playerDescend.paused = false;
            },
            delay: 750,
            loop: false
        };

        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'med-instructionBG')
            .setOrigin(0.5, 0.5);
        this.title = this.add.image(this.instructionBG.x, (3*game.config.height)/10, 'med-title-text')
            .setOrigin(0.5, 0.5);
        this.arrowKeys = this.add.sprite(this.instructionBG.x, (game.config.height/2) + 25, 'med-arrows-sheet', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        this.arrowKeys.play('med-display-arrows');

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

        this.pillShake = this.time.addEvent({
            callback: () => {
                this.pillShakeAudio = this.sound.add('pill-shake', { volume: 0.5 });
                this.pillShakeAudio.play();
            },
            paused: true
        })

        this.end = this.time.addEvent({
            callback: () => {
                this.scene.start('s_overview', { pg: this.pg });
            },
            delay: 4000,
            paused: true
        });
    }

    update() {
        this.player.x = this.PLAYER_POS[this.index];

        if (this.player.y == this.WALL_START_Y) {
            this.playerDescend.paused = true;
            this.pillShake.paused = false;
            this.end.paused = false;
        }

        if ((this.player.y > this.BAD_SPOT1) && this.index == 6) {
            this.controls.forEach((elem) => {
                elem.enabled = false;
            })
        }

        if ((this.player.y == this.BAD_SPOT1) && (this.index == 0 || 
            (this.index > 2 && this.index < 6))) {
                this.controls.forEach((elem) => {
                    elem.enabled = false;
                });
                this.playerDescend.paused = true;
                this.playerFail = this.time.addEvent(this.playerFailConfig);
        }

        if ((this.player.y == this.BAD_SPOT2) && 
            ((this.index > 0 && this.index < 3) || this.index > 6)) {
                this.controls.forEach((elem) => {
                    elem.enabled = false;
                });
                this.playerDescend.paused = true;
                this.playerFail = this.time.addEvent(this.playerFailConfig);
        }

        if (Phaser.Input.Keyboard.JustDown(keyLt) && this.index - 1 > -1) {
            this.index -= 1;
        }
        if (Phaser.Input.Keyboard.JustDown(keyRt) && this.index + 1 < this.PLAYER_POS.length) {
            this.index += 1;
        }
    }
}