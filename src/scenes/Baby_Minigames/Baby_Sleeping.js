
class Baby_Sleeping extends Phaser.Scene {
    constructor() {
        super('baby_sleeping');

        this.SHEEP_START_X = -50;
        this.SHEEP_START_Y = game.config.height-50;
        this.SHEEP_MAXACC_Y = -600;
        this.FENCE_START_X = (2*game.config.width)/3;
        this.CHARGE_THRESHOLD = 600;

    }

    preload() {
        this.load.image('sheep', './assets/test/test-player.png'); // 50 x 50
        this.load.image('ground', './assets/test/test-baby-sleeping/sheep-ground.png'); // 1280 x 50
        this.load.image('fence', './assets/test/test-baby-sleeping/test-fence.png'); // 25 x 250
    }

    create() {
        // SCENE SETUP
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keySPC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // HOLD SPACEBAR TO CHARGE JUMP / LONGER CHARGE = HIGHER JUMP

        // GAME OBJECTS
        this.sheep = this.physics.add.sprite(this.SHEEP_START_X, this.SHEEP_START_Y, 'sheep').setOrigin(0,1);
        this.sheep.setVelocityX(100,0);
        this.sheep.setGravity(0,300);
        this.fence = this.physics.add.sprite(this.FENCE_START_X, game.config.height-50, 'fence').setOrigin(0.5,1);
        this.fence.body.immovable = true;
        this.fence.body.allowGravity = false;
        this.ground = this.physics.add.sprite(game.config.width/2, game.config.height, 'ground').setOrigin(0.5,1);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        
        this.physics.add.collider(this.sheep, this.fence);
        this.physics.add.collider(this.sheep, this.ground);
        
        // GAME LOGIC VARIABLES
        this.successCount = 0;
        this.isCharging = false;
        this.isJump = false;
        this.jumpStartTime;

        // TIMER CONFIGS
        this.failConfig = {
            callback: () => {
                this.sheep.x = this.SHEEP_START_X;
                this.sheep.y = this.SHEEP_START_Y;
                this.keySPC.enabled = true;
                this.sheep.setVelocityX(100,0);
            },
            delay: 500
        };
    }

    update() {
        switch (this.successCount) {
            case 1:
                this.fence.setScale(1,1.7);
                break;
            case 2:
                this.fence.setScale(1,2.25);
                break;
        }
        if (this.keySPC.isDown && this.sheep.body.touching.down) {
            this.isCharging = true;
            this.jumpStartTime = this.keySPC.timeDown;
        }
        if (!this.keySPC.isDown && this.isCharging) {
            let velocity = this.SHEEP_MAXACC_Y * ((this.time.now-this.jumpStartTime)/this.CHARGE_THRESHOLD);
            let vFinal = -velocity < -this.SHEEP_MAXACC_Y ? velocity : this.SHEEP_MAXACC_Y;
            this.sheep.body.setVelocityY(vFinal);
            this.isCharging = false;
            this.timeJump = this.time.addEvent({
                callback: () => {
                    this.isJump = true;
                },
                delay: 200
            });
        }
        if (this.isJump && this.sheep.body.touching.down) {
            this.keySPC.enabled = false;
            if (this.sheep.x < (this.fence.width/2) + this.FENCE_START_X) { 
                    this.fail = this.time.addEvent(this.failConfig);
            }
            this.isJump = false;
        }

        if (!this.isJump && this.sheep.body.touching.right) {
            this.keySPC.enabled = false;
            this.reset = this.time.addEvent(this.failConfig);
        }
        if (this.sheep.x > game.config.width) {
            this.sheep.x = this.SHEEP_START_X;
            this.keySPC.enabled = true;
            this.successCount += 1;
        }
    }
}