namespace Script {

    export class Enemy extends ƒ.Node{

        speed: number = 0;
        acceleration: number;
        gameSettings: CustomJson;

        constructor(){
            super("Enemy");
            this.loadFile();
        }

        public move() {
            
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["speed"];
            this.acceleration = this.gameSettings["acceleration"];
        }
    }
}