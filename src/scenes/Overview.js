
class Overview extends Phaser.Scene {
    constructor() {
        super('s_overview');

        //this.counter = 0;
        this.gamestart = true;
    }

    preload() {
        this.load.image('background', './assets/test/test-ground.png');
        this.load.image('human-body', './assets/Adult_Body.png');
        this.load.image('task', './assets/test/test-task.png');
        this.load.audio('heartbeat', './assets/audio/heartbeatBGM.wav');
    }

    create() {
        if (this.gamestart){
            this.BG_Audio = this.sound.add(
                'heartbeat', 
                { 
                    volume: 0.2,
                    loop: true
                });
            this.BG_Audio.play();
            this.gamestart = false;
        }
        this.human_body = this.add.sprite(game.config.width/2, game.config.height/2, 'human-body');
        this.task = this.add.sprite(this.human_body.x + 150, this.human_body.y, 'task')
            .setOrigin(0.5,0.5)
            .setScale(0.5,0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { 
                this.scene.sleep('s_overview').start('s_drinkwater');
            }, this);

        // this.counter = 1;
        // this.testTimer = this.time.addEvent({
        //     callback: () => {
        //         console.log('Count: ' + this.counter);
        //         this.counter += 1;
        //     },
        //     delay: 1000,
        //     loop: true
        // });
    }

    update() {

    }
}