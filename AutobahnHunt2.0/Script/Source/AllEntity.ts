namespace Script {

    // formerly known as Entity, but typescript got a problem with the build process, 
    // that if enemy.ts is above entity the Enemy will be build before Entity - so 
    // the class would be used before its declaration.
    export class AllEntity extends ƒ.Node {

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