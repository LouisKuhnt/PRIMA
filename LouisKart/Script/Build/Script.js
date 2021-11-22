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
                    //ƒ.Debug.log(this.message, this.getContainer());
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
    var ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    window.addEventListener("load", setup);
    document.addEventListener("interactiveViewportStarted", start);
    Script.graph = new ƒ.Node("Graph");
    let gridMeshFlat;
    let gridFlat;
    //let cmpCamera: ƒ.ComponentCamera;
    function start(_event) {
        viewport = _event.detail;
        setup(_event).then(() => {
            console.log("Done loading");
        });
    }
    function update(_event) {
        viewport.draw();
        // ƒ.Physics.world.simulate();  // if physics is included and used
    }
    async function setup(_event) {
        await setupScene();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        ƒAid.addStandardLightComponents(Script.graph);
    }
    async function setupScene() {
        let coatTexturedMap = new ƒ.CoatTextured();
        let texMap = new ƒ.TextureImage();
        let heightMap = new ƒ.TextureImage();
        texMap.load("../Textures/maptex.png");
        coatTexturedMap.texture = texMap;
        let terrain = Script.graph.getChildrenByName("Terrain")[0];
        //terrain.getComponent(ƒ.ComponentMaterial).material.coat.mutate({coat: texMap,});
        console.log(terrain.getComponent(ƒ.ComponentMaterial));
        let matTex = terrain.getComponent(ƒ.ComponentMaterial).material;
        viewport = new ƒ.Viewport();
        //cmpCamera = createCamera(new ƒ.Vector3(0, 2, 3.5), new ƒ.Vector3(0, 0, 0));
        heightMap = new ƒ.TextureImage();
        await heightMap.load("../Textures/map.png");
        gridMeshFlat = new ƒ.MeshRelief("HeightMap", heightMap);
        gridFlat = createCompleteMeshNode("Grid", matTex, gridMeshFlat);
        // gridMeshFlat.node = gridFlat;
        gridFlat.mtxLocal.translateY(-0.1);
        gridFlat.mtxLocal.scale(new ƒ.Vector3(3, 0.7, 3));
        Script.graph.addChild(gridFlat);
        viewport.initialize("Viewport", Script.graph, viewport.camera, document.querySelector("canvas"));
        viewport.setFocus(true);
        viewport.draw();
    }
    function createCompleteMeshNode(_name, _material, _mesh) {
        let node = new ƒ.Node(_name);
        let cmpMesh = new ƒ.ComponentMesh(_mesh);
        let cmpMaterial = new ƒ.ComponentMaterial(_material);
        let cmpTransform = new ƒ.ComponentTransform();
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);
        node.addComponent(cmpTransform);
        return node;
    }
    /*function createCamera(_translation: ƒ.Vector3 = new ƒ.Vector3(1, 1, 10), _lookAt: ƒ.Vector3 = new ƒ.Vector3()): ƒ.ComponentCamera {
      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      cmpCamera.projectCentral(1, 45, ƒ.FIELD_OF_VIEW.DIAGONAL);
      cmpCamera.mtxPivot.translate(_translation);
      cmpCamera.mtxPivot.lookAt(_lookAt);
      return cmpCamera;
      // camera.addComponent(cmpCamera);
      // camera.addComponent(cmpTransform);
      // // let cmpCamera: ƒ.ComponentCamera = new ƒ.Node("Camera");
      // let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    }*/
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map