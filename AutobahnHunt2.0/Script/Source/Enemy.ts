namespace Script {

    export class Enemy extends AllEntity {

        constructor(name: string, lives: number) {
            super(name, lives)
        }

        public decreaseLive() {
            this.lives--;
        }
    }
}