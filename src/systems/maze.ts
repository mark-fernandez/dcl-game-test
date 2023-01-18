import { Map } from "./map";
import { shuffle } from "./utils";
import * as utils from '@dcl/ecs-scene-utils'

// Maze map, key is the {x, y} position, value is the type of tile
type MazeMap = {
  key: { x: number; z: number };
  value: number;
}[];

/** Old Maze class **
export class Maze extends Entity {
  // Static instance of the class
  protected static instance: Maze;

  // createInstance is a static method that will create a new instance of the SimpleUI class
  protected static createInstance(width: number, depth: number) {
    if (Maze.instance == null) {
      log("creating new instance of SimpleUI");
      Maze.instance = new Maze(width, depth);
    }
  }

  // Maze dimensions
  width: number;
  depth: number;
  map: MazeMap = [];
  wallShape = new BoxShape();
  transform = new Transform({
    position: new Vector3(0.5, 0.5, 0.5),
  });

  // map: {key: {x: number, z: number}, value: number}[]

  constructor(width: number, depth: number) {
    super();
    // Maze.instance = this
    this.width = width;
    this.depth = depth;
    engine.addEntity(this);
    this.addComponent(this.transform);

    // Initialize the map
    this.InitializeMap();
    this.Generate();
    this.DrawMap();
    log(`this.map: `, this.map);
  }

  InitializeMap(): void {
    // this.map.push({key:{x: 0, z:0}, value: 1})
    for (let z = 0; z < this.width; z++) {
      // this.map.key[z] = []
      for (let x = 0; x < this.depth; x++) {
        // 1 = wall, 0 = path
        this.map.push({
          key: { x, z },
          value: 1,
        });
      }
    }
  }

  protected Generate(): void {
    let i = -1;
    // Generate the path
    for (let z = 0; z < this.width; z++) {
      for (let x = 0; x < this.depth; x++) {
        i++;
        const randNum = Math.round(Math.random() * 100);
        if (randNum < 50) {
          // Set the path | 1 = wall, 0 = path
          this.map[i].value = 0;
          // log(`\nindex: ${i}\n{${z}, ${x}} = 0\nrandNum: ${randNum}`)
        }
      }
    }
  }

  DrawMap(): void {
    let i = -1;
    for (let z = 0; z < this.width; z++) {
      for (let x = 0; x < this.depth; x++) {
        i++;
        if (this.map[i].value == 1) {
          const xLoc = this.map[i].key.x * 2;
          const zLoc = this.map[i].key.z * 2;
          this.PlaceWall(xLoc, zLoc);
        }
      }
    }
  }

  PlaceWall(x: number, z: number): void {
    // Draw a wall
    const wall = new Entity();
    wall.addComponent(
      new Transform({
        position: new Vector3(x, 0, z),
        scale: new Vector3().setAll(2),
      })
    );
    wall.addComponent(this.wallShape);
    // wall.addComponent(new BoxShape())
    wall.setParent(this);
    // engine.addEntity(wall)
  }
}

// crawler class inherits from the maze class
export class Crawler extends Maze {
  // Crawler position
  position: Vector2;

  // Crawler direction
  direction: Vector3;

  constructor(width: number, depth: number) {
    super(width, depth);
    Crawler.instance = this;
  }

  // Override the Generate method
  Generate(): void {
    // let done: boolean = false;
    // let x: number = this.width / 2;
    // let z: number = this.depth / 2;
    // let i: number = -1;

    // log("Generating the path...")
    // log(`Starting Pos: {x: ${this.map[x + z * this.depth].key.x}, z: ${this.map[x + z * this.depth].key.z}}`)
    // const crawlerArray: Vector2[] = []
    // while (!done)
    // {
    //     // get the index of the map by multiplying the x and z by the width
    //     // this gets the value of the map at the current position
    //     // i = x + z * this.width; // index of the map
    //     i = x + z * this.depth; // index of the map
    //     this.map[i].value = 0 // set the path

    //     // Pick a random direction to move the crawler
    //     if ( Math.round(Math.random()*100) < 50 ) {
    //         // move the crawler in the x direction by 1 or -1
    //         // x += Math.round(Math.random() * 2 - 1);
    //         x += Math.round(Math.random() * 2 - .5);
    //     }else{
    //         // move the crawler in the z direction by 1 or -1
    //         z += Math.round(Math.random() * 2 - 1);
    //     }

    //     // add the new position to the crawler array
    //     crawlerArray.push(new Vector2(x, z))

    //     // check if the crawler is out of bounds
    //     done ||= (x < 0 || x >= this.width || z < 0 || z >= this.depth);

    // }
    // log("Done generating the path...")
    // log("crawlerArray: ", crawlerArray)

    this.CrawlHorizontal();
    this.CrawlVertical();
  }

  CrawlHorizontal(): void {
    let done: boolean = false;
    let i: number = -1;

    let x: number = Math.round(Math.random() * this.width);
    let z: number = 0;

    log("Generating the horizontal path...");
    log(
      `Starting Hor Pos: {x: ${this.map[x + z * this.depth].key.x}, z: ${
        this.map[x + z * this.depth].key.z
      }}`
    );
    const crawlerArray: Vector2[] = [];
    while (!done) {
      // get the index of the map by multiplying the x and z by the width
      // this gets the value of the map at the current position
      // i = x + z * this.width; // index of the map
      i = x + z * this.depth; // index of the map
      this.map[i].value = 0; // set the path

      // Pick a random direction to move the crawler
      if (Math.round(Math.random() * 100) < 50) {
        // move the crawler in the x direction by 1 or -1
        // x += Math.round(Math.random() * 2 - 1);
        x += Math.round(Math.random() * 2 - 1);
      } else {
        // move the crawler in the z direction by 1 or -1
        z += Math.round(Math.random() * 2 - 0.5);
      }

      // add the new position to the crawler array
      crawlerArray.push(new Vector2(x, z));

      // check if the crawler is out of bounds
      done ||= x < 0 || x >= this.width || z < 0 || z >= this.depth;
    }
    log("crawlerArray: ", crawlerArray);
    log("Done generating the path...");
  }

  CrawlVertical(): void {
    let i: number = -1;
    let done: boolean = false;

    let x: number = 0;
    let z: number = Math.round(Math.random() * this.depth);

    log("Generating the vertical path...");
    log(
      `Starting Vert Pos: {x: ${this.map[x + z * this.depth].key.x}, z: ${
        this.map[x + z * this.depth].key.z
      }}`
    );
    const crawlerArray: Vector2[] = [];
    while (!done) {
      // get the index of the map by multiplying the x and z by the width
      // this gets the value of the map at the current position
      // i = x + z * this.width; // index of the map
      i = x + z * this.depth; // index of the map
      this.map[i].value = 0; // set the path

      // Pick a random direction to move the crawler
      if (Math.round(Math.random() * 100) < 50) {
        // move the crawler in the x direction by 1 or -1
        // x += Math.round(Math.random() * 2 - 1);
        x += Math.round(Math.random() * 2 - 0.5);
      } else {
        // move the crawler in the z direction by 1 or -1
        z += Math.round(Math.random() * 2 - 1);
      }

      // add the new position to the crawler array
      crawlerArray.push(new Vector2(x, z));

      // check if the crawler is out of bounds
      done ||= x < 0 || x >= this.width || z < 0 || z >= this.depth;
    }
    log("crawlerArray: ", crawlerArray);
    log("Done generating the path...");
  }
}
*/

