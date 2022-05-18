
class Baby_Eating extends Phaser.Scene {
    constructor() {
        super('baby_eating');
    }

    preload() {
        this.load.image('plane', './assets/test/test-airplane.png');
    }

    create() {
        this.physics.world.gravity.y = 200;
        this.PLAYER_ACCEL_Y = -900;
        this.PLAYER_MAX_Y = 300;

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keySPC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player = this.physics.add.sprite(game.config.width/10, game.config.height/3, 'plane');
        this.player.body.setMaxVelocity(0, this.PLAYER_MAX_Y);
        this.player.setCollideWorldBounds(true);
    }

    update() {
        switch (this.keySPC.isDown) {
            case true:
                this.player.body.setAccelerationY(this.PLAYER_ACCEL_Y);
                break;
            default:
                this.player.body.setAccelerationY(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.scene.stop('baby_eating').start('s_overview');
        }
    }
}