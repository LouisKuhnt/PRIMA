namespace Script {
    export let LIVES: number = 3;

    export class Player extends ƒ.Node{
        speed: number = 0;
        MAX_SPEED: number;
        acceleration: number;
        ctrForward: ƒ.Control;
        ctrTurn: ƒ.Control;

        gameSettings: CustomJson;

        constructor() {
            super("Player");
            // load external config
            this.loadFile();

            this.ctrForward = new ƒ.Control("Forward", this.speed * this.acceleration, ƒ.CONTROL_TYPE.PROPORTIONAL);
            this.ctrForward.setDelay(200);
            this.ctrTurn = new ƒ.Control("Turn", 150, ƒ.CONTROL_TYPE.PROPORTIONAL);
            this.ctrTurn.setDelay(300);

            // potenzielle rigid body Verbesserung
        }

        public move(){
            let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            this.ctrTurn.setInput(turn);
            // RigidBody
            // body.applyTorque(ƒ.Vector3.SCALE(cart.mtxLocal.getY(), this.ctrTurn.getOutput()));
            
            let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
            this.ctrForward.setInput(forward);
            // body.applyForce(ƒ.Vector3.SCALE(player.mtxLocal.getZ(), this.ctrForward.getOutput()));
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["speed"];
            this.acceleration = this.gameSettings["acceleration"];
        }
    }
}