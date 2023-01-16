/*     MOVEMENT SYSTEM
        manages movement of entities across the all games
    within the scene. this also includes a pooling system to
    take direct control of how many objects can be mobile at
    one time. if a request is made when the number of mobile
    objects is already max an already mobile object will
    be instantly placed at its target destination and the
    requested object will begin to move.
*/

@Component("GameMovementSystem")
export class GameMovementSystem implements ISystem {
    
}