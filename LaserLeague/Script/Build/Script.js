"use strict";
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        health = 1;
        name = "Player Number 1";
        startPosition = new ƒ.Vector3(5, 0, 0.2);
        constructor() {
            super("Agent");
            this.create();
        }
        async create() {
            let agentGraph = FudgeCore.Project.resources["Graph|2021-11-17T11:08:30.266Z|37675"];
            let instance = await ƒ.Project.createGraphInstance(agentGraph);
            instance.mtxLocal.translation = this.startPosition;
            this.addChild(instance);
        }
    }
    LaserLeague.Agent = Agent;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
    class AgentComponent extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(AgentComponent);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "AgentComponent added to ";
        ctrForward = new ƒ.Control("Forward", 10, 0 /* PROPORTIONAL */);
        ctrRotation = new ƒ.Control("Rotate", 360, 0 /* PROPORTIONAL */);
        constructor() {
            super();
            this.ctrRotation.setDelay(100);
            this.ctrForward.setDelay(200);
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
            this.movement(_event);
        };
        movement = (_event) => {
            let deltaTime = ƒ.Loop.timeFrameReal / 1000;
            // ƒ.Physics.world.simulate();  // if physics is included and used
            let ctrlDelayForwardandBackward = (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])
                + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]));
            let ctrlDelayRotate = (ƒ.Keyboard.mapToValue(1, 0, [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])
                + ƒ.Keyboard.mapToValue(-1, 0, [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]));
            this.ctrForward.setInput(ctrlDelayForwardandBackward * deltaTime);
            this.node.mtxLocal.translateY(this.ctrForward.getOutput());
            this.ctrRotation.setInput(ctrlDelayRotate * deltaTime);
            this.node.mtxLocal.rotateZ(this.ctrRotation.getOutput());
        };
        respawn = () => {
            this.node.mtxLocal.translation = new ƒ.Vector3(5, 0, 0.2);
            this.ctrForward.setInput(0);
            this.ctrRotation.setInput(0);
            this.ctrRotation.setInput(0);
            this.ctrForward.setDelay(0);
            this.ctrRotation.setDelay(100);
            this.ctrForward.setDelay(200);
            this.node.mtxLocal.rotation = new ƒ.Vector3(0, 0, 0);
        };
    }
    LaserLeague.AgentComponent = AgentComponent;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
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
    LaserLeague.CollisionDetection = CollisionDetection;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
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
    LaserLeague.CustomComponentScript = CustomComponentScript;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    //import ƒui = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        // private static controller: ƒui.Controller;
        static instance;
        name = "LaserLeague";
        health = 1;
        constructor() {
            super();
            // let domHud: HTMLDivElement = document.querySelector("#Hud");
            GameState.instance = this;
            // GameState.controller = new ƒui.Controller(this, domHud);
            // console.log("Hud-Controller", GameState.controller);
        }
        static get() {
            return GameState.instance || new GameState();
        }
        reduceMutator(_mutator) { }
    }
    LaserLeague.GameState = GameState;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(LaserLeague); // Register the namespace to FUDGE for serialization
    class LaserRotation extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(LaserRotation);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "LaserRotation added to ";
        Viewport;
        deltaTime;
        speedLaserRotate = 0;
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
    LaserLeague.LaserRotation = LaserRotation;
})(LaserLeague || (LaserLeague = {}));
var LaserLeague;
(function (LaserLeague) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let graph;
    let agent;
    let lasers;
    let getAllLasers;
    function start(_event) {
        viewport = _event.detail;
        graph = viewport.getBranch();
        console.log("graph");
        console.log(graph);
        agent = new LaserLeague.Agent;
        graph.getChildrenByName("Agents")[0].addChild(agent);
        let domName = document.querySelector("#hud>input");
        domName.textContent = agent.name;
        getAllLasers = graph.getChildrenByName("Lasers")[0];
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
                laser.getComponent(ƒ.ComponentTransform).mtxLocal.mutate({ translation: laserTranslate, });
                getAllLasers.addChild(laser);
            }
        }
    }
    function update(_event) {
        let _agent = agent.getChildren()[0];
        lasers.forEach(laser => {
            let laserBeams = laser.getChildrenByName("Center")[0].getChildrenByName("Beam");
            laserBeams.forEach(beam => {
                checkCollision(_agent, beam);
            });
        });
        let domHealth = document.querySelector("input");
        domHealth.value = agent.health.toString();
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function checkCollision(_agent, beam) {
        let distance = ƒ.Vector3.TRANSFORMATION(agent.mtxWorld.translation, beam.mtxWorldInverse, true);
        let minX = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x / 2 + _agent.radius;
        let minY = beam.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y + _agent.radius;
        if (distance.x <= (minX) && distance.x >= -(minX) && distance.y <= minY && distance.y >= 0) {
            console.log("treffer");
            //_agent.getComponent(AgentComponent).respawn();
        }
    }
})(LaserLeague || (LaserLeague = {}));
//# sourceMappingURL=Script.js.map