declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    let canvas: HTMLCanvasElement;
}
declare namespace Script {
    interface CustomJson {
        [name: string]: number;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    let graph: ƒ.Node;
    let viewport: ƒ.Viewport;
    let limit_z: number;
    let limit_x: number;
    let ui: VisualInterface;
    let streetControl: Street;
    let playerControl: Player;
}
declare namespace Script {
    let LIVES: number;
    class Player extends ƒ.Node {
        speed: number;
        MAX_SPEED: number;
        acceleration: number;
        player: ƒ.Node;
        ctrTurn: ƒ.Control;
        body: ƒ.ComponentRigidbody;
        transform: ƒ.ComponentTransform;
        newCoordinates: ƒ.Vector3;
        positionX: number;
        gameSettings: CustomJson;
        constructor();
        move(): void;
        loadFile(): Promise<void>;
    }
}
declare namespace Script {
    let MAX_TILES: number;
    let MAX_ENEMIES: number;
    let STREET_POSITION: number;
    class Street extends ƒ.Node {
        multiplikator: number;
        streets: [ƒ.Node];
        gameSettings: CustomJson;
        constructor();
        setStreets(): void;
        deleteLastStreet(): void;
        loadFile(): Promise<void>;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class VisualInterface extends ƒ.Mutable {
        highscore: number;
        lives: number;
        constructor();
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
