namespace SuperDuperKart {
  import ƒ = FudgeCore;
  //import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!")

  let graph: ƒ.Graph;
  let viewport: ƒ.Viewport;
  let camera: ƒ.Node = new ƒ.Node("cameraNode");
  let cmpCamera = new ƒ.ComponentCamera;
  let cart: ƒ.Node;
  let meshTerrain: ƒ.MeshTerrain;
  let mtxTerrain: ƒ.Matrix4x4;

  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  let ctrTurn: ƒ.Control = new ƒ.Control("Turn", 100, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrTurn.setDelay(50);

  window.addEventListener("load", start);

  async function start(_event: Event): Promise<void> {

    await ƒ.Project.loadResourcesFromHTML();
    graph = <ƒ.Graph>ƒ.Project.resources["Graph|2021-11-18T14:33:58.388Z|51314"];

    let cmpMeshTerrain: ƒ.ComponentMesh = graph.getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
    meshTerrain = <ƒ.MeshTerrain>cmpMeshTerrain.mesh;
    mtxTerrain = cmpMeshTerrain.mtxWorld;
    cart = graph.getChildrenByName("Kart")[0];

    cmpCamera.mtxPivot.translation = new ƒ.Vector3(0,8,-12);
    cmpCamera.mtxPivot.rotation = new ƒ.Vector3(25,0,0);

    camera.addComponent(cmpCamera);
    camera.addComponent(new ƒ.ComponentTransform());
    graph.addChild(camera);

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);

    viewport.calculateTransforms();

    ƒ.AudioManager.default.listenTo(graph);
    ƒ.AudioManager.default.listenWith(graph.getComponent(ƒ.ComponentAudioListener));

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }


  function update(_event: Event): void {
    //console.log(cart.mtxWorld.translation);
    camera.mtxLocal.translation = cart.mtxWorld.translation;
    camera.mtxLocal.rotation = new ƒ.Vector3(0, cart.mtxWorld.rotation.y, 0);

    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;

    let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
    ctrTurn.setInput(turn * deltaTime);
    cart.mtxLocal.rotateY(ctrTurn.getOutput());
    
    let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
    ctrForward.setInput(forward * deltaTime);
    cart.mtxLocal.translateZ(ctrForward.getOutput());

    let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
    cart.mtxLocal.translation = terrainInfo.position;
    cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getZ()), terrainInfo.normal);

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}