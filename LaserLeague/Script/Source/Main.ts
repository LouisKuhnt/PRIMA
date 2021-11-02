namespace LaserLeague {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let graph: ƒ.Node;
  let agent: ƒ.Node;
  let agentSymbol: ƒ.Node;
  let lasers: ƒ.Node[];
  let moveSymbolOfAgent: ƒ.Matrix4x4;
  let deltaTime: number;
  let getAllLasers: ƒ.Node;
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

    agent = graph.getChildrenByName('Agents')[0].getChildrenByName('Agent#1')[0];
    agentSymbol = agent.getChildrenByName('Agent_Symbol')[0];

    getAllLasers = graph.getChildrenByName("Lasers")[0];

    moveSymbolOfAgent = agentSymbol.getComponent(ƒ.ComponentTransform).mtxLocal;

    putLaserOnArena().then(() => {
      lasers = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser");
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    });

    viewport.camera.mtxPivot.translateZ(-20);

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  async function putLaserOnArena(){
    for (let yPos = -1; yPos <= 1; yPos+=2) {
      for (let xPos = -1; xPos <= 1; xPos++) {
        let graphLaser: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-11-02T13:20:08.111Z|45928"];
        let laser: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(graphLaser);
        let laserTranslate: ƒ.Vector3 = new ƒ.Vector3(xPos*8,yPos*3.5,1);
        laser.getComponent(ƒ.ComponentTransform).mtxLocal.mutate({translation: laserTranslate});
        getAllLasers.addChild(laser);
      }
    }
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
    
    moveSymbolOfAgent.rotateZ(1);

    lasers.forEach(laser => {
      let laserBeams: ƒ.Node[] = laser.getChildrenByName("Center")[0].getChildrenByName("Beam");
      laserBeams.forEach(beam => {
        checkCollision(agent, beam);
      });
    });

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function checkCollision (agent: ƒ.Node, beam: ƒ.Node) {
    let distance: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beam.mtxWorldInverse, true);   
    let minX = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + agent.radius;
    let minY = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + agent.radius;
    if (distance.x <= (minX) && distance.x >= -(minX) && distance.y <= minY && distance.y >= 0) {
      console.log("treffer");
    }
  }
}