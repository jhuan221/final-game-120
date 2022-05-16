
class S_Minigame extends Phaser.Scene {
    constructor() {
        super('s_minigame');
    }

    preload(){
        // water [hold spacebar] game sprite
        this.load.image('water', './assets/drink/water.png');
    }
    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'MINI-GAME');
        
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // water [hold spacebar] minigame variables
        // sprite, keybind, timer 
        this.add.sprite (game.config.width/2, game.config.height/2, 'water');
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.drinkCounter = 0;
        this.drinkTimer = this.time.addEvent({
            callback: () => {
                console.log('Count: ' + this.drinkCounter);
                this.drinkCounter += 1;
                if (this.drinkCounter % 3 == 0){
                    console.log("change frame");
                }
                if (this.drinkCounter == 11){
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
            this.scene.stop('s_minigame').start('s_overview');
        }
        // water [hold spacebar] functionality
        this.drinkWater(this.drinkTimer);
        if (this.done){
            this.scene.stop('s_minigame').start('s_overview');
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