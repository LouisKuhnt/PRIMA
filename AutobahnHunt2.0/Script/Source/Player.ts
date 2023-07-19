namespace Script{

    export class Player extends AllEntity{
        
        acceleration_left: number;
        acceleration_right: number;
        player: ƒ.Node;
        ctrTurn: ƒ.Control = new ƒ.Control("Turn", 150, ƒ.CONTROL_TYPE.PROPORTIONAL);
        body: ƒ.ComponentRigidbody;
        transform: ƒ.ComponentTransform;
        newCoordinates: ƒ.Vector3;
        positionX: number = 0;

        gameSettings: CustomJson;

        constructor() {
            super("Player", 3);
            // load external config
            this.loadFile();
            this.player = graph.getChildrenByName("PlayerCar")[0];
            this.body = this.player.getComponent(ƒ.ComponentRigidbody);
            this.transform = this.player.getComponent(ƒ.ComponentTransform);
        }

        public move(){
            
            let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            this.ctrTurn.setInput(turn);
            
            if(turn == -1 && this.positionX >= -25) {
                this.newCoordinates = new ƒ.Vector3(this.acceleration_right, 0, 0);
                this.transform.mtxLocal.translate(this.newCoordinates);
                this.positionX--;
            } else if(turn == 1 && this.positionX <= 25){
                this.newCoordinates = new ƒ.Vector3(this.acceleration_left, 0, 0);
                this.transform.mtxLocal.translate(this.newCoordinates);
                this.positionX++;
            }
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.setLives(this.gameSettings["player_lives"]);
            this.acceleration_left = this.gameSettings["acceleration_left"];
            this.acceleration_right = this.gameSettings["acceleration_right"];
        }
    }
}