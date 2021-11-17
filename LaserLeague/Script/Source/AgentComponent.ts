namespace LaserLeague {
    import ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague);  // Register the namespace to FUDGE for serialization
  
    export class AgentComponent extends ƒ.ComponentScript {
      // Register the script as component for use in the editor via drag&drop
      public static readonly iSubclass: number = ƒ.Component.registerSubclass(AgentComponent);
      // Properties may be mutated by users in the editor via the automatically created user interface
      public message: string = "AgentComponent added to ";

      public ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
      public ctrRotation: ƒ.Control = new ƒ.Control("Rotate", 360, ƒ.CONTROL_TYPE.PROPORTIONAL);
  
      constructor() {
        super();

        this.ctrRotation.setDelay(100);
        this.ctrForward.setDelay(200);
  
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

      public update = (_event: Event) => {
        this.movement(_event);
      }

      public movement = (_event: Event): void => {
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        // ƒ.Physics.world.simulate();  // if physics is included and used

        let ctrlDelayForwardandBackward: number = (
          ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
          + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
        );

        let ctrlDelayRotate: number = (
          ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
          + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
        );

        this.ctrForward.setInput(ctrlDelayForwardandBackward * deltaTime);
        this.node.mtxLocal.translateY(this.ctrForward.getOutput());

        this.ctrRotation.setInput(ctrlDelayRotate * deltaTime);
        this.node.mtxLocal.rotateZ(this.ctrRotation.getOutput());
      }

      public respawn = (): void =>{
        this.node.mtxLocal.translation = new ƒ.Vector3(5,0,0.2);
        this.ctrForward.setInput(0);
        this.ctrRotation.setInput(0);
        this.node.mtxLocal.rotation = new ƒ.Vector3(0,0,0);
      }
  
      // protected reduceMutator(_mutator: ƒ.Mutator): void {
      //   // delete properties that should not be mutated
      //   // undefined properties and private fields (#) will not be included by default
      // }
    }
  }