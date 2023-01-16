/*      GAME RESOURCES
    used to manage overhead resources for games. The main utility is maintaining 
    a single set of data and objects used between games a single table.
    this massively reduces in-scene requirements, as each game can just interact with this
    class to get their resources instead of generating their own.

    if a resource or data is a common requirement across multiple games, then is should be placed here. this
    includes references to menu state display, objects, and data. in-scene objects (such as
    groups and should still be moved/have positioning maintained within game state class.

    NOTE: objects are not destroyed between games, but are removed from scene rendering. this cuts
    down on processing usage by always retaining generated objects at a slight hit to memory (which is
    currently worth it).
*/
// IMPORTS
import { GameMovementSystem } from "./game-movement-system";

// END IMPORTS

// CLASS
export class GameResources {
    bIsDebug: boolean = false;

    // movement system
    movementSystem: GameMovementSystem;

    //delegates and fillers
    //fillers are the default function assigned to delegates, only providing interface debugging logs
    //these logs should never really appear organically during play, as delegates are assigned during game selection
    

    // CONSTRUCTOR
    constructor()
    {
        // initialize properties
        if (this.bIsDebug) { log("game resource manager - initializing..."); }

        // initialize movement system
        this.movementSystem = new GameMovementSystem();
        engine.addSystem(this.movementSystem);
    }

    //sets engine state of general game resources
    //  adds/removes all systems/entities from scene rendering
    public SetState(state:boolean)
    {
        // movement system
        if (state) { engine.addSystem(this.movementSystem); }
        else { engine.removeSystem(this.movementSystem); }
    }

    // resets common compoents for the game
    public Reset()
    {
        if (this.bIsDebug) { log("game resource manager - resetting..."); }

        

        // reset game state
        if(this.bIsDebug) { log("game resource manager - reset complete"); }
    }
}