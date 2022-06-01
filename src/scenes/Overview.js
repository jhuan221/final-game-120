
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

        // .on('pointerdown', () => { 
        //     this.scene.sleep('s_overview').start('s_eating');
        // }, this);

        //  PROTO TASK LIST
        // this.drinkTask = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //                     .setOrigin(0.5,0.5)
        //                     .setScale(0.5,0.5)
        //                     .setInteractive({ useHandCursor: true });
        // this.eatTask = this.sleepTask = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //                     .setOrigin(0.5,0.5)
        //                     .setScale(0.5,0.5)
        //                     .setInteractive({ useHandCursor: true });
        // this.relaxTask = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //                     .setOrigin(0.5,0.5)
        //                     .setScale(0.5,0.5)
        //                     .setInteractive({ useHandCursor: true });
        // this.sickTask = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //                     .setOrigin(0.5,0.5)
        //                     .setScale(0.5,0.5)
        //                     .setInteractive({ useHandCursor: true });
        // this.sleepTask = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //                     .setOrigin(0.5,0.5)
        //                     .setScale(0.5,0.5)
        //                     .setInteractive({ useHandCursor: true });
        // this.vomitTask = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //                     .setOrigin(0.5,0.5)
        //                     .setScale(0.5,0.5)
        //                     .setInteractive({ useHandCursor: true });

        // this.protoTaskList = [
        //     this.drinkTask,
        //     this.eatTask,
        //     this.medTask,
        //     this.relaxTask,
        //     this.sickTask,
        //     this.sleepTask,
        //     this.vomitTask
        // ];

        // this.protoTaskList.forEach((elem) => {
        //     elem.active = false;
        //     elem.visible = false;
        // });
        
        // this.taskList = [
            
        //     this.eatTask // 0:40
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.et, { next: this.dt });
        //         }, this),
        //     this.relaxTask // 1:00
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.rt, { next: this.ov });
        //         }, this),
        //     this.sleepTask // 1:20
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.sl, { next: this.ov });
        //         }, this),
        //     this.medTask // 1:40
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.mt, { next: this.et });
        //         }, this),
        //     this.relaxTask // 2:00
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.rt, { next: this.ov });
        //         }, this),
        //     this.sickTask // 2:20
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.si, { next: this.et });
        //         }, this),
        //     this.sleepTask // 2:40
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.sl, { next: this.ov });
        //         }, this),
        //     this.drinkTask // 3:00
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.dt, { next: this.et });
        //         }, this),
        //     this.drinkTask // 3:20
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.dt, { next: this.vt });
        //         }, this),
        //     this.sickTask // 3:40
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.si, { next: this.vt });
        //         }, this),
        //     this.sleepTask // 4:00
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.sl, { next: this.mt });
        //         }, this),
        //     this.eatTask // 4:20
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.et, { next: [ this.si, this.vt ] });
        //         }, this),
        //     this.medTask // 4:40
        //         .on('pointerdown', () => { 
        //             this.scene.sleep(this.ov).start(this.rt, { next: this.dt });
        //         }, this),
            
        // ]

        // this.task0 = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        //             .setOrigin(0.5,0.5)
        //             .setScale(0.5,0.5)
        //             .setInteractive({ useHandCursor: true })
        //             .on('pointerdown', () => { 
        //                 this.scene.sleep(this.ov).start(this.dt, { next: this.ov });
        //             }, this)
        // this.task0.play('task-anim');

        

        // this.taskList = [
        //     this.task0,
        //     this.task1
        // ]
        
        // this.taskList.forEach((elem) => {
        //     elem.active = false;
        //     elem.visible = false;
        // })

        this.startScene = this.dt;
        this.nextScene = this.ov;

        this.taskBtn = this.add.sprite(this.human_body.x, this.human_body.y - 250, 'task-sheet', 0)
        .setOrigin(0.5,0.5)
        .setScale(0.5,0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { 
            this.goToNextScene(this.startScene, this.nextScene);
        }, this);
        this.taskBtn.play('task-anim');
        this.progressCounter = 1;
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
                this.startScene = this.et;
                this.nextScene = this.dt
                
        }
    }

    goToNextScene(start, nextScene) {
        this.scene.sleep(this.ov).start(start, { next: nextScene });
    }
}