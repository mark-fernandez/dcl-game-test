import * as utils from '@dcl/ecs-scene-utils'

import { Sound } from './sound'
import { SimpleUI } from './systems/ui'

/**
 * Sound is a separated from the card entity so that you can
 * still hear it even when the card is removed from the engine.
 */
const cardPickupSound = new Sound(new AudioClip('sounds/cardPickup.mp3'))

export class Card extends Entity {
  isGrabbed: boolean = false
  ui: SimpleUI
  constructor(model: GLTFShape, transform: Transform) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(transform)

    // Initialize UI
    this.initialize()

    // Create trigger for card
    this.addComponent(
      new utils.TriggerComponent(
        new utils.TriggerBoxShape(
          new Vector3(1, 1, 1),
          new Vector3(0, 0.75, 0)
        ),
        {
          onCameraEnter: () => {
            this.getComponent(Transform).scale.setAll(0)
            cardPickupSound.getComponent(AudioSource).playOnce()
            if (this.ui) {
              log('updating collected cards')
              this.ui.updateCollectedCards()
            }
          },
          onCameraExit: () => {
            engine.removeEntity(this)
          }
        }
      )
    )
  }

  initialize() {
    // Get the UI from the scene
    this.ui = SimpleUI.instance
    // log(this.ui)
  }
}
