namespace LaserLeague{
    import ƒ = FudgeCore;

    export class Agent extends ƒ.Node {
        public health: number = 1;
        public name: string = "Player Number 1";

        constructor(){
            super("Agent");

            this.create();
        }

        async create() {
            let agentGraph: ƒ.Graph = <ƒ.Graph> FudgeCore.Project.resources["Graph|2021-11-17T11:08:30.266Z|37675"];
            let position: ƒ.Vector3 = new ƒ.Vector3(5,0,0.2);
            let instance = await ƒ.Project.createGraphInstance(agentGraph);
            instance.mtxLocal.translation = position;

            this.addChild(instance);
        }
    }
}