namespace Script {
  import ƒ = FudgeCore;

  let cameraNode: ƒ.Node;
  export let graph: ƒ.Node;
  export let viewport: ƒ.Viewport;
  export let limit_z: number = 300;
  export let limit_x: number = 100;
  export let ui: VisualInterface;
  export let streetControl: Street;
  export let playerControl: Player;

  let playerModel: ƒ.Node;
  let streetModel: ƒ.Node;

  ƒ.Debug.info("Main Program Template running!");

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {

    viewport = _event.detail;
    graph = viewport.getBranch();

    setCamera();



    playerModel = graph.getChildrenByName("PlayerCar")[0];
    console.log("Player");
    console.log(playerModel);
    playerControl = new Player();
    playerModel.addChild(playerControl);

    streetModel = graph.getChildrenByName("Street")[0];
    console.log("Street");
    console.log(streetModel);
    streetControl = new Street();
    streetModel.addChild(streetControl)
    //streetControl.setStreets(streetModel);

    ui = new VisualInterface();
    ui.highscore = 0;
    ui.lives = 3;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    playerControl.move();
    viewport.draw();
    //ƒ.AudioManager.default.update();
  }

  function setCamera(): void {
    cameraNode = new ƒ.Node("camNode");
    let cameraComponent: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    //let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    viewport.camera = cameraComponent;
    //viewport.camera.projectCentral(canvas.clientWidth / canvas.clientHeight, 5);
    viewport.camera.mtxPivot.rotateX(10);
    viewport.camera.mtxPivot.translateZ(-340);
    viewport.camera.mtxPivot.translateY(30);
    viewport.camera.mtxPivot.translateX(0);
    cameraNode.addComponent(cameraComponent);
  }
}