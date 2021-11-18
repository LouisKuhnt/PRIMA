declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        health: number;
        name: string;
        constructor();
        create(): Promise<void>;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class AgentComponent extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        ctrForward: ƒ.Control;
        ctrRotation: ƒ.Control;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
        movement: (_event: Event) => void;
        respawn: () => void;
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class CollisionDetection extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class GameState extends ƒ.Mutable {
        private static controller;
        private static instance;
        name: string;
        health: number;
        private constructor();
        static get(): GameState;
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class LaserRotation extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        Viewport: ƒ.Viewport;
        deltaTime: number;
        speedLaserRotate: number;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
    }
}
declare namespace LaserLeague {
}
