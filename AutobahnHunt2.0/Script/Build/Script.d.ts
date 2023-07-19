declare namespace Script {
    class AllEntity extends ƒ.Node {
        lives: number;
        constructor(name: string, lives?: number);
        getLives(): number;
        protected setLives(lives: number): void;
    }
}
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
    class Enemy extends AllEntity {
        constructor(name: string, lives: number);
        decreaseLive(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class EnemyCollisionDetect extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        enemyBody: ƒ.ComponentRigidbody;
        constructor();
        componentAdded(): any;
        collision(): any;
    }
}
declare namespace Script {
    class EnemyManager {
        speed: number;
        gameSettings: CustomJson;
        spawn_interval: number;
        enemyList: ƒ.GraphInstance[];
        isSpawned: boolean;
        startPostionScript: ƒ.Component;
        collisionDetect: ƒ.Component;
        randomColor: string[];
        constructor();
        checkLives(): void;
        move(): void;
        startEnemy(): void;
        loadFile(): Promise<void>;
        private getRandomColor;
        spawnEnemy(spawnTime: number): void;
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
}
declare namespace Script {
    class Player extends AllEntity {
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
    class PlayerCollisionDetect extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        enemyBody: ƒ.ComponentRigidbody;
        constructor();
        componentAdded(): any;
        collision(): any;
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
        street: ƒ.Node;
        asphalt: ƒ.Node;
        asphaltSprite: ƒ.ComponentAnimator;
        constructor();
        stopStreet(): void;
        startStreet(): void;
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
