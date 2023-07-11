namespace Script {
    import ƒ = FudgeCore;
    import ƒUi = FudgeUserInterface;

    // Virtual User Interface for HP, Level and Sccore
    export class VisualInterface extends ƒ.Mutable {
        public highscore: number; 
        public lives: number;

        public constructor() {
          super();
          const domVui: HTMLDivElement = document.querySelector("div#ui");
          console.log("UI", new ƒUi.Controller(this, domVui));
        }

        protected reduceMutator(_mutator: ƒ.Mutator): void { 
        }
    }
}