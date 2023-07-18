"use strict";
var Script;
(function (Script) {
    // formerly known as Entity, but typescript got a problem with the build process, 
    // that if enemy.ts is above entity the Enemy will be build before Entity - so 
    // the class would be used before its declaration.
    class AllEntity extends ƒ.Node {
        lives = 0;
        constructor(name, lives = 3) {
            super(name);
            this.lives = lives;
        }
        getLives() {
            return this.lives;
        }
        setLives(lives) {
            this.lives = lives;
        }
        decreaseLives() {
            this.lives--;
            console.log("d : " + this.lives);
        }
    }
    Script.AllEntity = AllEntity;
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
    class Enemy extends Script.AllEntity {
        speed = 0;
        gameSettings;
        enemy_lives = 1;
        enemyList = [];
        startPostionScript = new Script.RandomEnemySpawn();
        collisionDetect = new Script.EnemyCollisionDetect();
        randomColor = ["EnemyCar_Color_0.png", "EnemyCar_Color_1.png", "EnemyCar_Color_2.png", "EnemyCar_Color_3.png", "EnemyCar_Color_4.png"];
        constructor(name) {
            super(name, 1);
            this.loadFile();
        }
        move() {
            this.enemyList.forEach(enemy => {
                enemy.getComponent(ƒ.ComponentRigidbody).applyForce(new ƒ.Vector3(0, 0, enemy.mtxLocal.getZ().z - this.speed));
            });
        }
        startEnemy() {
            let enemyInstance;
            enemyInstance = ƒ.Project.createGraphInstance(ƒ.Project.getResourcesByName("EnemyCar")[0]);
            enemyInstance.then(element => {
                element.addComponent(this.startPostionScript);
                element.addComponent(this.collisionDetect);
                let chassisChild = element.getChildrenByName("LowerChassis")[0];
                let chassisMaterial = chassisChild.getComponent(ƒ.ComponentMaterial);
                chassisChild.removeComponent(chassisMaterial);
                let mtrEnemy = new ƒ.Material("something", ƒ.ShaderFlatTextured, new ƒ.CoatRemissiveTextured(new ƒ.Color(255, 255, 255, 255), new ƒ.TextureImage(this.getRandomColor())));
                chassisChild.addComponent(new ƒ.ComponentMaterial(mtrEnemy));
                this.enemyList.push(element);
                Script.graph.addChild(element);
            });
        }
        async loadFile() {
            let file = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.speed = this.gameSettings["enemy_speed"];
        }
        getRandomColor() {
            let enemyColor = this.randomColor[Math.floor(Math.random() * 5)];
            return ".\\Assets\\" + enemyColor;
        }
    }
    Script.Enemy = Enemy;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class EnemyCollisionDetect extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Script.CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "EnemyCollisionDetect added to ";
        enemyBody;
        constructor() {
            super();
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.componentAdded);
        }
        componentAdded() {
            this.enemyBody = this.node.getComponent(ƒ.ComponentRigidbody);
            this.enemyBody.addEventListener("ColliderLeftCollision" /* ƒ.EVENT_PHYSICS.COLLISION_EXIT */, this.collision);
        }
        collision() {
            this.node.activate(false);
            this.node.removeAllChildren();
        }
    }
    Script.EnemyCollisionDetect = EnemyCollisionDetect;
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
        viewport.draw();
        Script.canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let cameraNode;
    let highscore = 0;
    let currentTime;
    let oldTime;
    let isSpawned = false;
    let playerModel;
    let streetModel;
    let asphaltModel;
    let motorStarted = false;
    let enemyControl;
    let chrashSound;
    let engineStartSound;
    let engineRunningSound;
    ƒ.Debug.info("Main Program Template running!");
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        Script.viewport = _event.detail;
        Script.graph = Script.viewport.getBranch();
        setCamera();
        playerModel = Script.graph.getChildrenByName("PlayerCar")[0];
        Script.playerControl = new Script.Player();
        playerModel.addChild(Script.playerControl);
        playerModel.addComponent(new Script.PlayerCollisionDetect());
        streetModel = Script.graph.getChildrenByName("Street")[0];
        asphaltModel = streetModel.getChildrenByName("Asphalt")[0];
        Script.streetControl = new Script.Street();
        asphaltModel.addChild(Script.streetControl);
        Script.streetControl.stopStreet();
        enemyControl = new Script.Enemy("Enemy");
        Script.ui = new Script.VisualInterface();
        ƒ.AudioManager.default.listenTo(Script.graph);
        engineRunningSound = Script.graph.getComponent(ƒ.ComponentAudio);
        engineRunningSound.play(true);
        engineRunningSound.loop = true;
        engineRunningSound.volume = 0;
        Script.graph.addEventListener("stopGame", stopGame);
        Script.graph.addEventListener("collided", collided);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        Script.ui.highscore = highscore;
        Script.ui.lives = Script.playerControl.getLives();
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]) && !motorStarted) {
            startGame();
        }
        if (motorStarted) {
            Script.playerControl.move();
            enemyControl.move();
            spawnEnemy(highscore);
            if (highscore % 10 == 1 || highscore % 10 == 6) {
                isSpawned = false;
            }
            oldTime = currentTime;
            currentTime = Math.floor(ƒ.Time.game.get() / 1000);
            if (oldTime != currentTime) {
                highscore++;
            }
            /*if(playerControl.getLives() <= 0) {
              stopGame();
            }*/
        }
        Script.viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function setCamera() {
        cameraNode = new ƒ.Node("camNode");
        let cameraComponent = new ƒ.ComponentCamera();
        //let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        Script.viewport.camera = cameraComponent;
        //viewport.camera.projectCentral(canvas.clientWidth / canvas.clientHeight, 5);
        Script.viewport.camera.mtxPivot.rotateY(0);
        Script.viewport.camera.mtxPivot.rotateX(17);
        Script.viewport.camera.mtxPivot.rotateZ(0);
        Script.viewport.camera.mtxPivot.translateZ(-200);
        Script.viewport.camera.mtxPivot.translateY(0);
        Script.viewport.camera.mtxPivot.translateX(0);
        cameraNode.addComponent(cameraComponent);
    }
    function stopGame() {
        console.log("endGame");
        let deadScreen = document.querySelector("#deadScreen");
        deadScreen.style.display = "block";
        let p = document.createElement("p");
        p.innerHTML = "You died <br> Score: " + Script.ui.highscore;
        deadScreen.appendChild(p);
        ƒ.Loop.removeEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.stop();
    }
    function startGame() {
        Script.streetControl.startStreet();
        engineStartSound = playerModel.getComponent(ƒ.ComponentAudio);
        engineStartSound.volume = 0.1;
        engineStartSound.play(true);
        engineRunningSound.volume = 0.1;
        let startScreen = document.querySelector("#startGame");
        startScreen.remove();
        motorStarted = true;
    }
    function spawnEnemy(spawnTime) {
        if ((spawnTime % 10 == 0 || spawnTime % 10 == 5) && !isSpawned) {
            enemyControl.startEnemy();
            isSpawned = true;
        }
    }
    function collided() {
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    class Player extends Script.AllEntity {
        acceleration_left;
        acceleration_right;
        player;
        ctrTurn = new ƒ.Control("Turn", 150, 0 /* ƒ.CONTROL_TYPE.PROPORTIONAL */);
        body;
        transform;
        newCoordinates;
        positionX = 0;
        gameSettings;
        constructor() {
            super("Player", 3);
            // load external config
            this.loadFile();
            this.player = Script.graph.getChildrenByName("PlayerCar")[0];
            this.body = this.player.getComponent(ƒ.ComponentRigidbody);
            this.transform = this.player.getComponent(ƒ.ComponentTransform);
            //this.body.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.collision);
        }
        move() {
            let turn = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
            this.ctrTurn.setInput(turn);
            // this.body.applyTorque(ƒ.Vector3.SCALE(this.player.mtxLocal.getX(), this.ctrTurn.getOutput()));
            // this.player.mtxLocal.translate(new ƒ.Vector3(0 ,0 , this.player.mtxLocal.getZ().z));
            // this.transform.transform(ƒ.Vector3.SCALE(this.player.mtxLocal.getZ(), this.ctrTurn.getOutput()), null,this.player)
            if (turn == -1 && this.positionX >= -25) {
                //console.log("rechts")
                this.newCoordinates = new ƒ.Vector3(this.acceleration_right, 0, 0);
                this.transform.mtxLocal.translate(this.newCoordinates);
                this.positionX--;
                //console.log("Rechts: X" + this.player.mtxLocal.getX() + " Y " + this.player.mtxLocal.getY() + " Z " + this.player.mtxLocal.getZ())
                //console.log("pos. rechts: " + this.newCoordinates)
                //this.player.mtxLocal.translate(ƒ.Vector3.ZERO());
            }
            else if (turn == 1 && this.positionX <= 25) {
                //console.log("links")
                this.newCoordinates = new ƒ.Vector3(this.acceleration_left, 0, 0);
                this.transform.mtxLocal.translate(this.newCoordinates);
                this.positionX++;
                //console.log("Links: X" + this.player.mtxLocal.getX() + " Y " + this.player.mtxLocal.getY() + " Z " + this.player.mtxLocal.getZ())
                //console.log("pos. links: " + this.newCoordinates)
                //this.player.mtxLocal.translate(this.newCoordinates);
            }
            else {
                //this.player.mtxLocal.translate(ƒ.Vector3.ZERO());
                //this.transform.mtxLocal.translate(ƒ.Vector3.ZERO());
                // console.log(this.player.mtxWorld.getX().x);
            }
        }
        /*private async collision() {
            player_lives--;
            console.log("collision : " + player_lives);
            if(player_lives <= 0) {
                console.log("dead");
                this.dispatchEvent(new Event("stopGame", {bubbles: true}));
            }
            //sound abspielen
        }*/
        async loadFile() {
            let file = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.setLives(this.gameSettings["player_lives"]);
            this.acceleration_left = this.gameSettings["acceleration_left"];
            this.acceleration_right = this.gameSettings["acceleration_right"];
        }
    }
    Script.Player = Player;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class PlayerCollisionDetect extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Script.CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "EnemyCollisionDetect added to ";
        enemyBody;
        constructor() {
            super();
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.componentAdded);
        }
        componentAdded() {
            console.log("added");
            this.enemyBody = this.node.getComponent(ƒ.ComponentRigidbody);
            this.enemyBody.addEventListener("ColliderEnteredCollision" /* ƒ.EVENT_PHYSICS.COLLISION_ENTER */, this.collision);
        }
        collision() {
            let playerModel = this.node.getChildrenByName("Player")[0];
            playerModel.lives--;
            this.dispatchEvent(new Event("collided"));
            if (playerModel.lives <= 0) {
                console.log("dead");
                this.dispatchEvent(new Event("stopGame"));
            }
        }
    }
    Script.PlayerCollisionDetect = PlayerCollisionDetect;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script);
    class RandomEnemySpawn extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Script.CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        possiblePositions = [
            new ƒ.Vector3(26, 1, 1250),
            new ƒ.Vector3(-26, 1, 1250),
            new ƒ.Vector3(0, 1, 1250)
        ];
        constructor() {
            super();
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.generateRandomSpawn);
        }
        generateRandomSpawn() {
            let rndNumber = Math.floor(Math.random() * 3);
            console.log("ComponentScript : " + this.node.mtxLocal.get());
            this.node.mtxLocal.translate(this.possiblePositions[rndNumber]);
        }
    }
    Script.RandomEnemySpawn = RandomEnemySpawn;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    // Street Node
    class Street extends ƒ.Node {
        acceleration;
        gameSettings;
        street;
        asphalt;
        asphaltSprite;
        constructor() {
            super("Street");
            // load external file
            this.loadFile();
            this.street = Script.graph.getChildrenByName("Street")[0];
            this.asphalt = this.street.getChildrenByName("Asphalt")[0];
            this.asphaltSprite = this.asphalt.getComponent(ƒ.ComponentAnimator);
        }
        stopStreet() {
            this.asphaltSprite.playmode = ƒ.ANIMATION_PLAYMODE.STOP;
        }
        startStreet() {
            this.asphaltSprite.playmode = ƒ.ANIMATION_PLAYMODE.LOOP;
        }
        async loadFile() {
            let file = await fetch("configuration-game.json");
            this.gameSettings = await file.json();
            this.acceleration = this.gameSettings["acceleration"];
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