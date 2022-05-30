
class Sickness extends Phaser.Scene {
    constructor() {
        super('s_sickness');

        this.WHITE_CELL_START_X = game.config.width + 272;
        this.WHITE_CELL_FINAL_X = ((2*game.config.width)/5)-40;
        //this.WHITE_CELL_FINAL_Y = game.config.height/2;
        this.ENEMY_START_X = -186;
        this.ENEMY_FINAL_X = (7*game.config.width)/10;
        //this.ENEMY_FINAL_Y = game.config.height/5;
    }

    preload() {
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
    }

    create() {
        this.sickBackground = this.add.sprite(game.config.width/2, game.config.height/2, 'sick-background')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.enemyHealth = this.add.sprite(
            ((2*game.config.width)/5)+20, 
            (game.config.height/5)-18, 
            'healthbar-sheet', 0)
            .setScale(0.9,1)
            .setOrigin(0.5,0.5);
        this.whiteCell = this.add.sprite(this.WHITE_CELL_START_X, game.config.height/2, 'w-bloodcell')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.enemy = this.add.sprite(this.ENEMY_START_X, game.config.height/5, 'enemy-damage-sheet', 0)
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.baseMenu = this.add.sprite(game.config.width/2, ((8*game.config.height)/10)+10, 'base-menu')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.fightText = this.add.sprite((game.config.width/2)+90, ((8*game.config.height)/10)-30, 'fight-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.itemText = this.add.sprite((game.config.width/2)+80, ((9*game.config.height)/10)-30, 'item-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.cellText = this.add.sprite(((7*game.config.width)/10)+10, ((8*game.config.height)/10)-30, 'cell-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.runText = this.add.sprite(((7*game.config.width)/10)+10, ((9*game.config.height)/10)-30, 'run-text')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
        this.arrow = this.add.sprite(this.fightText.x - 110, this.fightText.y, 'arrow')
            .setScale(0.9,0.9)
            .setOrigin(0.5,0.5);
    }

    update() {
        
    }
}