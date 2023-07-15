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
    let enemyLive: number;
    class Enemy extends Entity {
        speed: number;
        acceleration: number;
        gameSettings: CustomJson;
        enemy: ƒ.Node;
        constructor(name: string);
        move(): void;
        loadFile(): Promise<void>;
    }
}
declare namespace Script {
    class EnemyManager {
        constructor();
    }
}
declare namespace Script {
    class Entity extends ƒ.Node {
        lives: number;
        constructor(name: string, lives: number);
        protected collision(): void;
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
    let ui: VisualInterface;
    let streetControl: Street;
    let playerControl: Player;
}
declare namespace Script {
    let lives: number;
    class Player extends Entity {
        acceleration_left: number;
        acceleration_right: number;
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
    import ƒ = FudgeCore;
    class RandomEnemySpawn extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        private possiblePositions;
        constructor();
        generateRandomSpawn(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Street extends ƒ.Node {
        acceleration: number;
        gameSettings: CustomJson;
        street: ƒ.Node;
        asphalt: ƒ.Node;
        asphaltSprite: ƒ.ComponentAnimator;
        constructor();
        stopStreet(): void;
        startStreet(): void;
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
