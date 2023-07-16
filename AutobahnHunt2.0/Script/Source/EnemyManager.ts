/*namespace Script{

    export class EnemyManager {

        max_enemies: number = 1;
        enemyList: Enemy[] = [];
        enemyTemplate: ƒ.Node;
        currentEnemies: number = 0;
        startPostionScript: ƒ.Component = new RandomEnemySpawn();
        
        constructor(){
            this.enemyTemplate = graph.getChildrenByName("EnemyCar")[0];
        }

        /*public startEnemy() {
            let enemyInstance: Promise<ƒ.GraphInstance>;
            enemyInstance = ƒ.Project.createGraphInstance(
            <ƒ.Graph>ƒ.Project.getResourcesByName("EnemyCar")[0]);

            console.log("enemy spawn : " + enemyInstance);

            enemyInstance.then( element => {
                console.log("enemyManager: " + element);
                let enemyControl = new Enemy(this.currentEnemies.toString(), element);
                element.addChild(enemyControl);
                element.addComponent(this.startPostionScript);

                graph.addChild(element);
                this.enemyList.push(enemyControl);
            });  
        }

        public moveEnemy() {
            this.enemyList.forEach(element => {
                element.move();
            });
        }
    }
}*/