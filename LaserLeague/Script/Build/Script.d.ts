declare namespace LaserLeague {
    import ƒ = FudgeCore;
    class Agent extends ƒ.Node {
        constructor();
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
