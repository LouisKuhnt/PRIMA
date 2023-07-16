namespace Script {

    export let enemyLive: number;

    export class Enemy extends AllEntity{

        speed: number = 0;
        acceleration: number;
        gameSettings: CustomJson;
        enemy: ƒ.GraphInstance;
        enemyBody: ƒ.ComponentRigidbody;
        startPostionScript: ƒ.Component = new RandomEnemySpawn();

        constructor(name: string){
            super(name, 1);
            this.loadFile();
            this.startEnemy();
        }

        public move() {
            if (lives >= 0) {
                this.enemyBody.applyForce(new ƒ.Vector3(0, 0, this.enemy.mtxLocal.getZ().z - 400));
                console.log("is moving");
            }
        }

        public startEnemy() {
            let enemyInstance: Promise<ƒ.GraphInstance>;
            enemyInstance = ƒ.Project.createGraphInstance(
            <ƒ.Graph>ƒ.Project.getResourcesByName("EnemyCar")[0]);

            console.log("enemy spawn : " + enemyInstance);
            enemyInstance.then( element => {
                element.addComponent(this.startPostionScript);
                this.enemy = element;
                this.enemyBody = element.getComponent(ƒ.ComponentRigidbody);

                graph.addChild(element);
            });  
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["speed"];
            this.acceleration = this.gameSettings["acceleration"];
        }
    }
}