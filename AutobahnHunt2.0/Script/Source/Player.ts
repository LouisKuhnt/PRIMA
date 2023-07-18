namespace Script{

    export let player_lives: number;

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
            this.body.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.collision);
        }

        public move(){
            if(player_lives != this.getLives()) {
                this.decreaseLives();
            }
            
            let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            this.ctrTurn.setInput(turn);
            // this.body.applyTorque(ƒ.Vector3.SCALE(this.player.mtxLocal.getX(), this.ctrTurn.getOutput()));
            // this.player.mtxLocal.translate(new ƒ.Vector3(0 ,0 , this.player.mtxLocal.getZ().z));
            // this.transform.transform(ƒ.Vector3.SCALE(this.player.mtxLocal.getZ(), this.ctrTurn.getOutput()), null,this.player)
            
            if(turn == -1 && this.positionX >= -25) {
                //console.log("rechts")
                this.newCoordinates = new ƒ.Vector3(this.acceleration_right, 0, 0);
                this.transform.mtxLocal.translate(this.newCoordinates);
                this.positionX--;
                //console.log("Rechts: X" + this.player.mtxLocal.getX() + " Y " + this.player.mtxLocal.getY() + " Z " + this.player.mtxLocal.getZ())
                //console.log("pos. rechts: " + this.newCoordinates)
                //this.player.mtxLocal.translate(ƒ.Vector3.ZERO());
            } else if(turn == 1 && this.positionX <= 25){
                //console.log("links")
                this.newCoordinates = new ƒ.Vector3(this.acceleration_left, 0, 0);
                this.transform.mtxLocal.translate(this.newCoordinates);
                this.positionX++;
                //console.log("Links: X" + this.player.mtxLocal.getX() + " Y " + this.player.mtxLocal.getY() + " Z " + this.player.mtxLocal.getZ())
                //console.log("pos. links: " + this.newCoordinates)
                //this.player.mtxLocal.translate(this.newCoordinates);
            } else {
                //this.player.mtxLocal.translate(ƒ.Vector3.ZERO());
                //this.transform.mtxLocal.translate(ƒ.Vector3.ZERO());
                // console.log(this.player.mtxWorld.getX().x);
            }
        }

        private async collision() {
            player_lives--;
            console.log("collision : " + player_lives);
            if(player_lives <= 0) {
                console.log("dead");
                this.dispatchEvent(new Event("stopGame", {bubbles: true}));
            }
            //sound abspielen
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.setLives(this.gameSettings["player_lives"]);
            player_lives = this.getLives();
            this.acceleration_left = this.gameSettings["acceleration_left"];
            this.acceleration_right = this.gameSettings["acceleration_right"];
        }
    }
}