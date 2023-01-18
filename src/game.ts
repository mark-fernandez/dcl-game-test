import { Card } from './card'
// import { PowerBase } from './powerBase'
// import { PowerCube } from './powerCube'
import { Sound } from './sound'

import { SimpleUI } from './systems/ui'
import { Maze, Crawler, RecursiveCrawler } from './systems/maze';



// Wallgreens Building
const wallgreens = new Entity()
wallgreens.addComponent(new GLTFShape('models/walgreens_dcl.glb'))
wallgreens.addComponent(new Transform({ 
  position: new Vector3(.03, 0.01, .03),
  scale: new Vector3(1, 1, 1).setAll(1.24789)
}))
engine.addEntity(wallgreens)

// UI
let ui = SimpleUI.instance;
// log("game.ts : ", ui);

// let maze = new Crawler(40, 40);
let maze = new RecursiveCrawler(38, 38);
// maze.transform.position = new Vector3(1, 0, 1);
maze.transform.position = new Vector3(3, 0, 3);
engine.removeEntity(maze);

// Take the map variable from the maze and use it to get placements for the cards
let mazeMap = maze.map;
const cardShape = new GLTFShape('models/card-wallgreens.glb')
const cardBaseShape = new GLTFShape('models/staticBase.glb')
const cardAmount = 5;
const cardArray = [];
const keysToIgnore = [];

// log("Maze size: ", Object.keys(mazeMap).length)
// loop through the map and place cards
for (let i = 0; i < cardAmount; i++) {
    // get a random key from the map
    let { randomValue, randomKey } = GetRndItemFromMazeMap();

    // get the x and z values from the key
    // let x = Math.floor(randomKey / maze.width);
    // let z = randomKey % maze.width;
    let x = parseInt(randomKey.split(",")[0]) + 1;
    let z = parseInt(randomKey.split(",")[1]) + 1;
    // log("x: ", x, "z: ", z);

    // check the distance between the current card and the previous cards
    // if the distance is too close, get a new key
    let distance = 0;
    cardArray.length > 0 && log("cardArray.length: ", cardArray.length);
    for (let j = 0; j < cardArray.length; j++) {
      // log("j: ", j);
      // get the distance between the current card and the previous cards
      const currentCardLoc = new Vector3(x, 0, z);
      distance = Vector3.Distance(
        currentCardLoc,
        cardArray[j].getComponent(Transform).position
        // cardArray[j]
      );
      distance = Math.round(distance);
      // log("distance: ", distance);

      // if the distance is too close, get a new key
      if (distance < 41) {
        // log("distance is too close, getting a new key");
        const newItem = GetRndItemFromMazeMap();
        randomKey = newItem.randomKey;
        randomValue = newItem.randomValue;
        x = parseInt(randomKey.split(",")[0]) + 1;
        z = parseInt(randomKey.split(",")[1]) + 1;
        // log("x: ", x, "z: ", z);
        
        // decrement the j value so that the loop will check the new card against all the previous cards
        // j = -1
        j = j === 0 ? -1 : j - 1;
        continue;
        // break;
      }
      log("distance: ", distance);
    }
    log("distance is good! Creating card...")

    // place the card
    let cardBase = new Entity()
    cardBase.addComponent(cardBaseShape)
    cardBase.addComponent(new Transform({ position: new Vector3(x*2, 0, z*2) }))
    engine.addEntity(cardBase)  

    let card = new Card(
      cardShape,
      new Transform({ position: new Vector3(x*2, 1, z*2) })
      // new Transform({ position: new Vector3(0, 1, 0) })
    )
    // card.setParent(cardBase)
    
    // add the card to the array
    cardArray.push( card );
    log("adding card to array: ", 
    // card.getComponent(Transform).position
    );
    // cardArray.push( new Vector3(x, 0, z) );

    // add the key to the ignore list
    keysToIgnore.push(randomKey);
}

cardArray.forEach(card => {
  log("card position: ", card.getComponent(Transform).position);
  // log("card position: ", card);
})


// Base
// const cardBase = new Entity()
// cardBase.addComponent(new GLTFShape('models/staticBase.glb'))
// engine.addEntity(cardBase)

// Configuration
const Z_OFFSET = 1.5
const GROUND_HEIGHT = 0.55

// Scene objects
// const card = new Card(
//   // new GLTFShape('models/card.glb'),
//   new GLTFShape('models/card-wallgreens.glb'),
//   // new Transform({ position: new Vector3(8, 1.5, 13.5) })
//   new Transform({ position: new Vector3(8, 2, 13.5) })
// )
// const powerBase = new PowerBase(
//   new GLTFShape('models/powerBase.glb'),
//   new Transform(new Transform({ position: new Vector3(8, 0.024, 3.5) }))
// )
// const powerCube = new PowerCube(
//   new GLTFShape('models/powerCube.glb'),
//   new Transform({ position: new Vector3(8, GROUND_HEIGHT, 3.5) })
// )

// Sounds
const cubePickUpSound = new Sound(new AudioClip('sounds/cubePickup.mp3'))
const cubePutDownSound = new Sound(new AudioClip('sounds/cubePutDown.mp3'))

// Controls
// Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
//   const transform = powerCube.getComponent(Transform)
//   if (!powerCube.isGrabbed) {
//     powerCube.isGrabbed = true
//     cubePickUpSound.getComponent(AudioSource).playOnce()

//     // Calculates the crate's position relative to the camera
//     transform.position = Vector3.Zero()
//     transform.rotation = Quaternion.Zero()
//     transform.position.z += Z_OFFSET
//     powerCube.setParent(Attachable.AVATAR)
//   } else {
//     powerCube.isGrabbed = false
//     cubePutDownSound.getComponent(AudioSource).playOnce()

//     // Calculate power cube's ground position
//     powerCube.setParent(null) // Remove parent
//     const forwardVector: Vector3 = Vector3.Forward()
//       .scale(Z_OFFSET)
//       .rotate(Camera.instance.rotation)
//     transform.position = Camera.instance.position.clone().add(forwardVector)
//     transform.lookAt(Camera.instance.position)
//     transform.rotation.x = 0
//     transform.rotation.z = 0
//     transform.position.y = GROUND_HEIGHT
//   }
// })


function GetRndItemFromMazeMap() {

  // get a random key from the map
  let randomKey = `${Math.floor(Math.random() * maze.depth)},${Math.floor(Math.random() * maze.width)}`;
  // log("randomKey : ", randomKey);

  // get the value of the key
  let randomValue = mazeMap[randomKey];
  // let randomValue = mazeMap.get(mazeMap.keys[randomKey]);
  // log("randomValue : ", randomValue);

  // if the key is in the ignore list, get a new key
  while (keysToIgnore.indexOf(randomKey) !== -1) {
    randomKey = `${Math.floor(Math.random() * maze.depth)},${Math.floor(Math.random() * maze.width)}`;
    randomValue = mazeMap[randomKey];
  }

  // check if the value is a wall, if it is, get a new key
  while (randomValue === 1) {
    // log("randomValue is a wall, getting a new key");

    // add the key to the keysToIgnore array
    keysToIgnore.push(randomKey);

    const newItem = GetRndItemFromMazeMap();
    randomKey = newItem.randomKey;
    randomValue = newItem.randomValue;
  }

  return { randomValue, randomKey };
}