namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  window.addEventListener("load", setup);
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  export let graph: ƒ.Node = new ƒ.Node("Graph");
  let gridMeshFlat: ƒ.MeshTerrain;
  let gridFlat: ƒ.Node;
  //let cmpCamera: ƒ.ComponentCamera;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    setup(_event).then(() => {
      console.log("Done loading");
    })
  }

  function update(_event: Event): void {
    viewport.draw();
    // ƒ.Physics.world.simulate();  // if physics is included and used
  }

  async function setup(_event: Event): Promise<void> {
    await setupScene();
    
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    
    ƒAid.addStandardLightComponents(graph);
  }

  async function setupScene(): Promise<void> {

    let coatTexturedMap: ƒ.CoatTextured = new ƒ.CoatTextured();

    let texMap = new ƒ.TextureImage();
    let heightMap = new ƒ.TextureImage();

    texMap.load("../Textures/maptex.png");
    coatTexturedMap.texture = texMap;

    let terrain: ƒ.Node = graph.getChildrenByName("Terrain")[0];
    //terrain.getComponent(ƒ.ComponentMaterial).material.coat.mutate({coat: texMap,});

    console.log(terrain.getComponent(ƒ.ComponentMaterial).material);

    let matTex: ƒ.Material = terrain.getComponent(ƒ.ComponentMaterial).material;
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

    viewport.initialize("Viewport", graph, viewport.camera, document.querySelector("canvas"));
    viewport.setFocus(true);
    viewport.draw();
  } 

  function createCompleteMeshNode(_name: string, _material: ƒ.Material, _mesh: ƒ.Mesh): ƒ.Node {
    let node: ƒ.Node = new ƒ.Node(_name);

    let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(_mesh);
    let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material);
    let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    node.addComponent(cmpMesh);
    node.addComponent(cmpMaterial);
    node.addComponent(cmpTransform);
    return node;
  }

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