//** ================================================================================================================ **//
//** ================================================================================================================ **//

export class Maze extends Entity {
  // Static instance of the class
  protected static instance: Maze;

  // createInstance is a static method that will create a new instance of the SimpleUI class
  protected static createInstance(width: number, depth: number) {
    if (Maze.instance == null) {
      log("creating new instance of SimpleUI");
      Maze.instance = new Maze(width, depth);
    }
  }

  // Maze dimensions
  width: number;
  depth: number;

  directions: Vector2[] = [
    new Vector2(0, 1), // up
    new Vector2(0, -1), // down
    new Vector2(1, 0), // right
    new Vector2(-1, 0), // left
  ];

  // Maze map
  map: Map<string, number> = new Map<string, number>();

  // Maze components
  wallShape = new BoxShape();
  transform = new Transform({
    position: new Vector3(0.5, 0.5, 0.5),
  });

  constructor(width: number, depth: number) {
    super();
    Maze.instance = this;
    this.width = width;
    this.depth = depth;
    engine.addEntity(this);
    this.addComponent(this.transform);

    // Initialize the map
    this.InitializeMap();
    this.Generate();
    // this.DrawMap();
    log(`this.map: `, this.map);
  }

  InitializeMap(): void {
    for (let z = 0; z < this.width; z++) {
      // this.map.key[z] = []
      for (let x = 0; x < this.depth; x++) {
        // 1 = wall, 0 = path
        this.map[`${x},${z}`] = 1;
      }
    }
  }

