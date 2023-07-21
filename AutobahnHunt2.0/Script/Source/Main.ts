namespace Script {
  import ƒ = FudgeCore;

  let cameraNode: ƒ.Node;
  export let graph: ƒ.Node;

  let viewport: ƒ.Viewport;
  let ui: VisualInterface;
  let streetControl: Street;
  let playerControl: Player;
  let highscore: number = 0;
  let currentTime: number;
  let oldTime: number;
  let playerModel: ƒ.Node;
  let streetModel: ƒ.Node;
  let asphaltModel: ƒ.Node;
  let motorStarted: boolean = false;
  let enemyControl: EnemyManager;
  let crashSound: ƒ.ComponentAudio;
  let engineStartSound: ƒ.ComponentAudio;
  let engineRunningSound: ƒ.ComponentAudio;

  ƒ.Debug.info("Main Program Template running!");

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {

    viewport = _event.detail;
    graph = viewport.getBranch();

    setCamera();

    playerModel = graph.getChildrenByName("PlayerCar")[0];
    playerControl = new Player();
    playerModel.addChild(playerControl);
    playerModel.addComponent(new PlayerCollisionDetect());

    streetModel = graph.getChildrenByName("Street")[0];
    asphaltModel = streetModel.getChildrenByName("Asphalt")[0];
    streetControl = new Street();
    asphaltModel.addChild(streetControl);
    streetControl.stopStreet();

    enemyControl = new EnemyManager();

    ui = new VisualInterface();

    ƒ.AudioManager.default.listenTo(graph);
    engineRunningSound = graph.getComponent(ƒ.ComponentAudio);
    engineRunningSound.play(true);
    engineRunningSound.loop = true;
    engineRunningSound.volume = 0;

    graph.addEventListener("stopGame", stopGame);
    graph.addEventListener("collided", collided);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    
    ui.highscore = highscore;
    ui.lives = playerControl.getLives();

    if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]) && !motorStarted){
        startGame();
    }

    if(motorStarted){
      playerControl.move();
    
      enemyControl.checkLives();
      enemyControl.move();
      enemyControl.spawnEnemy(highscore);
  
      oldTime = currentTime;
      currentTime = Math.floor(ƒ.Time.game.get() / 1000);
      if(oldTime != currentTime) {
        highscore++;
      }
    }

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  function setCamera(): void {
    cameraNode = new ƒ.Node("camNode");
    let cameraComponent: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    viewport.camera = cameraComponent;
    viewport.camera.mtxPivot.rotateX(17);
    viewport.camera.mtxPivot.translateZ(-200);
    cameraNode.addComponent(cameraComponent);
  }

  function stopGame() {
    ui.lives = 0;
    let deadScreen: HTMLDivElement = <HTMLDivElement>document.querySelector("#deadScreen");
    deadScreen.style.display = "block";

    let p: HTMLParagraphElement = document.createElement("p");
    p.innerHTML = "You died <br> Score: " + ui.highscore;
    deadScreen.appendChild(p);

    ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.stop();
  }

  function startGame(){
    streetControl.startStreet();
    engineStartSound = playerModel.getComponent(ƒ.ComponentAudio);
    engineStartSound.volume = 0.1;
    engineStartSound.play(true);
    engineRunningSound.volume = 0.1;

    let startScreen: HTMLDivElement = <HTMLDivElement>document.querySelector("#startGame");
    startScreen.remove();

    motorStarted = true;
  }

  function collided() {
    crashSound = streetModel.getComponent(ƒ.ComponentAudio);
    crashSound.volume = 0.1;
    crashSound.play(true);
  }
}