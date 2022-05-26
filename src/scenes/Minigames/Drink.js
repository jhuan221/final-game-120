
class S_DrinkWater extends Phaser.Scene {
    constructor() {
        super('s_drinkwater');
    }

    preload(){
        // water [hold spacebar] game sprite
        this.load.image('water', './assets/drink/water.png');
        this.load.image('water2', './assets/drink/drinking.jpg');
        this.load.image('water3', './assets/drink/almostthere.jpg')
        this.load.image('empty', './assets/drink/empty.png');
    }
    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'MINI-GAME');
        
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // water [hold spacebar] minigame variables
        // sprite, keybind, timer 
       this.fullglass = this.add.sprite (game.config.width/2, game.config.height/2, 'water');
       
        //temp anim (flipping through the different images currently)
        this.drinking = this.add.sprite (game.config.width/2, game.config.height/2, 'water2');
        this.halfway = this.add.sprite (game.config.width/2, game.config.height/2, 'water3');
        this.emptyglass = this.add.sprite (game.config.width/2, game.config.height/2, 'empty');

        //init the other images visibility to false
        this.drinking.visible = false;
        this.halfway.visible = false;
        this.emptyglass.visible = false;
        
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.drinkCounter = 0;
        this.drinkTimer = this.time.addEvent({
            callback: () => {
                console.log('Count: ' + this.drinkCounter);
                this.drinkCounter += 1;
                if (this.drinkCounter % 3 == 0){
                    console.log("change frame");
                    this.fullglass.visible = false;
                    if (this.drinkCounter == 3 ){
                        this.drinking.visible = true;
                    }
                    else if(this.drinkCounter == 6){
                        this.halfway.visible = true;
            
                    }
                    // else if (this.drinkCounter == 9){
                    //     this.emptyglass.visible = true;
                    // }
                }
                if (this.drinkCounter == 10){
                    this.emptyglass.visible = true;
                    console.log("stop");
                    this.time.paused = true;
                    this.done = true;
                }
            },
            delay: 1000,
            loop: true,
            stopAt: 10000,
            paused: true
        });
        this.done = false;
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.scene.stop('baby_drinkwater').start('s_overview');
        }
        // water [hold spacebar] functionality
        this.drinkWater(this.drinkTimer);
        if (this.done){
            this.scene.stop('baby_drinkwater').start('s_overview');
        }
    }

    // player hold spacebar for 10 seconds consectively to drink water
    // if player releases spacebar timer stops 
    drinkWater(dtimer){
        if (Phaser.Input.Keyboard.JustDown(keySp)){
          if (dtimer.paused){
              dtimer.paused = false;
          }
        }
        if (Phaser.Input.Keyboard.JustUp(keySp)){
            dtimer.paused = true;
        }
    }
}