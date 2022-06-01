
class Overview extends Phaser.Scene {
    constructor() {
        super('s_overview');

        this.progressCounter = 0;
        this.gamestart = true;
    }

    init(data) {
        if (data.pg) {
            this.progressCounter += data.pg;
        }
    }

    preload() {
        this.load.image('background', './assets/test/test-ground.png');
        this.load.image('human-body', './assets/Adult_Body.png');
        this.load.image('task', './assets/test/test-task.png');
        this.load.audio('heartbeat', './assets/audio/heartbeatBGM.wav');
        this.load.spritesheet({
            key: 'task-sheet',
            url: './assets/Emergency-Sheet.png',
            frameConfig: {
                frameWidth: 100,
                frameHeight: 100
            }
        });
    }

    create() {
        this.BG_Audio = this.sound.add(
            'heartbeat', 
            { 
                volume: 0.2,
                loop: true
            });
        this.BG_Audio.play();
        this.gamestart = false;

        // ANIMATIONS
        this.anims.create({
            key: 'task-anim',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('task-sheet', { start: 0, end: 7 }),
            repeat: -1
        });

        this.human_body = this.add.sprite(game.config.width/2, game.config.height/2, 'human-body');
        // this.task = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //     .setOrigin(0.5,0.5)
        //     .setScale(0.5,0.5)
        //     .setInteractive({ useHandCursor: true })
        //     .on('pointerdown', () => { 
        //         this.scene.sleep('s_overview').start('s_drinkwater');
        //     }, this);
        // this.task.play('task-anim');

        // PROTO SCENE LIST
        this.ov = 's_overview',
        this.dt = 's_drinkwater',
        this.et = 's_eating',
        this.mt = 's_medicine',
        this.rt = 's_relax',
        this.si = 's_sickness',
        this.sl = 's_sleeping',
        this.vt = 's_vomiting'

        this.sceneTracker = this.ov;

        this.startScene = this.dt;
        this.nextScene = this.ov;
        this.nextScene2 = null;

        this.taskBtn = this.add.sprite(
            this.human_body.x, 
            this.human_body.y - 250, 
            'task-sheet', 
            0)
            .setOrigin(0.5,0.5)
            .setScale(0.5,0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { 
                this.goToNextScene(this.startScene, this.nextScene, this.nextScene2);
            }, this);
            this.taskBtn.play('task-anim');
        
        this.progressCounter = 15;
        console.log(this.progressCounter);
    }

    update() {
        switch (this.progressCounter) {
            case 0:
                this.startScene = this.dt;
                this.nextScene = this.ov;
                break;
            case 1:
                this.taskBtn.x = this.human_body.x - 75;
                this.taskBtn.y = this.human_body.y - 175;
                this.startScene = this.mt;
                this.nextScene = this.ov;
                break;
            case 2:
                this.taskBtn.x = this.human_body.x + 75;
                this.taskBtn.y = this.human_body.y - 175;
                this.startScene = this.et;
                this.nextScene = this.dt
                break;
            case 3:
                this.taskBtn.x = this.human_body.x - 150;
                this.taskBtn.y = this.human_body.y + 100;
                this.startScene = this.rt;
                this.nextScene = this.ov;
                break;
            case 4:
                this.taskBtn.x = this.human_body.x - 100;
                this.taskBtn.y = this.human_body.y - 250;
                this.startScene = this.sl;
                this.nextScene = this.ov;
                break;
            case 5:
                this.taskBtn.x = this.human_body.x - 200;
                this.taskBtn.y = this.human_body.y - 100;
                this.startScene = this.mt;
                this.nextScene = this.et;
                break;
            case 6:
                this.taskBtn.x = this.human_body.x - 150;
                this.taskBtn.y = this.human_body.y + 100;
                this.startScene = this.rt;
                this.nextScene = this.ov;
                break;
            case 7:
                this.taskBtn.x = this.human_body.x;
                this.taskBtn.y = this.human_body.y - 50;
                this.startScene = this.si;
                this.nextScene = this.et;
                break;
            case 8:
                this.taskBtn.x = this.human_body.x - 100;
                this.taskBtn.y = this.human_body.y - 250;
                this.startScene = this.sl;
                this.nextScene = this.ov;
                break;
            case 9: // 3:00
                this.taskBtn.x = this.human_body.x; 
                this.taskBtn.y = this.human_body.y - 250;
                this.startScene = this.dt;
                this.nextScene = this.et;
                break;
            case 10: // 3:20
                this.taskBtn.x = this.human_body.x; 
                this.taskBtn.y = this.human_body.y - 250;
                this.startScene = this.dt;
                this.nextScene = this.vt;
                break;
            case 11: // 3:40
                this.taskBtn.x = this.human_body.x;
                this.taskBtn.y = this.human_body.y - 50;
                this.startScene = this.si;
                this.nextScene = this.vt;
                break;
            case 12: // 4:00
                this.taskBtn.x = this.human_body.x - 100;
                this.taskBtn.y = this.human_body.y - 250;
                this.startScene = this.sl;
                this.nextScene = this.mt;
                break;
            case 13: // 4:20
                this.taskBtn.x = this.human_body.x + 75;
                this.taskBtn.y = this.human_body.y - 175;
                this.startScene = this.et;
                this.nextScene = this.si;
                this.nextScene2 = this.vt;
                break;
            case 14: // 4:40
                this.taskBtn.x = this.human_body.x - 150;
                this.taskBtn.y = this.human_body.y + 100;
                this.startScene = this.rt;
                this.nextScene = this.dt;
                this.nextScene2 = null;
                break;
            case 15: // 5:00
                this.taskBtn.x = this.human_body.x;
                this.taskBtn.y = this.human_body.y - 100;
                this.startScene = this.rt;
                break;
        }
    }

    goToNextScene(start, nextScene, nextScene2) {
        this.scene.sleep(this.ov).start(start, { next: nextScene, pg: 1, next2: nextScene2 });
    }
}