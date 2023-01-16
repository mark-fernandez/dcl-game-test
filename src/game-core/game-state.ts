/*      GAME STATE
    base class used to hold all data regarding a game
    this class should be modified for each specific game, individually
    defining such thing as their player count and collections
    this class should be extended by the game's main class
    this class should also be a singleton
*/


// CLASS
export class GameState {
    bIsDebug: boolean = false;
    bIsPaused: boolean = false;

    // game's current state
    // 0 = not started
    // 1 = in progress
    // 2 = paused
    // 3 = game over | ended
    gameState: number = 0;

    // game's current time
    gameTime: number = 0;

    
    constructor()
    {
        // initialize properties
        if (this.bIsDebug) { log("game state - initializing..."); }

        

        // initialize game state
        this.gameState = 0;
    }

    //  initialize the game's required resources
    //  mainly defined as interface linkage to inheriting classes
    public Initialize()
    {
        if(this.bIsDebug) { log("card game manager - DEAD CHECK"); }
    }

    //resets the game's state
    //  this is the standard implemenation, you can create a custom solution within your
    //  inheriting card game manager class if required
    public Reset()
    {
        // reset game state
        if(this.bIsDebug) { log("card game manager - resetting game..."); }
        
        
        if(this.bIsDebug) { log("card game manager - game reset!"); }
    }

    // starts the game
    public NewGame()
    {

    }
    
    // ends the game
    // handles all game ending logic such as displaying the game over screen
    // win / lose UI interactions before resetting the game or removing game objects / resources
    public EndGame()
    {
        if(this.bIsDebug) { log("card game manager - ending game..."); }
        this.gameState = 3;
        if(this.bIsDebug) { log("card game manager - game ended!"); }
    }

    // pauses the game
    public PauseGame()
    {
        if(this.bIsDebug) { log("card game manager - pausing game..."); }
        this.bIsPaused = true;
        if(this.bIsDebug) { log("card game manager - game paused!"); }
    }

    // unpauses the game
    public UnpauseGame()
    {
        if(this.bIsDebug) { log("card game manager - unpausing game..."); }
        this.bIsPaused = false;
        if(this.bIsDebug) { log("card game manager - game unpaused!"); }
    }

    // sets game state
    public SetState(state:number)
    {
        this.gameState = state;
    }

    // returns the game's current state
    public GetState():number
    {
        return this.gameState;
    }

    // returns the game's current time
    public GetTime():number
    {
        return this.gameTime;
    }

}