
class Game_Over extends Phaser.Scene {
    constructor() {
        super('s_gameover');

        //this.counter = 0;
        this.gamestart = true;
    }

    preload() {
        this.load.spritesheet('end', './assets/game_over/game_over_sheet.png', {frameWidth: 912,
            frameHeight: 570, stateFrame: 0, endFrame: 14});
        this.load.image('bkgrd', './assets/game_over/borders.png');
        this.load.image('black', './assets/game_over/black.png');
    }

    create() {
      this.add.sprite(game.config.width/2, game.config.height/2, 'bkgrd');
      this.anims.create({
        key: 'bad_end', 
        frames: this.anims.generateFrameNumbers('end', { start: 0, end: 14, first: 0}),
        frameRate: 10
        });
        //this.end = this.add.sprite(game.config.width/2, game.config.height/2, 'end');
    }

    update() {
        // this.end = this.add.sprite(game.config.width/2, game.config.height/2, 'end');
        // this.end.anims.play('bad_end');
    }
}