namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let graph, agentSymbol, laser, beams, testSymbol: ƒ.Node;
  let agent: ƒ.Node;
  let lasers: ƒ.Node;
  let moveLaserBeams: ƒ.Matrix4x4;
  let moveSymbolOfAgent: ƒ.Matrix4x4;
  let deltaTime: number;
  let posLocal: ƒ.Vector3;
  let counter: number = 1;
  const speedLaserRotate: number = 360;
  const speedAgentTranslation: number = 10;
  const speedAgentRotation: number = 360;

  let ctrForward: ƒ.Control = new ƒ.Control("Forward", speedAgentTranslation, ƒ.CONTROL_TYPE.PROPORTIONAL);
  let ctrRotation: ƒ.Control = new ƒ.Control("Rotate", speedAgentRotation, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrRotation.setDelay(100);
  ctrForward.setDelay(200);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    graph = viewport.getBranch();
    console.log("graph");
    console.log(graph);

    testSymbol = graph.getChildrenByName("Arena")[0].getChildrenByName("Test_Stuff")[0];
    lasers = graph.getChildrenByName("Lasers")[0];
    laser = lasers.getChildrenByName("Laser#1")[0].getChildrenByName("Center")[0];
    agent = graph.getChildrenByName('Agents')[0].getChildrenByName('Agent#1')[0];
    agentSymbol = agent.getChildrenByName('Agent_Symbol')[0];

    moveLaserBeams = laser.getComponent(ƒ.ComponentTransform).mtxLocal;
    moveSymbolOfAgent = agentSymbol.getComponent(ƒ.ComponentTransform).mtxLocal;

    viewport.camera.mtxPivot.translateZ(-20);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    deltaTime = ƒ.Loop.timeFrameReal / 1000;
    // ƒ.Physics.world.simulate();  // if physics is included and used

    let ctrlDelayForwardandBackward: number = (
      ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
      + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])
    );

    let ctrlDelayRotate: number = (
      ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
      + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])
    );

    ctrForward.setInput(ctrlDelayForwardandBackward * deltaTime);
    agent.mtxLocal.translateY(ctrForward.getOutput());

    ctrRotation.setInput(ctrlDelayRotate * deltaTime);
    agent.mtxLocal.rotateZ(ctrRotation.getOutput());
      
    moveLaserBeams.rotateZ(speedLaserRotate * deltaTime);
    moveSymbolOfAgent.rotateZ(1);

      checkCollision();

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function checkCollision(): void {
    testSymbol.activate(false);
    //console.log("pls help im fucking stupid");
    beams = lasers.getChildrenByName("Laser#1")[0].getChildrenByName("Center")[0].getChildren()[2];
    //console.log("Beams: "+ beams.mtxWorldInverse.toString());
    //console.log("Beams:");
    //console.log(beams);
    posLocal = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beams.mtxWorldInverse, true);
    console.log(posLocal.toString());

    if((posLocal.x <= 0.1 && posLocal.x >= -0.1) && (posLocal.y <= 4 && posLocal.y >= -4))
      console.log("tot");

    if((posLocal.x <= 4 && posLocal.x >= -4) && (posLocal.y <= 0.1 && posLocal.y >= -0.1))
      console.log("tot");
  }
}