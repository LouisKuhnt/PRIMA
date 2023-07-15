namespace Script {

    export class Entity extends ƒ.Node {

        lives: number;

        constructor(name: string, lives: number) {
            super(name);
            this.lives = lives;
            console.log("constructor: " + this.lives);
        }

        protected collision() {
            console.log("hit " + lives);
            lives--;
        }
    }
}