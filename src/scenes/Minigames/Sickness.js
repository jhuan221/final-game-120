
class Sickness extends Phaser.Scene {
    constructor() {
        super('s_sickness');
    }

    init(data) {
        this.nextScene = data.next != null ? data.next : 's_overview';
        this.pg = data.pg;
    }

    preload() {
        // INSTRUCTIONS
        this.load.image('sick-text', './assets/Sick/Sick_Instructions/Sick_Text.png');
        this.load.image('sick-instructionBG', './assets/Relax/Relax_Instructions/Instruction_Background.png');
        this.load.spritesheet({
            key: 'sick-arrows-sheet',
            url: './assets/Relax/Relax_Instructions/Relax_Key_Sheet.png',
            frameConfig: {
                frameWidth: 304,
                frameHeight: 230
            }
        });
        this.load.spritesheet({
            key: 'sick-space-sheet',
            url: './assets/Sick/Sick_Instructions/Sick_Space_Sheet.gif',
            frameConfig: {
                frameWidth: 304,
                frameHeight: 110
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

        // MAIN UI
        this.load.image('arrow', './assets/Sick/Arrow.png');
        this.load.image('base-menu', './assets/Sick/Base_Menu.png');
        this.load.image('cell-text', './assets/Sick/Cell_Text.png');
        this.load.image('enemy-still', './assets/Sick/Enemy_Still.png');
        this.load.image('fight-text', './assets/Sick/Fight_Text.png');
        this.load.image('item-text', './assets/Sick/Item_Text.png');
        this.load.image('run-text', './assets/Sick/Run_Text.png');
        this.load.image('sick-background', './assets/Sick/Sick_Background.png');
        this.load.image('text-menu', './assets/Sick/Text_Menu.png');
        this.load.image('w-bloodcell', './assets/Sick/W_Bloodcell.png');
        this.load.image('tempBG', './assets/Sick/tempBackground.png');
        this.load.spritesheet({
            key: 'sick-sheet',
            url: './assets/animations/sick_anim/sick.png',
            frameConfig: {
                frameWidth: 120,
                frameHeight: 85
            }
        });

        // ATTACK UI        
        this.load.image('attack-text', './assets/Sick/Text/Attack_Name.png');

        // DIALOGUE
        this.load.image('denied-text', './assets/Sick/Text/Denied_Text.png');
        this.load.image('super-text', './assets/Sick/Text/Super_Effective.png');
        this.load.image('victory-text', './assets/Sick/Text/Victory.png');

        this.load.spritesheet({
            key: 'enemy-damage-sheet',
            url: './assets/Sick/Enemy_Damage_-Sheet.png',
            frameConfig: {
                frameWidth: 372,
                frameHeight: 201
            }
        });
        this.load.spritesheet({
            key: 'healthbar-sheet',
            url: './assets/Sick/Health_Bar_Sheet.png',
            frameConfig: {
                frameWidth: 250,
                frameHeight: 19
            }
        });

        this.load.audio('fight-audio', './assets/audio/new sound/new_BGM1.wav');
    }

    create(data) {
        if (data.music) {
            data.music.stop();
        }

        this.BG_Audio = this.sound.add(
            'fight-audio',
            {
                volume: 0.2,
                loop: true
            }
        )
        this.BG_Audio.play();

        // PRE CONSTANTS
        this.WHITE_CELL_START_X = game.config.width + 272;
        this.WHITE_CELL_FINAL_X = ((2*game.config.width)/5)-40;
        //this.WHITE_CELL_FINAL_Y = game.config.height/2;
        this.ENEMY_START_X = -186;
        this.ENEMY_FINAL_X = (7*game.config.width)/10;
        //this.ENEMY_FINAL_Y = game.config.height/5;

        // MAIN UI
        this.bg = this.add.image(0, 0, 'tempBG')
            .setOrigin(0, 0);
        this.sickBackground = this.add.sprite(
            game.config.width/2, 
            game.config.height/2, 
            'sick-background')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.whiteCell = this.add.sprite(
            this.WHITE_CELL_START_X, 
            game.config.height/2, 
            'w-bloodcell')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.enemy = this.add.sprite(
            this.ENEMY_START_X, 
            game.config.height/5, 
            'enemy-damage-sheet', 
            0)
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.enemyHealth = this.add.sprite(
            ((2*game.config.width)/5)+20, 
            (game.config.height/5)-18, 
            'healthbar-sheet', 0)
            .setScale(0.9,1)
            .setOrigin(0.5,0.5);
        this.baseMenu = this.add.sprite(
            game.config.width/2, 
            ((8*game.config.height)/10)+10, 
            'base-menu')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.fightText = this.add.sprite(
            (game.config.width/2)+80, 
            ((8*game.config.height)/10)-30, 
            'fight-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.itemText = this.add.sprite(
            (game.config.width/2)+70, 
            ((9*game.config.height)/10)-30, 
            'item-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.cellText = this.add.sprite(
            ((7*game.config.width)/10)+10, 
            ((8*game.config.height)/10)-30, 
            'cell-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.runText = this.add.sprite(
            ((7*game.config.width)/10)+10, 
            ((9*game.config.height)/10)-30, 
            'run-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.deniedText = this.add.image(
            ((3*game.config.width)/10) + 50,
            this.fightText.y,
            'denied-text')
            .setScale(0.45, 0.45)
            .setOrigin(0.5, 0.5);
        this.deniedText.visible = false;
        this.superText = this.add.image(
            ((3*game.config.width)/10) + 50,
            this.fightText.y,
            'super-text')
            .setScale(0.5, 0.5)
            .setOrigin(0.5, 0.5);
        this.superText.visible = false;
        this.victoryText = this.add.image(
            ((3*game.config.width)/10) + 50,
            this.fightText.y,
            'victory-text')
            .setScale(0.8, 0.8)
            .setOrigin(0.5, 0.5);
        this.victoryText.visible = false;
        this.completeAnim = this.add.sprite(game.config.width/2, game.config.height/2, 'complete-sheet', 0)
	        .setOrigin(0.5, 0.5);
        this.completeAnim.visible = false;
        
        // ATTACK UI
        this.attackText = this.add.sprite(this.fightText.x + 60, this.fightText.y, 'attack-text')
            .setScale(0.9, 0.9)
            .setOrigin(0.5, 0.5);
        this.attackText.visible = false;

        //ARROW POSITIONS
        this.PTR_FIGHT = { 
            x: this.fightText.x - 110, 
            y: this.fightText.y 
        };
        this.PTR_CELL = { 
            x: this.cellText.x - 70, 
            y: this.cellText.y 
        };
        this.PTR_ITEM = {
            x: this.fightText.x - 110,
            y: this.itemText.y
        };
        this.PTR_RUN = {
            x: this.cellText.x - 70,
            y: this.runText.y
        };

        // ARROW
        this.arrow = this.add.sprite(this.PTR_FIGHT.x, this.PTR_FIGHT.y, 'arrow')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);

        this.UI = [
            this.sickBackground,
            this.enemyHealth,
            this.baseMenu,
            this.arrow
        ];

        this.UI.forEach((elem) => {
            elem.visible = false;
        });

        this.UI_OPTIONS = [
            this.fightText,
            this.itemText,
            this.cellText,
            this.runText
        ];

        this.UI_OPTIONS.forEach((elem) => {
            elem.visible = false;
        });


        // BOOLEANS
        this.viewIntro = true;
        this.viewUI = false;
        this.viewUI_OPTIONS = false;
        this.viewAttack = false;
        this.topRow = true;
        this.leftCol = true;
        this.whiteCellAtkFwd = false;
        this.whiteCellAtkBck = false;
        this.enemyDefeated = false;

        // ANIMATIONS
        this.anims.create({
            key: 'sick-display-arrows',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('sick-arrows-sheet', { start: 0, end: 11 }),
            repeat: -1
        });
        this.anims.create({
            key: 'sick-display-space',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('sick-space-sheet', { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({
            key: 'take-damage',
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('enemy-damage-sheet', { start: 0, end: 3 }),
            repeat: 0
        });
        this.anims.create({
            key: 'drop-health',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('healthbar-sheet', { start: 0, end: 15}),
            repeat: 0
        });
        this.anims.create({
            key: 'sick-anim',
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('sick-sheet', { start: 0, end: 4 }),
            repeat: -1
        });
        this.anim = this.add.sprite(
            game.config.width,
            game.config.height, 
            'sick-sheet', 
            0)
            .setOrigin(1, 1);
        this.anim.play('sick-anim');
        this.anims.create({
            key: 'complete-anim',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('complete-sheet', { start: 0, end: 6 }),
            repeat: 0
        });

        // TIME EVENTS
        this.completeEvent = this.time.addEvent({
            callback: () => {
                this.completeAnim.visible = true;
                this.completeAnim.play('complete-anim');
            },
            callbackScope: this,
            delay: 2000,
            paused: true
        });
        this.end = this.time.addEvent({
            callback: () => {
                this.BG_Audio.stop();
                data.music.play();
                this.scene.start(this.nextScene, { pg: this.pg, music: data.music });
            },
            delay: 4000,
            paused: true
        });
        this.enemyDefeatedEvent = this.time.addEvent({
            callback: () => {
                this.superText.visible = false;
                this.victoryText.visible = true;
                this.end.paused = false;
            },
            delay: 1500,
            loop: false,
            paused: true
        });
        this.enemyDisappearConfig = {
            callback: () => {
                this.enemy.alpha -= 0.1;
            },
            delay: 50,
            loop: true
        }
        this.enemyDisappearDelayConfig = {
            callback: () => {
                this.completeEvent.paused = false;
                this.enemyDisappear = this.time.addEvent(this.enemyDisappearConfig);
            },
            delay: 1000,
            loop: false
        }
        this.dropHealthEvent = this.time.addEvent({
            callback: () => {
                this.enemy.play('take-damage');
                this.enemyHealth.play('drop-health');
                this.superText.visible = true;
                this.enemyDefeatedEvent.paused = false;
                this.enemyDead = this.time.addEvent(this.enemyDisappearDelayConfig);
            },
            delay: 1000,
            loop: false,
            paused: true
        });
        this.hideDeniedEventConfig = {
            callback: () => {
                this.deniedText.visible = false;
            },
            delay: 1500,
            loop: false
        }
        this.showDeniedEventConfig = {
            callback: () => {
                this.deniedText.visible = true;
                this.hideDeniedEvent = this.time.addEvent(this.hideDeniedEventConfig);
            },
            loop: false
        }

        // GAME CONTROLS
        keyLt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.controls = [
            keyLt,
            keyRt,
            keyUp,
            keyDn,
            keySp
        ];

        this.controls.forEach((elem) => {
            elem.enabled = false;
        });

        // INSTRUCTIONS
        this.instructionBG = this.add.image(game.config.width/2, game.config.height/2, 'sick-instructionBG')
            .setOrigin(0.5, 0.5);
        this.title = this.add.image(this.instructionBG.x, (3*game.config.height)/10, 'sick-text')
            .setOrigin(0.5, 0.5);
        this.arrowKeys = this.add.sprite(this.instructionBG.x, (game.config.height/2) + 25, 'sick-arrows-sheet', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        this.arrowKeys.play('sick-display-arrows');
        this.spaceKey = this.add.sprite(this.instructionBG.x, ((7*game.config.height)/10) + 25, 'sick-space-sheet', 0)
            .setScale(0.7, 0.7)
            .setOrigin(0.5, 0.5);
        this.spaceKey.play('sick-display-space');
        
        this.instructions = [
            this.instructionBG,
            this.title,
            this.arrowKeys,
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
    }

    update() {
        if (this.viewIntro &&
            (this.enemy.x < this.ENEMY_FINAL_X &&
            this.whiteCell.x > this.WHITE_CELL_FINAL_X)) {
                this.enemy.x += 5;
                this.whiteCell.x -= 5;
        }
        else {
            this.viewIntro = false;
        }
        
        if (!this.viewIntro && !this.viewUI) {
            this.UI.forEach((elem) => {
                elem.visible = true;
            });
            this.controls.forEach((elem) => {
                elem.enabled = true;
            });
            this.viewUI = true;
            this.displayInstructions = this.time.addEvent(this.displayInstructionsConfig);
        }

        if (!this.viewIntro && !this.viewUI_OPTIONS) {
            this.UI_OPTIONS.forEach((elem) => {
                elem.visible = true;
            });
            this.viewUI_OPTIONS = true;
        }

        if (!this.viewAttack &&
           (Phaser.Input.Keyboard.JustDown(keyRt) || 
            Phaser.Input.Keyboard.JustDown(keyLt))) {
            // ARROW POINTING AT FIGHT GO TO CELL
            if (this.topRow && this.leftCol) {
                this.arrow.x = this.PTR_CELL.x;
                this.arrow.y = this.PTR_CELL.y;
            }
            // ARROW POINTING AT CELL GO TO FIGHT
            if (this.topRow && !this.leftCol) {
                this.arrow.x = this.PTR_FIGHT.x;
                this.arrow.y = this.PTR_FIGHT.y;
            }
            // ARROW POINTING AT ITEM GO TO RUN
            if (!this.topRow && this.leftCol) {
                this.arrow.x = this.PTR_RUN.x;
                this.arrow.y = this.PTR_RUN.y;
            }
            // ARROW POINTING AT RUN GO TO ITEM
            if (!this.topRow && !this.leftCol) {
                this.arrow.x = this.PTR_ITEM.x;
                this.arrow.y = this.PTR_ITEM.y;
            }
            this.leftCol = !this.leftCol;
        }

        if (!this.viewAttack &&
           (Phaser.Input.Keyboard.JustDown(keyDn) ||
            Phaser.Input.Keyboard.JustDown(keyUp))) {
            // ARROW POINTING AT FIGHT GO TO ITEM
            if (this.topRow && this.leftCol) {
                this.arrow.x = this.PTR_ITEM.x;
                this.arrow.y = this.PTR_ITEM.y;
            }
            // ARROW POINTING AT ITEM GO TO FIGHT
            if (!this.topRow && this.leftCol) {
                this.arrow.x = this.PTR_FIGHT.x;
                this.arrow.y = this.PTR_FIGHT.y;
            }
            // ARROW POINTING AT CELL GO TO RUN
            if (this.topRow && !this.leftCol) {
                this.arrow.x = this.PTR_RUN.x;
                this.arrow.y = this.PTR_RUN.y;
            }
            // ARROW POINTING AT RUN GO TO CELL
            if (!this.topRow && !this.leftCol) {
                this.arrow.x = this.PTR_CELL.x;
                this.arrow.y = this.PTR_CELL.y;
            }
            this.topRow = !this.topRow;
        }

        if (Phaser.Input.Keyboard.JustDown(keySp)) {
            if ((this.arrow.x == this.PTR_FIGHT.x) &&
                (this.arrow.y == this.PTR_FIGHT.y)) {
                    if (!this.viewAttack) {
                        this.UI_OPTIONS.forEach((elem) => {
                            elem.visible = false;
                        });
                        this.viewAttack = true;
                        this.attackText.visible = true;
                    }
                    else {
                        this.whiteCellAtkFwd = true;
                        this.dropHealthEvent.paused = false;
                        this.controls.forEach((elem) => {
                            elem.enabled = false;
                        })
                    }
            }
            if ((this.arrow.x == this.PTR_ITEM.x) &&
                (this.arrow.y == this.PTR_ITEM.y)) {
                    this.deniedText.visible = true;
                    this.showDeniedEvent = this.time.addEvent(this.showDeniedEventConfig);
            }
            if ((this.arrow.x == this.PTR_CELL.x) &&
                (this.arrow.y == this.PTR_CELL.y)) {
                    this.deniedText.visible = true;
                    this.showDeniedEvent = this.time.addEvent(this.showDeniedEventConfig);
            }
            if ((this.arrow.x == this.PTR_RUN.x) &&
                (this.arrow.y == this.PTR_RUN.y)) {
                    this.deniedText.visible = true;
                    this.showDeniedEvent = this.time.addEvent(this.showDeniedEventConfig);
            }
        }
             

        if (this.whiteCellAtkFwd) {
            this.whiteCell.x += 5;
        }
        if (this.whiteCellAtkFwd && (this.whiteCell.x > this.WHITE_CELL_FINAL_X + 50)) {
            this.whiteCellAtkFwd = !this.whiteCellAtkFwd;
            this.whiteCellAtkBck = !this.whiteCellAtkBck;
        }
        if (this.whiteCellAtkBck) {
            this.whiteCell.x -= 5;
        }
        if (this.whiteCellAtkBck && (this.whiteCell.x == this.WHITE_CELL_FINAL_X)) {
            this.whiteCellAtkBck = !this.whiteCellAtkBck;
        }
    }
}