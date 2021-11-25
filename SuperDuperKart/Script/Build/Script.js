"use strict";
/*namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class CustomComponentScript extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(CustomComponentScript);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "CustomComponentScript added to ";


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
          //ƒ.Debug.log(this.message, this.getContainer());
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
      }
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}*/ 
var SuperDuperKart;
(function (SuperDuperKart) {
    var ƒ = FudgeCore;
    //import ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let graph;
    let viewport;
    let camera = new ƒ.Node("cameraNode");
    let cmpCamera = new ƒ.ComponentCamera;
    let cart;
    let meshTerrain;
    let mtxTerrain;
    let ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
    ctrForward.setDelay(200);
    let ctrTurn = new ƒ.Control("Turn", 100, 0 /* PROPORTIONAL */);
    ctrTurn.setDelay(50);
    window.addEventListener("load", start);
    async function start(_event) {
        await ƒ.Project.loadResourcesFromHTML();
        graph = ƒ.Project.resources["Graph|2021-11-18T14:33:58.388Z|51314"];
        let cmpMeshTerrain = graph.getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
        meshTerrain = cmpMeshTerrain.mesh;
        mtxTerrain = cmpMeshTerrain.mtxWorld;
        cart = graph.getChildrenByName("Kart")[0];
        cmpCamera.mtxPivot.translation = new ƒ.Vector3(0, 8, -12);
        cmpCamera.mtxPivot.rotation = new ƒ.Vector3(25, 0, 0);
        camera.addComponent(cmpCamera);
        camera.addComponent(new ƒ.ComponentTransform());
        graph.addChild(camera);
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        viewport.calculateTransforms();
        ƒ.AudioManager.default.listenTo(graph);
        ƒ.AudioManager.default.listenWith(graph.getComponent(ƒ.ComponentAudioListener));
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        //console.log(cart.mtxWorld.translation);
        camera.mtxLocal.translation = cart.mtxWorld.translation;
        camera.mtxLocal.rotation = new ƒ.Vector3(0, cart.mtxWorld.rotation.y, 0);
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        let turn = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
        ctrTurn.setInput(turn * deltaTime);
        cart.mtxLocal.rotateY(ctrTurn.getOutput());
        let forward = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
        ctrForward.setInput(forward * deltaTime);
        cart.mtxLocal.translateZ(ctrForward.getOutput());
        let terrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
        cart.mtxLocal.translation = terrainInfo.position;
        cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getZ()), terrainInfo.normal);
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(SuperDuperKart || (SuperDuperKart = {}));
//# sourceMappingURL=Script.js.map