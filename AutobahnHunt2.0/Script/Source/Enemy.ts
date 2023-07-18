namespace Script {

    export class Enemy extends AllEntity{

        speed: number = 0;
        gameSettings: CustomJson;
        enemy: ƒ.GraphInstance;
        enemyBody: ƒ.ComponentRigidbody;
        enemy_lives: number = 1;
        startPostionScript: ƒ.Component = new RandomEnemySpawn();

        constructor(name: string){
            super(name, 1);
            this.loadFile();
            this.startEnemy();
        }

        public move() {
            if(this.enemy_lives != this.getLives()) {
                this.decreaseLives()
            }

            if (this.getLives() >= 0) {
                this.enemyBody.applyForce(new ƒ.Vector3(0, 0, this.enemy.mtxLocal.getZ().z - this.speed));
            }
        }

        public startEnemy() {
            let enemyInstance: Promise<ƒ.GraphInstance>;
            enemyInstance = ƒ.Project.createGraphInstance(
            <ƒ.Graph>ƒ.Project.getResourcesByName("EnemyCar")[0]);

            enemyInstance.then( element => {
                element.addComponent(this.startPostionScript);
                this.enemy = element;
                this.enemyBody = element.getComponent(ƒ.ComponentRigidbody);

                graph.addChild(element);
                this.enemyBody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_EXIT, this.collision);
            });  
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["enemy_speed"];
        }

        private collision(_event: ƒ.EventPhysics) {
            console.log("collision_enemy: " + _event.cmpRigidbody.node.name);
            //console.log("myself: " + _event.);
        }

        // Wand am ende der Fahrbahn erstellen, um die enemys mit collision zu deaktivieren
        // Crash Sound hinzufügen
        // CustomEvents siehe https://github.com/jankefyn/Prima/blob/main/Archero/Script/Source/Main.ts
        // -> Idee wäre vielleicht leben so zurückgeben
    }
}