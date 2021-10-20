namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let graph, agentSymbol, laser, agent: ƒ.Node;
  let moveLaserBeams: ƒ.Matrix4x4;
  let moveSymbolOfAgent: ƒ.Matrix4x4;
  let deltaTime: number;
  const speedLaserRotate: number = 360;
  const speedAgentTranslation: number = 10;
  const speedAgentRotation: number = 360;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    graph = viewport.getBranch();
    console.log("graph");
    console.log(graph);

    laser = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser#1")[0].getChildrenByName("Center")[0];
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
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
      agent.mtxLocal.translateY(speedAgentTranslation * deltaTime);
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
      agent.mtxLocal.translateY(-speedAgentTranslation * deltaTime);
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]))
      agent.mtxLocal.rotateZ(speedAgentRotation * deltaTime);
    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
      agent.mtxLocal.rotateZ(-speedAgentRotation * deltaTime);

    moveLaserBeams.rotateZ(speedLaserRotate * deltaTime);
    moveSymbolOfAgent.rotateZ(1);

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}