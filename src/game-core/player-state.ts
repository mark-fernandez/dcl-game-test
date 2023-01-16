/*      PLAYER STATE
    base class used to hold all data regarding the player
    this class should be modified for each specific game, individually
    defining such thing as their player score, health, and other data
    this class should be extended by the game's main class
*/

import { getUserData } from "@decentraland/Identity";
import { UserData } from "@decentraland/Players";

// CLASS
export class PlayerState {
    bIsDebug: boolean = false;

    // data for the player
    playerScore: number = 0;
    playerHealth: number = 0;

    data: UserData

    constructor(){}


    //  initialize the player's required resources
    //  mainly defined as interface linkage to inheriting classes
    public async Initialize()
    {
        // initialize properties
        if (this.bIsDebug) { log("player state - initializing..."); }

        // initialize player data
        this.playerScore = 0;
        this.playerHealth = 5;

        // Get UserData from DCL
        const userData = await getUserData();
        this.data = userData as UserData;
    }

    //resets the player's state
    public Reset()
    {
        if(this.bIsDebug) { log("player state - resetting..."); }
    }

    //updates the player's state
    public Update()
    {
        if(this.bIsDebug) { log("player state - updating..."); }
    }

}