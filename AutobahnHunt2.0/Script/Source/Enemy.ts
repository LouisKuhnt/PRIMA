namespace Script {

    export let enemyLive: number;

    export class Enemy extends Entity{

        speed: number = 0;
        acceleration: number;
        gameSettings: CustomJson;
        enemy: ƒ.Node;

        constructor(name: string){
            super(name, 1);
            this.loadFile();
        }

        public move() {
            if (lives <= 0) {
                
            }
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["speed"];
            this.acceleration = this.gameSettings["acceleration"];
        }
    }
}