namespace Script {

    export class Enemy extends AllEntity{

        speed: number = 0;
        gameSettings: CustomJson;
        enemy_lives: number = 1;
        enemyList: ƒ.GraphInstance[] = [];
        startPostionScript: ƒ.Component = new RandomEnemySpawn();
        collisionDetect: ƒ.Component = new EnemyCollisionDetect();
        randomColor: string[] = ["EnemyCar_Color_0.png", "EnemyCar_Color_1.png", "EnemyCar_Color_2.png", "EnemyCar_Color_3.png", "EnemyCar_Color_4.png"];

        constructor(name: string){
            super(name, 1);
            this.loadFile();
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
        }

        private getRandomColor(): string {
            let enemyColor = this.randomColor[Math.floor(Math.random() * 5)];
            return ".\\Assets\\" + enemyColor;
        }

        // Wand am ende der Fahrbahn erstellen, um die enemys mit collision zu deaktivieren
        // Crash Sound hinzufügen
        // CustomEvents siehe https://github.com/jankefyn/Prima/blob/main/Archero/Script/Source/Main.ts
        // -> Idee wäre vielleicht leben so zurückgeben
    }
}