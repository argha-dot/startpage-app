import { Container } from "pixi.js";
import { sceneInterface } from "./sceneInterface";

export default class Scene extends Container implements sceneInterface {

    public isInitialized: boolean;

    constructor() {
        super();
        this.isInitialized = false;
    }

    public init(): void { }

    public destroy(): void { }

    public start(): void { }

    public stop(): void { }

    public update(_delta: number): void { }
}
