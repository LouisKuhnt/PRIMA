namespace Script {
    import ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization
  
    export class PlayerCollisionDetect extends ƒ.ComponentScript {
      // Register the script as component for use in the editor via drag&drop
      public static readonly iSubclass: number = ƒ.Component.registerSubclass(CustomComponentScript);
      // Properties may be mutated by users in the editor via the automatically created user interface
      public message: string = "EnemyCollisionDetect added to ";
  
    
      enemyBody: ƒ.ComponentRigidbody; 

      constructor() {
        super();
        this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.componentAdded);
      }
  
      public componentAdded(): any {
        this.enemyBody = this.node.getComponent(ƒ.ComponentRigidbody);
        this.enemyBody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.collision);
      }

      public collision(): any {
          let playerModel = this.node.getChildrenByName("Player")[0];
          //@ts-ignore
          playerModel.lives--;
          this.node.getParent().dispatchEvent(new Event("collided"));
          //@ts-ignore
          if(playerModel.lives <= 0) {
            this.node.getParent().dispatchEvent(new Event("stopGame"));
          }
      }
    }
  }