namespace LaserLeague {
    import ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague);  // Register the namespace to FUDGE for serialization
  
    export class CollisionDetection extends ƒ.ComponentScript {
      // Register the script as component for use in the editor via drag&drop
      public static readonly iSubclass: number = ƒ.Component.registerSubclass(CollisionDetection);
      // Properties may be mutated by users in the editor via the automatically created user interface
      public message: string = "CollisionDetection added to ";
  
      constructor() {
        super();
  
        // Don't start when running in editor
        if (ƒ.Project.mode == ƒ.MODE.EDITOR)
          return;
  
        // Listen to this component being added to or removed from a node
        this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
        this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      }
  
      // Activate the functions of this component as response to events
      public hndEvent = (_event: Event) => {
        switch (_event.type) {
          case ƒ.EVENT.COMPONENT_ADD:
            ƒ.Debug.log(this.message, this.node);
            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
            break;
          case ƒ.EVENT.COMPONENT_REMOVE:
            this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
            this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
            break;
        }
      }

      public update = (_event: Event): void =>{
        
      }
  
      /*public checkCollision (agent: ƒ.Node, laserbeam: ƒ.Node) {
        let distance: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, laserbeam.mtxWorldInverse, true);   
        let minX = laserbeam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + agent.radius;
        let minY = laserbeam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + agent.radius;
        if (distance.x <= (minX) && distance.x >= -(minX) && distance.y <= minY && distance.y >= 0) {
          console.log("treffer");
        }
      }*/

      // protected reduceMutator(_mutator: ƒ.Mutator): void {
      //   // delete properties that should not be mutated
      //   // undefined properties and private fields (#) will not be included by default
      // }
    }
  }