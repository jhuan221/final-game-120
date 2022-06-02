
class Overview extends Phaser.Scene {
    constructor() {
        super('s_overview');

        this.HEALTH = 0;
        this.progressCounter = 0;
        this.gamestart = false;
        this.BG_Audio;
    }

    init(data) {
        this.progressCounter += data.pg ? data.pg : 0;
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
        this.load.spritesheet({
            key: 'hospital-sheet',
            url: './assets/animations/final_anim/final.png',
            frameConfig: {
                frameWidth: 120,
                frameHeight: 85
            }
        });
        this.load.spritesheet({
            key: 'mainHealthBar-sheet',
            url: './assets/Health_Bar_Sheet.png',
            frameConfig: {
                frameWidth: 399,
                frameHeight: 29
            }
        });
    }

    create() {
        this.sceneTracker = this.ov;
        this.critical = false;
        
        if (!this.gamestart && !this.sound.locked) {
            this.BG_Audio = this.sound.add(
                'heartbeat', 
                { 
                    volume: 0.2,
                    loop: true
                }
            );
            this.BG_Audio.play();
            this.gamestart = true;
        }
        
        // ANIMATIONS
        this.anims.create({
            key: 'task-anim',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('task-sheet', { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({
            key: 'hospital-anim',
            frameRate: 24,
            frames: this.anims.generateFrameNumbers('hospital-sheet', { start: 0, end: 4 }),
            repeat: -1
        });

        this.human_body = this.add.sprite(game.config.width/2, game.config.height/2, 'human-body');
        this.healthbar = this.add.sprite(this.human_body.x, this.human_body.y + 250, 'mainHealthBar-sheet', game.config.HEALTH).setOrigin(0.5, 0.5);
        
        this.healthCritical = this.time.addEvent({
            callback: () => {
                this.healthbar.visible = !this.healthbar.visible;
            },
            delay: 250,
            loop: true,
            paused: true
        });

        this.healthTime = this.time.addEvent({
            callback: () => {
                game.config.HEALTH += 1;
            },
            delay: 16600,
            loop: true
        });

        this.hospitalAnim = this.add.sprite(game.config.width, 0, 'hospital-sheet', 0).setOrigin(1, 0);
        this.hospitalAnim.play('hospital-anim');
        this.hospitalAnim.visible = false;

        // PROTO SCENE LIST
        this.ov = 's_overview',
        this.dt = 's_drinkwater',
        this.et = 's_eating',
        this.mt = 's_medicine',
        this.rt = 's_relax',
        this.si = 's_sickness',
        this.sl = 's_sleeping',
        this.vt = 's_vomiting'

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
                this.goToNextScene(this.startScene, this.nextScene, this.nextScene2, this.BG_Audio);
            }, this);
        this.taskBtn.play('task-anim');
        
    }

    update() {
        if (game.config.GRADER)
            this.healthTime.paused = true;
        if (game.config.INGAME)
            this.input.activePointer.enabled = false;
            
        if (game.config.HEALTH < 18)
            this.healthbar.setFrame(game.config.HEALTH, false, false);
        if (game.config.HEALTH == 17) 
            this.healthCritical.paused = false;
        if (game.config.HEALTH > 17) {
            this.BG_Audio.stop();
            data.music.play();
            this.scene.start('s_gameover');
        }
            
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
                this.muteAudio = true;
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
                this.hospitalAnim.visible = true;
                this.taskBtn.x = this.human_body.x;
                this.taskBtn.y = this.human_body.y - 100;
                this.startScene = 's_final';
                break;
        }
    }

    goToNextScene(start, nextScene, nextScene2) {
        game.config.INGAME = true;
        this.taskBtn.visible = false;
        this.taskBtn.active = false;
        this.scene.launch(start, { 
            next: nextScene, 
            next2: nextScene2,
            pg: 1, 
            music: this.BG_Audio,
            inScene: true
        });
    }
}