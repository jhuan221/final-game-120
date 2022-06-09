
class Game_Over extends Phaser.Scene {
    constructor() {
        super('s_gameover');

        //this.counter = 0;
        this.gamestart = true;
    }

    preload() {
        // loading assets for the game over sequence 
        this.load.spritesheet('end', './assets/game_over/game_over_sheet.png', {frameWidth: 912,
            frameHeight: 565, startFrame: 0, endFrame: 14});
        this.load.image('bkgrd', './assets/game_over/borders.png');
        this.load.image('black', './assets/game_over/black.png');
        this.load.audio('sfx_slowdown', './assets/game_over/ekg_flatlining.wav', {volume:0.2});
    }

    create() {
      // adding borders for background  
      this.add.sprite(game.config.width/2, game.config.height/2, 'bkgrd');
      // animation config
      this.anims.create({
        key: 'bad_end', 
        frames: this.anims.generateFrameNumbers('end', { start: 0, end: 14, first: 0}),
        frameRate: 10
        }); 
       // boolean to have animation play once  
        this.playending = true;

        // keyboard config for return to menu or restart
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (this.playending){
            this.endSound = this.sound.add('sfx_slowdown', { volume: 0.4 });
            this.endSound.play();
            let ending = this.add.sprite(game.config.width/2, game.config.height/2, 'end');
            ending.anims.play('bad_end');
            this.playending = false;
        }

        // checking for player input
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            game.config.HEALTH = 0;
            game.config.PROG = 0;
            game.config.GRADER = false;
            game.config.INGAME = false;
            this.scene.start('s_menu');
        }
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            game.config.HEALTH = 0;
            game.config.PROG = 0;
            this.scene.start('s_overview');
            // need to implement to switch to overview and make sure things are resetted
            //console.log('restart and switch back to overview');
        }
    }
}