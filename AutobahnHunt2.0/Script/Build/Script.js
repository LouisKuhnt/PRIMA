var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var cameraNode;
    var playerModel;
    ƒ.Debug.info("Main Program Template running!");
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        Script.limit_x = 100;
        Script.limit_z = 300;
        Script.viewport = _event.detail;
        Script.graph = Script.viewport.getBranch();
        //Camera settings
        playerModel = Script.graph.getChildrenByName("PlayerCar")[0];
        console.log("test");
        console.log(playerModel);
        Script.ui = new VisualInterface();
        Script.ui.highscore = 0;
        Script.ui.lives = 3;
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        Script.viewport.draw();
        ƒ.AudioManager.default.update();
    }
    /*function setCamera(): void {
      cameraNode = new ƒ.Node("camNode");
      let cameraComponent: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
      viewport.camera = cameraComponent;
      viewport.camera.projectCentral(canvas.clientWidth / canvas.clientHeight, 5);
      viewport.camera.mtxPivot.rotateY(180);
      viewport.camera.mtxPivot.translateZ(-250);
      cameraNode.addComponent(cameraComponent);
    }*/
})(Script || (Script = {}));
