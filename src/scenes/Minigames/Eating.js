
class S_Eating extends Phaser.Scene {
    constructor() {
        super('s_eating');

        this.PLAYER_ACCEL_Y = -900;
        this.PLAYER_MAX_Y = 300;
        this.PLAYER_START_X = game.config.width/4;
        this.PLAYER_START_Y = game.config.height/3;

    }

    preload() {
        this.load.image('plane', './assets/test/test-baby-eating/test-airplane.png');
        this.load.image('wall', './assets/test/test-baby-eating/test-wall.png');
    }

    create() {
        // SCENE SETUP
        this.physics.world.gravity.y = 200;
        this.scrollspeed = 200;
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keySPC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // PLAYER SETTINGS
        this.player = this.physics.add.sprite(this.PLAYER_START_X, this.PLAYER_START_Y, 'plane');
        this.player.body.setMaxVelocity(200, this.PLAYER_MAX_Y);
        this.player.setCollideWorldBounds(false);

        // TOP BOUNDARY
        this.boundsTop = this.physics.add.sprite(0, -24, 'wall').setOrigin(0,0.5).setScale(22,1);
        this.boundsTop.body.immovable = true;
        this.boundsTop.body.allowGravity = false;
        this.physics.add.collider(this.boundsTop, this.player);
        
        // BOTTOM BOUNDARY
        this.boundsBot = this.physics.add.sprite(0, game.config.height+24, 'wall').setOrigin(0,0.5).setScale(22,1);
        this.boundsBot.body.immovable = true;
        this.boundsBot.body.allowGravity = false;
        this.physics.add.collider(this.boundsBot, this.player); 


        // SPAWN WALLS
        this.topHalf = true;
        this.wallSpawnInterval = this.time.addEvent({
            args: [ 
                this.topHalf
            ],
            callback: () => {
                let wallPosition = this.topHalf ? Phaser.Math.Between(game.config.height/10, (4*game.config.height)/10)
                                                : Phaser.Math.Between((6*game.config.height)/10, (9*game.config.height)/10);
                let wall = this.physics.add.sprite(
                    game.config.width + 10, 
                    wallPosition,
                    'wall'
                )
                .setOrigin(0.5,0.5)
                .setScale(1, Phaser.Math.Between(5,10));
                wall.body.immovable = true;
                wall.body.allowGravity = false;
                wall.setVelocityX(-this.scrollspeed);
                this.physics.add.collider(wall, this.player);
                this.topHalf = !this.topHalf;
            },
            callbackScope: this,
            delay: 1700,
            startAt: 1,
            loop: true
        });

        // WALL SCROLL SPEED TIMER
        // this.wallSpeedInterval = this.time.addEvent({
        //     callback: () => {
        //         this.scrollspeed += 50;
        //     },
        //     callbackScope: this,
        //     delay: 30000
        // });

    }

    update() {
        switch (this.keySPC.isDown) {
            case true:
                this.player.body.setAccelerationY(this.PLAYER_ACCEL_Y);
                break;
            default:
                this.player.body.setAccelerationY(0);
        }
        switch (this.player.x < this.PLAYER_START_X) {
            case true:
                this.player.setVelocityX(25);
                break;
            default:
                this.player.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.scene.stop('baby_eating').start('s_overview');
        }
    }
}