  Generate(): void {
    // Generate the path
    for (let z = 0; z < this.width; z++) {
      for (let x = 0; x < this.depth; x++) {
        const randNum = Math.round(Math.random() * 100);
        if (randNum < 50) {
          // Set the path | 1 = wall, 0 = path
          this.map[`${x},${z}`] = 0;
          // log(`\nindex: ${i}\n{${z}, ${x}} = 0\nrandNum: ${randNum}`)
        }
      }
    }
  }

  DrawMap(): void {
    for (let z = 0; z < this.width; z++) {
      for (let x = 0; x < this.depth; x++) {
        if (this.map[`${x},${z}`] == 1) {
          this.PlaceWall(x * 2, z * 2);
        }
      }
    }
  }

  PlaceWall(x: number, z: number): void {
    // Draw a wall
    const wall = new Entity();
    wall.addComponent(
      new Transform({
        position: new Vector3(x, 0, z),
        scale: new Vector3().setAll(2),
      })
    );
    wall.addComponent(this.wallShape);
    // wall.addComponent(new BoxShape())
    wall.setParent(this);
    // engine.addEntity(wall)

    // Add label above the wall, if the wall is on an edge
    if (x == 0 || x == this.width * 2 - 2 || z == 0 || z == this.depth * 2 - 2)
    {
      const wallLabel = utils.addLabel(` {${x/2}, ${z/2}} `, wall, false, Color3.Red(), 2, new Transform({ position: new Vector3(0, .75, 0) }));
      wallLabel.setParent(wall);
    }
  }

  /**
   * This function will count the number of cardinal neighbors that are walls, and return the count.
   * It checks the 4 cardinal directions( up, down, left, right ).
   * @param x  x position of the cell
   * @param z  z position of the cell
   * @returns number of cardinal neighbors that are walls
   */
  public CountSquareNeighbors(x: number, z: number): number {
    let count: number = 0;

    // log(`counting neighbors of {${x}, ${z}}...`)

    // Check if the current cell is on an edge
    if (x <= 0 || x >= this.width - 1 || z <= 0 || z >= this.depth - 1)
      return 5;

    // Check the neighbors
    if (this.map[`${x + 1},${z}`] == 0) count++; // right
    if (this.map[`${x - 1},${z}`] == 0) count++; // left
    if (this.map[`${x},${z + 1}`] == 0) count++; // up
    if (this.map[`${x},${z - 1}`] == 0) count++; // down

    return count;
  }

  /**
   * This function will count the number of diagonal neighbors that are walls, and return the count.
   * It checks the 4 diagonal directions( up right, up left, down right, down left ).
   * @param x  x position of the cell
   * @param z  z position of the cell
   * @returns number of diagonal neighbors that are walls
   */
  public CountDiagonalNeighbors(x: number, z: number): number {
    let count: number = 0;

    // log(`counting neighbors of {${x}, ${z}}...`)

    // Check if the current cell is on an edge
    if (x <= 0 || x >= this.width - 1 || z <= 0 || z >= this.depth - 1)
      return 5;

    // Check the neighbors
    if (this.map[`${x + 1},${z + 1}`] == 0) count++; // up right
    if (this.map[`${x - 1},${z + 1}`] == 0) count++; // up left
    if (this.map[`${x + 1},${z - 1}`] == 0) count++; // down right
    if (this.map[`${x - 1},${z - 1}`] == 0) count++; // down left

    return count;
  }

  /**
   * This function will count the number of neighbors that are walls, and return the count.
   * It checks the 8 cardinal directions( up, down, left, right, up right, up left, down right, down left ).
   * @param x  x position of the cell
   * @param z  z position of the cell
   * @returns number of neighbors that are walls
   */
  public CountAllNeighbors(x: number, z: number): number {
    return this.CountSquareNeighbors(x, z) + this.CountDiagonalNeighbors(x, z);
  }
}

//** ================================================================================================================ **//
// crawler class inherits from the maze class
export class Crawler extends Maze {
  constructor(width: number, depth: number) {
    super(width, depth);
  }

  // Override the Generate method
  Generate(): void {
    this.CrawlHorizontal();
    this.CrawlVertical();
  }

