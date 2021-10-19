namespace Script {
  import f = FudgeCore;
  f.Debug.info("Main Program Template running!")

  let viewport: f.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let transform: f.Matrix4x4;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    let graph: f.Node = viewport.getBranch();
    let laser: f.Node = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser")[0];
    transform = laser.getComponent(f.ComponentTransform).mtxLocal;
  }

  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    transform.rotateZ(6);
    viewport.draw();
    f.AudioManager.default.update();
  }
}