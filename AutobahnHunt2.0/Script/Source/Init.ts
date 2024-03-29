namespace Script {
    window.addEventListener("load", init);
    export let canvas: HTMLCanvasElement;

    let dialog: HTMLDialogElement;
    function init(_event: Event): void {
        dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", function (_event: Event): void {
            // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
            dialog.close();
            startInteractiveViewport();
        });
        //@ts-ignore
        dialog.showModal();
    }

    // setup and start interactive viewport
    async function startInteractiveViewport(): Promise<void> {
        // load resources referenced in the link-tag
        await ƒ.Project.loadResourcesFromHTML();
        ƒ.Debug.log("Project:", ƒ.Project.resources);

        // pick the graph to show
        let graph: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources["Graph|2023-07-11T10:45:19.148Z|55359"];
        ƒ.Debug.log("Graph:", graph);
        if (!graph) {
            alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
            return;
        }

        // setup the viewport
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        canvas = document.querySelector("canvas");
        let viewport: ƒ.Viewport = new ƒ.Viewport();
        viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);
        ƒ.Debug.log("Viewport:", viewport);

        viewport.draw();
        canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
    }
}