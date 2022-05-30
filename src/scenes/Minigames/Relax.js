
class Relax extends Phaser.Scene {
    constructor() {
        super('s_relax');
    }

    preload () {
        this.load.image('background', './assets/Relax/Relax_Background.png');
        this.load.image('still-all', './assets/Relax/Still_All.png');
        this.load.image('move-down', './assets/Relax/Move_Down.png');
        this.load.image('move-left', './assets/Relax/Move_Left.png');
        this.load.image('move-right', './assets/Relax/Move_Right.png');
        this.load.image('move-up', './assets/Relax/Move_Up.png');
        this.load.spritesheet({
            key: 'bird-sheet', 
            url: './assets/Relax/Bird_Dance_Sheet.png',
            frameConfig: {
                frameWidth: 603,
                frameHeight: 479
            }
        });
    }

    create() {
        // GAME SETUP
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0,0);

        // GAME OBJECTS
        this.bird = this.add.sprite( ((7*game.config.width)/10)-50, (4*game.config.height)/10, 'bird-sheet', 0 )
            .setOrigin(0.5, 0.5)
            .setScale(0.5, 0.5);

        this.birdFrame = 0;
        this.birdDanceInterval = this.time.addEvent({
            callback: () => {
                this.birdFrame = (this.birdFrame + 1) % 4;
                this.bird.setFrame(this.birdFrame, false, false);
            },
            delay: 100,
            loop: true
        });
        
        let x = 50;
        let width = 119
        this.leftArrowX = x;
        this.downArrowX = this.leftArrowX + width;
        this.upArrowX = (this.leftArrowX + 2*width) - 8;
        this.rightArrowX = (this.leftArrowX + 3*width) - 15;

        this.still_all = this.add.sprite(x, 100, 'still-all')
            .setOrigin(0, 0.5);

        this.arrowConfig = [
            { 
                id: 'leftArrow', 
                pos: this.leftArrowX, 
                text: 'move-left' 
            },
            { 
                id: 'downArrow', 
                pos: this.downArrowX, 
                text: 'move-down'
            },
            { 
                id: 'rightArrow', 
                pos: this.rightArrowX,
                text: 'move-right' 
            },
            { 
                id: 'upArrow', 
                pos: this.upArrowX,
                text: 'move-up' 
            }
        ];

        this.arrowArray= [];

        this.arrowSpawnInterval = this.time.addEvent({
            callback: () => {
                let index = Math.floor(Phaser.Math.Between(0,3));
                let arrow = this.add.sprite(
                    this.arrowConfig[index].pos, 
                    Phaser.Math.Between(game.config.height + 25, game.config.height + 120), 
                    this.arrowConfig[index].text
                    )
                    .setOrigin(0,0.5);
                this.arrowArray.push(
                    {
                        id: this.arrowConfig[index].id,
                        obj: arrow
                    }
                );
            },
            delay: 500,
            loop: true
        });

        // GAME CONTROLS
        keyLt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // GAME VARIABLES
        this.score = 0;
    }

    update() {
        for (let i = 0; i < this.arrowArray.length; i += 1) {
            this.arrowArray[i].obj.y -= 3;
            
            if (this.arrowArray[i].obj.y < -100) {
                this.arrowArray.splice(i, 1);
            }

            if (this.arrowArray[i].obj.y < 150 && 
                this.arrowArray[i].obj.y > 25) {
                    if (this.arrowArray[i].id == 'leftArrow' &&
                        Phaser.Input.Keyboard.JustDown(keyLt)) {
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }

                    if (this.arrowArray[i].id == 'rightArrow' &&
                        Phaser.Input.Keyboard.JustDown(keyRt)) {
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }

                    if (this.arrowArray[i].id == 'upArrow' && 
                        Phaser.Input.Keyboard.JustDown(keyUp)) {
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }

                    if (this.arrowArray[i].id == 'downArrow' &&
                        Phaser.Input.Keyboard.JustDown(keyDn)) {
                            this.arrowArray[i].obj.visible = false;
                            this.arrowArray.splice(i, 1);
                            this.score += 1;
                    }
            }
        }
        

        if (this.score >= 30) {
            console.log("complete");
        }
    }
}