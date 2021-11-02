"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CollisionDetection extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CollisionDetection);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CollisionDetection added to ";
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
                    ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
        update = (_event) => {
        };
    }
    Script.CollisionDetection = CollisionDetection;
})(Script || (Script = {}));
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
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class LaserRotation extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(LaserRotation);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "LaserRotation added to ";
        Viewport;
        deltaTime;
        speedLaserRotate = 90;
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
                    ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
            }
        };
        update = (_event) => {
            this.deltaTime = ƒ.Loop.timeFrameReal / 1000;
            this.node.mtxLocal.rotateZ(this.speedLaserRotate * this.deltaTime);
        };
    }
    Script.LaserRotation = LaserRotation;
})(Script || (Script = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let graph;
    let agent;
    let agentSymbol;
    let lasers;
    let moveSymbolOfAgent;
    let deltaTime;
    let getAllLasers;
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
        agent = graph.getChildrenByName('Agents')[0].getChildrenByName('Agent#1')[0];
        agentSymbol = agent.getChildrenByName('Agent_Symbol')[0];
        getAllLasers = graph.getChildrenByName("Lasers")[0];
        moveSymbolOfAgent = agentSymbol.getComponent(ƒ.ComponentTransform).mtxLocal;
        putLaserOnArena().then(() => {
            lasers = graph.getChildrenByName("Lasers")[0].getChildrenByName("Laser");
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        });
        viewport.camera.mtxPivot.translateZ(-20);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    async function putLaserOnArena() {
        for (let yPos = -1; yPos <= 1; yPos += 2) {
            for (let xPos = -1; xPos <= 1; xPos++) {
                let graphLaser = FudgeCore.Project.resources["Graph|2021-11-02T13:20:08.111Z|45928"];
                let laser = await ƒ.Project.createGraphInstance(graphLaser);
                let laserTranslate = new ƒ.Vector3(xPos * 8, yPos * 3.5, 1);
                laser.getComponent(ƒ.ComponentTransform).mtxLocal.mutate({ translation: laserTranslate });
                getAllLasers.addChild(laser);
            }
        }
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
        moveSymbolOfAgent.rotateZ(1);
        lasers.forEach(laser => {
            let laserBeams = laser.getChildrenByName("Center")[0].getChildrenByName("Beam");
            laserBeams.forEach(beam => {
                checkCollision(agent, beam);
            });
        });
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function checkCollision(agent, beam) {
        let distance = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beam.mtxWorldInverse, true);
        let minX = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + agent.radius;
        let minY = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + agent.radius;
        if (distance.x <= (minX) && distance.x >= -(minX) && distance.y <= minY && distance.y >= 0) {
            console.log("treffer");
        }
    }
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map