import { movePlayerTo } from '@decentraland/RestrictedActions'

import { GameUI } from './game-ui';
import { GameState } from './game-state';
import { PlayerState } from './player-state';

import { GameMovementSystem } from "./game-movement-system";
import { GameResources } from "./game-resources";

export class GameManager {
    canvas: UICanvas
    gameUI: GameUI // Overhead Game UI
    player: PlayerState // Player State

    //helpers
    camera: Camera
    gameIntro: UICanvas
    gameState: GameState
    
    // systems
    resources:GameResources


    // game's movement system
    get movementSystem(): GameMovementSystem { return this.resources.movementSystem; }

    constructor(init:GameResources){
        // initialize resource manager
        this.resources = init;
    }
}