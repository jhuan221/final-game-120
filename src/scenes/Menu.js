// Menu Scene 
class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // menu text config
        // let menuConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5, 
        //     },
        //     fixedWidth: 0
        // }
        // temp text
        this.add.text(20, 20, 'final game');

        // define key
        keySp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        console.log('this is menu');
        if (Phaser.Input.Keyboard.JustDown(keySp)){
            this.scene.start('worldScene');
        }
    }
}