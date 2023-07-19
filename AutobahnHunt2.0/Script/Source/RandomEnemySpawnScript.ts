namespace Script {
    import ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script);

    export class RandomEnemySpawn extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        public static readonly iSubclass: number = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        public message: string = "RandomEnemySpawn added to ";

        private possiblePositions: ƒ.Vector3[] = [
            new ƒ.Vector3(26, 1, 1250),
            new ƒ.Vector3(-26, 1, 1250),
            new ƒ.Vector3(0, 1, 1250)
        ];

        constructor() {
            super();
            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.generateRandomSpawn);
        }
        public generateRandomSpawn(): void {
            let rndNumber = Math.floor(Math.random() * 3);
            this.node.mtxLocal.translate(this.possiblePositions[rndNumber]);
        }
    }
}