namespace Script {

    // formerly known as Entity, but typescript got a problem with the build process, 
    // that if enemy.ts is above entity the Enemy will be build before Entity - so 
    // the class would be used before its declaration.
    export class AllEntity extends ƒ.Node {

        lives: number = 0;

        constructor(name: string, lives: number = 3) {
            super(name);
            this.lives = lives;
        }

        public getLives(): number {
            return this.lives;
        }

        protected setLives(lives: number) {
            this.lives = lives;
        }
    }
}