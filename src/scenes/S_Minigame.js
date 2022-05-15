
class S_Minigame extends Phaser.Scene {
    constructor() {
        super('s_minigame');
    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'MINI-GAME');
        
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.scene.stop('s_minigame').start('s_overview');
        }
    }
}