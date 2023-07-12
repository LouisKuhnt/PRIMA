namespace Script {

    export let MAX_TILES: number = 5;
    export let MAX_ENEMIES: number = 4;
    export let STREET_POSITION: number = 150;

    // Street Node
    export class Street extends ƒ.Node{
        
        multiplikator: number;
        streets: [ƒ.Node];
        
        gameSettings: CustomJson;
        
        constructor() {
            super("Street");
            // load external file
            this.loadFile();
        }

        public setStreets() {
            /*if(streetModel != null) {
                this.streets.push(streetModel);
            }

            console.log("Übertragenes StreetModel: " + streetModel);
            for(let i = this.streets.length; i <= MAX_TILES; i++) {
                if (streetModel != null) {
                    console.log(streetModel.mtxWorld);
                    // graph.addChild(streetModel);
                }
                else {

                }
            }*/
        }

        public deleteLastStreet(){
            //array pop für das letzte objekt
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.multiplikator = this.gameSettings["score_multiplicator"]
        }
    }
}