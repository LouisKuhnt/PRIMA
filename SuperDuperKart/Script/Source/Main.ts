namespace SuperDuperKart {
  import ƒ = FudgeCore;
  //import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  let ctrTurn: ƒ.Control = new ƒ.Control("Turn", 100, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrTurn.setDelay(50);

  let cart: ƒ.Node;
  let meshTerrain: ƒ.MeshTerrain;
  let mtxTerrain: ƒ.Matrix4x4;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.calculateTransforms();

    let cmpMeshTerrain: ƒ.ComponentMesh = viewport.getBranch().getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
    meshTerrain = <ƒ.MeshTerrain>cmpMeshTerrain.mesh;
    mtxTerrain = cmpMeshTerrain.mtxWorld;
    cart = viewport.getBranch().getChildrenByName("Kart")[0];

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }


  function update(_event: Event): void {
    let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;

    let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
    ctrTurn.setInput(turn * deltaTime);
    cart.mtxLocal.rotateX(ctrTurn.getOutput());
    
    let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
    ctrForward.setInput(forward * deltaTime);
    cart.mtxLocal.rotateZ(ctrForward.getOutput());

    let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
    cart.mtxLocal.translation = terrainInfo.position;
    cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getY()), terrainInfo.normal);

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /*async function init(_event: Event): Promise<void> {
    await setupScene();

    //ƒAid.addStandardLightComponents(graph);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }*/

  /*async function setupScene(): Promise<void> {
    let coatTexturedMap: ƒ.CoatTextured = new ƒ.CoatTextured();

    let texMap = new ƒ.TextureImage();
    let heightMap = new ƒ.TextureImage();

    texMap.load("../Textures/maptex.png");
    coatTexturedMap.texture = texMap;

    //let terrain: ƒ.Node = graph.getChildrenByName("Terrain")[0];
    //terrain.getComponent(ƒ.ComponentMaterial).material.coat.mutate({coatTexturedMap: texMap,});

    //console.log(terrain.getComponent(ƒ.ComponentMaterial).material);

    let matTex: ƒ.Material = new ƒ.Material("Textured", ƒ.ShaderTexture, coatTexturedMap);
    viewport = new ƒ.Viewport();

    //cmpCamera = createCamera(new ƒ.Vector3(0, 2, 3.5), new ƒ.Vector3(0, 0, 0));

    heightMap = new ƒ.TextureImage();
    await heightMap.load("../Textures/map.png");

    gridMeshFlat = new ƒ.MeshRelief("HeightMap", heightMap);
    gridFlat = createCompleteMeshNode("Grid", matTex, gridMeshFlat);
    // gridMeshFlat.node = gridFlat;
    gridFlat.mtxLocal.translateY(-0.1);
    gridFlat.mtxLocal.scale(new ƒ.Vector3(3, 0.7, 3));

    graph.addChild(gridFlat);
    //viewport.draw();
    viewport.initialize("Viewport", graph, viewport.camera, document.querySelector("canvas"));
    viewport.setFocus(true);
    viewport.draw();
  } */

  /*function createCompleteMeshNode(_name: string, _material: ƒ.Material, _mesh: ƒ.Mesh): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node(_name);

    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(_mesh);
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material);
    let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    node.addComponent(cmpMesh);
    node.addComponent(cmpMaterial);
    node.addComponent(cmpTransform);
    return node;
  }*/

  /*function createCamera(_translation: ƒ.Vector3 = new ƒ.Vector3(1, 1, 10), _lookAt: ƒ.Vector3 = new ƒ.Vector3()): ƒ.ComponentCamera {
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.projectCentral(1, 45, ƒ.FIELD_OF_VIEW.DIAGONAL);
    cmpCamera.mtxPivot.translate(_translation);
    cmpCamera.mtxPivot.lookAt(_lookAt);
    return cmpCamera;
    // camera.addComponent(cmpCamera);
    // camera.addComponent(cmpTransform);
    // // let cmpCamera: ƒ.ComponentCamera = new ƒ.Node("Camera");
    // let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
  }*/
}