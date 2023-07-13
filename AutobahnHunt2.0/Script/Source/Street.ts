namespace Script {
    import ƒ = FudgeCore;

    // Street Node
    export class Street extends ƒ.Node{
        
        acceleration: number;
        gameSettings: CustomJson;
        street: ƒ.Node;
        asphalt: ƒ.Node;
        asphaltSprite: ƒ.ComponentAnimator;
        
        constructor() {
            super("Street");
            // load external file
            this.loadFile();
            this.street = graph.getChildrenByName("Street")[0];
            this.asphalt = this.street.getChildrenByName("Asphalt")[0];
            this.asphaltSprite = this.asphalt.getComponent(ƒ.ComponentAnimator);
        }

        public stopStreet() {
            this.asphaltSprite.playmode = ƒ.ANIMATION_PLAYMODE.STOP;
        }

        public startStreet() {
            this.asphaltSprite.playmode = ƒ.ANIMATION_PLAYMODE.LOOP;
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.acceleration = this.gameSettings["acceleration"]
        }
    }
}