  CrawlHorizontal(): void {
    let done: boolean = false;

    let x: number = Math.round(Math.random() * this.width);
    let z: number = 0;

    log("Generating the horizontal path...");
    const crawlerArray: Vector2[] = [];
    while (!done) {
      // get the index of the map by multiplying the x and z by the width
      // this gets the value of the map at the current position
      this.map[`${x},${z}`] = 0; // set the path

      // Pick a random direction to move the crawler
      if (Math.round(Math.random() * 100) < 50) {
        // move the crawler in the x direction by 1 or -1
        // x += Math.round(Math.random() * 2 - 1);
        x += Math.round(Math.random() * 2 - 1);
      } else {
        // move the crawler in the z direction by 1 or -1
        z += Math.round(Math.random() * 2 - 0.5);
      }

      // add the new position to the crawler array
      crawlerArray.push(new Vector2(x, z));

      // check if the crawler is out of bounds
      done ||= x < 0 || x >= this.width || z < 0 || z >= this.depth;
    }
    log("crawlerArray: ", crawlerArray);
    log("Done generating the path...");
  }
  CrawlVertical(): void {
    let done: boolean = false;

    let x: number = 0;
    let z: number = Math.round(Math.random() * this.depth);

    log("Generating the vertical path...");
    const crawlerArray: Vector2[] = [];
    while (!done) {
      this.map[`${x},${z}`] = 0; // set the path

      // Pick a random direction to move the crawler
      if (Math.round(Math.random() * 100) < 50) {
        // move the crawler in the x direction by 1 or -1
        // x += Math.round(Math.random() * 2 - 1);
        x += Math.round(Math.random() * 2 - 0.5);
      } else {
        // move the crawler in the z direction by 1 or -1
        z += Math.round(Math.random() * 2 - 1);
      }

      // add the new position to the crawler array
      crawlerArray.push(new Vector2(x, z));

      // check if the crawler is out of bounds
      done ||= x < 0 || x >= this.width || z < 0 || z >= this.depth;
    }
    log("crawlerArray: ", crawlerArray);
    log("Done generating the path...");
  }
}

// recursive crawler class inherits from the maze class
export class RecursiveCrawler extends Maze {
  debug: boolean = false;
  entryPoints: Vector2[] = [];

  constructor(width: number, depth: number) {
    super(width, depth);

    this.DebugLog("Initializing the Recursive Crawler...");
  }

  // Override the Generate method
  Generate(): void {
    const x: number = Math.round(Math.random() * this.width);
    // const x: number = 0;
    const z: number = Math.round(Math.random() * this.depth);
    this.DebugLog("Generating the path...");
    this.DebugLog(`Starting Point: x: ${x}, z: ${z}`);

    this.RecursiveCrawl(x, z);
    this.CreateEntryPoints(5);
  }

  /**
   * This function will recursively crawl through the maze and creates a path.
   * @param x The x position to start the recursive crawl
   * @param z The z position to start the recursive crawl
   */
  RecursiveCrawl(x: number, z: number): void {
    // check if the crawler is out of bounds
    // if (x < 1 || x >= this.width || z < 1 || z >= this.depth) return;

    this.DebugLog("Neighbors: ", this.CountSquareNeighbors(x, z));
    if (this.CountSquareNeighbors(x, z) >= 2) return;
    // create a corridor
    this.map[`${x},${z}`] = 0;

    // log directions before shuffle
    this.DebugLog("Directions: ", this.directions);

    // shuffle the directions
    this.DebugLog("Shuffling directions...");
    // this.directions = shuffle(this.directions);
    this.directions = this.directions.sort(() => Math.random() - 0.5); // shuffle the directions

    // log directions after shuffle
    this.DebugLog("Directions: ", this.directions);

    this.RecursiveCrawl(x + this.directions[0].x, z + this.directions[0].y);
    this.RecursiveCrawl(x + this.directions[1].x, z + this.directions[1].y);
    this.RecursiveCrawl(x + this.directions[2].x, z + this.directions[2].y);
    this.RecursiveCrawl(x + this.directions[3].x, z + this.directions[3].y);
  }

  /**
   * This function will randomly create an entry point for the maze. Takes the number of entry points to create.
   * Uses the CountAllNeighbors function to determine if the entry point is valid.
   * @param numberOfEntryPoints The number of entry points to create
   */
  CreateEntryPoints(numberOfEntryPoints: number): void {
    this.debug = true;
    
    // create the entry points
    for (let i = 0; i < numberOfEntryPoints; i++) {
      this.DebugLog(`Creating entry point, index: ${i}`);
      // randomly generate an entry point at the edge of the maze
      // choose a random edge of the maze, by choosing a random x or z value
      var { x, z }: { x: number; z: number; } = this.ChooseRndMazeEdge();


      // check if the entry point is valid by checking if the entry point has any neighbors
      // depending on the starting point, check the neighbors in the appropriate direction
      let result = this.CheckIfEntryPointIsValid(x, z);
      this.DebugLog(`Entry point is valid: ${result}`);

      // if the entry point is not valid, then decrement the counter so that the loop will run again
      if(!result){
        if (i > 0){
          this.DebugLog(`Entry point is not valid, decrementing counter...${i}`);
          i--;
          continue;
        }
        else
        {
          this.DebugLog(`Entry point is not valid, but counter is 0, so skipping...`);
          continue;
        }
      }

      // increment the counter
      this.DebugLog(`Entry point is valid, incrementing counter...${i}`);
      // i++;
    }

    // log the entry points
    this.DebugLog("Entry Points: ", this.entryPoints);
  }

