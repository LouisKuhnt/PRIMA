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
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    window.addEventListener("load", init);
    let dialog;
    function init(_event) {
        dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", function (_event) {
            // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
            dialog.close();
            startInteractiveViewport();
        });
        //@ts-ignore
        dialog.showModal();
    }
    // setup and start interactive viewport
    async function startInteractiveViewport() {
        // load resources referenced in the link-tag
        await ƒ.Project.loadResourcesFromHTML();
        ƒ.Debug.log("Project:", ƒ.Project.resources);
        // pick the graph to show
        let graph = ƒ.Project.resources["Graph|2023-07-11T10:45:19.148Z|55359"];
        ƒ.Debug.log("Graph:", graph);
        if (!graph) {
            alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
            return;
        }
        // setup the viewport
        let cmpCamera = new ƒ.ComponentCamera();
        Script.canvas = document.querySelector("canvas");
        let viewport = new ƒ.Viewport();
        viewport.initialize("InteractiveViewport", graph, cmpCamera, Script.canvas);
        ƒ.Debug.log("Viewport:", viewport);
        // hide the cursor when interacting, also suppressing right-click menu
        //canvas.addEventListener("mousedown", canvas.requestPointerLock);
        //canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });
        // make the camera interactive (complex method in FudgeAid)
        //let cameraOrbit = FudgeAid.Viewport.expandCameraToInteractiveOrbit(viewport);
        // setup audio
        //let cmpListener = new ƒ.ComponentAudioListener();
        //cmpCamera.node.addComponent(cmpListener);
        //FudgeCore.AudioManager.default.listenWith(cmpListener);
        //FudgeCore.AudioManager.default.listenTo(graph);
        //FudgeCore.Debug.log("Audio:", FudgeCore.AudioManager.default);
        // draw viewport once for immediate feedback
        //FudgeCore.Render.prepare(cameraOrbit);
        viewport.draw();
        Script.canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", {
            bubbles: true,
            detail: viewport
        }));
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let cameraNode;
    Script.limit_z = 300;
    Script.limit_x = 100;
    let playerModel;
    let streetModel;
    ƒ.Debug.info("Main Program Template running!");
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        Script.viewport = _event.detail;
        Script.graph = Script.viewport.getBranch();
        setCamera();
        playerModel = Script.graph.getChildrenByName("PlayerCar")[0];
        console.log("Player");
        console.log(playerModel);
        Script.playerControl = new Script.Player();
        playerModel.addChild(Script.playerControl);
        streetModel = Script.graph.getChildrenByName("Street")[0];
        console.log("Street");
        console.log(streetModel);
        Script.streetControl = new Script.Street();
        streetModel.addChild(Script.streetControl);
        //streetControl.setStreets(streetModel);
        Script.ui = new Script.VisualInterface();
        Script.ui.highscore = 0;
        Script.ui.lives = 3;
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        Script.playerControl.move();
        Script.viewport.draw();
        //ƒ.AudioManager.default.update();
    }
    function setCamera() {
        cameraNode = new ƒ.Node("camNode");
        let cameraComponent = new ƒ.ComponentCamera();
        //let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        Script.viewport.camera = cameraComponent;
        //viewport.camera.projectCentral(canvas.clientWidth / canvas.clientHeight, 5);
        Script.viewport.camera.mtxPivot.rotateX(10);
        Script.viewport.camera.mtxPivot.translateZ(-340);
        Script.viewport.camera.mtxPivot.translateY(30);
        Script.viewport.camera.mtxPivot.translateX(0);
        cameraNode.addComponent(cameraComponent);
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    Script.LIVES = 3;
    class Player extends ƒ.Node {
        speed = 0;
        MAX_SPEED;
        acceleration;
        ctrForward;
        ctrTurn;
        gameSettings;
        constructor() {
            super("Player");
            // load external config
            this.loadFile();
            this.ctrForward = new ƒ.Control("Forward", this.speed * this.acceleration, 0 /* ƒ.CONTROL_TYPE.PROPORTIONAL */);
            this.ctrForward.setDelay(200);
            this.ctrTurn = new ƒ.Control("Turn", 150, 0 /* ƒ.CONTROL_TYPE.PROPORTIONAL */);
            this.ctrTurn.setDelay(300);
            // potenzielle rigid body Verbesserung
        }
        move() {
            let turn = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            this.ctrTurn.setInput(turn);
            // RigidBody
            // body.applyTorque(ƒ.Vector3.SCALE(cart.mtxLocal.getY(), this.ctrTurn.getOutput()));
            let forward = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
            this.ctrForward.setInput(forward);
            // body.applyForce(ƒ.Vector3.SCALE(player.mtxLocal.getZ(), this.ctrForward.getOutput()));
        }
        async loadFile() {
            let file = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["speed"];
            this.acceleration = this.gameSettings["acceleration"];
        }
    }
    Script.Player = Player;
})(Script || (Script = {}));
var Script;
(function (Script) {
    Script.MAX_TILES = 5;
    Script.MAX_ENEMIES = 4;
    Script.STREET_POSITION = 150;
    // Street Node
    class Street extends ƒ.Node {
        multiplikator;
        streets;
        gameSettings;
        constructor() {
            super("Street");
            // load external file
            this.loadFile();
        }
        setStreets() {
            /*if(streetModel != null) {
                this.streets.push(streetModel);
            }

            console.log("Übertragenes StreetModel: " + streetModel);
            for(let i = this.streets.length; i <= MAX_TILES; i++) {
                if (streetModel != null) {
                    console.log(streetModel.mtxWorld);
                    // graph.addChild(streetModel);
                }
                else {

                }
            }*/
        }
        deleteLastStreet() {
            //array pop für das letzte objekt
        }
        async loadFile() {
            let file = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.multiplikator = this.gameSettings["score_multiplicator"];
        }
    }
    Script.Street = Street;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒUi = FudgeUserInterface;
    // Virtual User Interface for HP, Level and Sccore
    class VisualInterface extends ƒ.Mutable {
        highscore;
        lives;
        constructor() {
            super();
            const domVui = document.querySelector("div#ui");
            console.log("UI", new ƒUi.Controller(this, domVui));
        }
        reduceMutator(_mutator) {
        }
    }
    Script.VisualInterface = VisualInterface;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map