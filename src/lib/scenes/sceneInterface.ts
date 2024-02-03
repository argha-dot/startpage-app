import { Container } from "pixi.js";

export interface sceneInterface extends Container {
    isInitialized: boolean;
    init(): void;
    destroy(): void;
    start(): void;
    stop(): void;
    update(delta: number): void;
}
