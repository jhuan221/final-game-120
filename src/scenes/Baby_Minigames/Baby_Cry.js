
class Baby_Cry extends Phaser.Scene {
    constructor() {
        super('baby_cry');
    }

    preload() {
        
    }

    create() {
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.counter_d = 0;
        this.counter_f = 0;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
            this.counter_d += 1;
            console.log('D: ' + this.counter_d);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
            this.counter_f += 1;
            console.log('F: ' + this.counter_f);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.scene.stop('baby_cry').start('s_overview');
        }
    }
} 