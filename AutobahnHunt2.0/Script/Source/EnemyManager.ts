namespace Script {

    export class EnemyManager{

        speed: number = 0;
        gameSettings: CustomJson;
        spawn_interval: number = 0;
        enemyList: ƒ.GraphInstance[] = [];
        isSpawned: boolean = false;
        startPostionScript: ƒ.Component = new RandomEnemySpawn();
        collisionDetect: ƒ.Component = new EnemyCollisionDetect();
        randomColor: string[] = ["EnemyCar_Color_0.png", "EnemyCar_Color_1.png", "EnemyCar_Color_2.png", "EnemyCar_Color_3.png", "EnemyCar_Color_4.png"];

        constructor(){
            this.loadFile();
        }

        public checkLives() {
            this.enemyList.forEach(enemy => {
                let enemyChild: ƒ.Node = enemy.getChildrenByName("Enemy")[0];
                //@ts-ignore
                if(enemyChild.getLives() <= 0){
                    this.enemyList.splice(this.enemyList.indexOf(enemy), 1);
                    graph.removeChild(enemy);
                }
            });
        }

        public move() {
            this.enemyList.forEach(enemy => {
                enemy.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(0, 0, enemy.mtxLocal.getZ().z - this.speed));
            });
        }

        public startEnemy() {
            let enemyInstance: Promise<ƒ.GraphInstance>;
            enemyInstance = ƒ.Project.createGraphInstance(
            <ƒ.Graph>ƒ.Project.getResourcesByName("EnemyCar")[0]);

            enemyInstance.then( element => {
                element.addComponent(this.startPostionScript);
                element.addComponent(this.collisionDetect);
                element.addChild(new Enemy("Enemy", 1));
                let chassisChild = element.getChildrenByName("LowerChassis")[0];
                let chassisMaterial = chassisChild.getComponent(ƒ.ComponentMaterial);
                chassisChild.removeComponent(chassisMaterial);

                let mtrEnemy: ƒ.Material = 
                new ƒ.Material("something", ƒ.ShaderFlatTextured, 
                new ƒ.CoatRemissiveTextured(new ƒ.Color(255,255,255,255), 
                new ƒ.TextureImage(this.getRandomColor())));

                chassisChild.addComponent(new ƒ.ComponentMaterial(mtrEnemy));
                
                this.enemyList.push(element);
                graph.addChild(element);
            });  
        }

        async loadFile(): Promise<void> {
            let file: Response = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["enemy_speed"];
            this.spawn_interval = this.gameSettings["spawn_interval"];
        }

        private getRandomColor(): string {
            let enemyColor = this.randomColor[Math.floor(Math.random() * 5)];
            return ".\\Assets\\" + enemyColor;
        }

        public spawnEnemy(spawnTime: number) {
            if((spawnTime%this.spawn_interval == 0) && !this.isSpawned) {
              this.startEnemy();
              this.isSpawned = true;
            }

            if(spawnTime%this.spawn_interval == 1) {
                this.isSpawned = false;
            }
        }
    }
}