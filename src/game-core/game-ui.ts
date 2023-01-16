import * as ui from '@dcl/ui-scene-utils'

import { PlayerState } from "./player-state"
import { PlayerUI } from "./player-ui"

export class GameUI {
    canvas: UICanvas
    player: PlayerState
    playerUI: PlayerUI

    constructor(){

    }

    show() {
        // 
    }

    hide() {
        //
    }

    notify(message: string, duration?: number, color?: Color4) {
        duration ||= 3
        color ||= Color4.White()

        ui.displayAnnouncement(message, duration, color)
    }

    displayGameOver(ending: string) {
        // 
    }
}