  /**
   * This function uses a random number to choose a random edge of the maze.
   * @returns A Vector2 object with the x and z values of the edge of the maze.
   */
  private ChooseRndMazeEdge() {
    const randNum = Math.round(Math.random() * 100);
    // this.DebugLog("randNum: ", randNum);
    if (randNum < 25) {
      // choose the left edge
      var x: number = 0;
      var z: number = Math.round(Math.random() * this.depth);
      this.DebugLog("Choosing the left edge...", x, z);
    }
    else if (randNum < 50) {
      // choose the right edge
      var x: number = this.width - 1;
      var z: number = Math.round(Math.random() * this.depth);
      this.DebugLog("Choosing the right edge...", x, z);
    }
    else if (randNum < 75) {
      // choose the bottom edge
      var x: number = Math.round(Math.random() * this.width);
      var z: number = 0;
      this.DebugLog("Choosing the bottom edge...", x, z);
    }
    else {
      // choose the top edge
      var x: number = Math.round(Math.random() * this.width);
      var z: number = this.depth - 1;
      this.DebugLog("Choosing the top edge...", x, z);
    }
    return { x, z };
  }

  private CheckIfEntryPointIsValid(x: number, z: number): boolean {
    if (x == 0) {
      // check the right side, if the entry point has any neighbors, then it is not valid
      if (
        this.map[`${x + 1},${z}`] == 0 || 
        this.map[`${x + 1},${z + 1}`] == 0 || 
        this.map[`${x + 1},${z - 1}`] == 0
        ) {
        // entry point is valid, create the entry point
        this.map[`${x},${z}`] = 0;  this.DebugLog(`line635\nEntry Point: `, new Vector2(x, z));

        // add the entry point to the array
        // this.entryPoints.push(new Vector2(x, z));

        // check
        return true;
      }
    }
    else if (x == this.width - 1) {
      // check the left side, if the entry point has any neighbors, then it is not valid
      if (
        this.map[`${x - 1},${z}`] == 0 || 
        this.map[`${x - 1},${z + 1}`] == 0 || 
        this.map[`${x - 1},${z - 1}`] == 0
      ) {
        // entry point is valid, create the entry point
        this.map[`${x},${z}`] = 0;  this.DebugLog(`line652\nEntry Point: `, new Vector2(x, z));

        // add the entry point to the array
        // this.entryPoints.push(new Vector2(x, z));

        return true;
      }
    }
    else if (z == 0) {
      // check the bottom side, if the entry point has any neighbors, then it is not valid
      if (
        this.map[`${x},${z + 1}`] == 0 || 
        this.map[`${x + 1},${z + 1}`] == 0 || 
        this.map[`${x - 1},${z + 1}`] == 0
      ) {
        // entry point is valid, create the entry point
        this.map[`${x},${z}`] = 0;  this.DebugLog(`line668\nEntry Point: `, new Vector2(x, z));

        // add the entry point to the array
        // this.entryPoints.push(new Vector2(x, z));

        return true;
      }
    }
    else if (z == this.depth - 1) {
      // check the top side, if the entry point has any neighbors, then it is not valid
      if (
        this.map[`${x},${z - 1}`] == 0 || 
        this.map[`${x + 1},${z - 1}`] == 0 || 
        this.map[`${x - 1},${z - 1}`] == 0
        ) {
        // check if the entry point has any neighbors
        // entry point is valid, create the entry point
        this.map[`${x},${z}`] = 0;  this.DebugLog(`line685\nEntry Point: `, new Vector2(x, z));

        // add the entry point to the array
        // this.entryPoints.push(new Vector2(x, z));

        return true;
      }
    }

    // entry point is not valid
    return false;
  }

  /**
   * This method logs a message to the console if the debug flag is set to true.
   * @param message The message to log
   * @param optionalParams The optional parameters to log
   */
  DebugLog(message: string, ...optionalParams: any[]): void {
    if (this.debug) {
      log(message, optionalParams);
    }
  }
}
