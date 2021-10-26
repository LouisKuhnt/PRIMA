"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let graph, agentSymbol, laser, beams, testSymbol;
    let agent;
    let lasers;
    let moveLaserBeams;
    let moveSymbolOfAgent;
    let deltaTime;
    let posLocal;
    let counter = 1;
    const speedLaserRotate = 360;
    const speedAgentTranslation = 10;
    const speedAgentRotation = 360;
    let ctrForward = new ƒ.Control("Forward", speedAgentTranslation, 0 /* PROPORTIONAL */);
    let ctrRotation = new ƒ.Control("Rotate", speedAgentRotation, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(100);
    ctrForward.setDelay(200);
    function start(_event) {
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
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        deltaTime = ƒ.Loop.timeFrameReal / 1000;
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let ctrlDelayForwardandBackward = (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
            + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));
        let ctrlDelayRotate = (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
            + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]));
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
    function checkCollision() {
        testSymbol.activate(false);
        //console.log("pls help im fucking stupid");
        beams = lasers.getChildrenByName("Laser#1")[0].getChildrenByName("Center")[0].getChildren()[2];
        //console.log("Beams: "+ beams.mtxWorldInverse.toString());
        //console.log("Beams:");
        //console.log(beams);
        posLocal = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beams.mtxWorldInverse, true);
        console.log(posLocal.toString());
        if ((posLocal.x <= 0.1 && posLocal.x >= -0.1) && (posLocal.y <= 4 && posLocal.y >= -4))
            console.log("tot");
        if ((posLocal.x <= 4 && posLocal.x >= -4) && (posLocal.y <= 0.1 && posLocal.y >= -0.1))
            console.log("tot");
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map