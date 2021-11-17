namespace LaserLeague {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!")

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let graph: ƒ.Node;
  let agent: Agent;
  let lasers: ƒ.Node[];
  let getAllLasers: ƒ.Node;
  let hitSound: ƒ.ComponentAudio;
  let gotHit: ƒ.Audio;
  

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    graph = viewport.getBranch();
    console.log("graph");
    console.log(graph);

    agent = new Agent;
    graph.getChildrenByName("Agents")[0].addChild(agent);

    let domName: HTMLElement = document.querySelector("#hud>input");
    domName.textContent = agent.name;

    getAllLasers = graph.getChildrenByName("Lasers")[0];

    gotHit = new ƒ.Audio("./Sound/hitSound.wav");
    hitSound = new ƒ.ComponentAudio(gotHit, false, false);
    hitSound.volume = 20;

    putLaserOnArena().then(() => {
      lasers = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser");
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    });

    viewport.camera.mtxPivot.translateZ(-20);

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  async function putLaserOnArena() {
    for (let yPos = -1; yPos <= 1; yPos += 2) {
      for (let xPos = -1; xPos <= 1; xPos++) {
        let graphLaser: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-11-02T13:20:08.111Z|45928"];
        let laser: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(graphLaser);
        let laserTranslate: ƒ.Vector3 = new ƒ.Vector3(xPos * 8, yPos * 3.5, 1);
        laser.getComponent(ƒ.ComponentTransform).mtxLocal.mutate({ translation: laserTranslate, });
        getAllLasers.addChild(laser);
      }
    }
  }

  function update(_event: Event): void {
    checkCollision();
    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function checkCollision() {
    let _agent: ƒ.Node = agent.getChildren()[0];

    for (let i = 0; i < getAllLasers.getChildren().length; i++) {

      getAllLasers.getChildren()[i].getChildren()[0].getChildren().forEach(element => {
        let beam: ƒ.Node = element;
        let posLocal: ƒ.Vector3 = ƒ.Vector3.TRANSFORMATION(_agent.mtxWorld.translation, beam.mtxWorldInverse, true);
        let x = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + _agent.radius / 2;
        let y = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + _agent.radius / 2;

        if (posLocal.x <= (x) && posLocal.x >= -(x) && posLocal.y <= y && posLocal.y >= 0) {
          console.log("intersecting");
          hitSound.play(true);
          _agent.getComponent(AgentComponent).respawn();
        }
      });
    }
  }
}