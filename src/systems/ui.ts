import * as ui from '@dcl/ui-scene-utils'

@Component('SimpleUI')
export class SimpleUI {
    // UI elements
    canvas: UICanvas
    container: UIContainerStack
    message: UIText
    cards: UIText
    cardsShadow: UIText

    // UI data
    cardsCollected: number = 0
    cardsTotal: number = 5

    // instance is a static property that will hold the instance of the SimpleUI class
    static instance: SimpleUI | null = null;

    // createInstance is a static method that will create a new instance of the SimpleUI class
    static createInstance() {
        if (SimpleUI.instance == null) {
            log('creating new instance of SimpleUI')
            SimpleUI.instance = new SimpleUI()
        }
    }

    constructor() {
        log('creating new SimpleUI')
        SimpleUI.instance = this

        // show welcome message
        const welcomeMessage = new ui.OkPrompt(
            "Welcome to the Wallgreens Building!\nCollect all 5 cards to win!\nPress OK to start",
            () => {
                log('user clicked OK')
                this.show()
            }
        )
        welcomeMessage.text.hTextAlign = 'center'
        welcomeMessage.text.vTextAlign = 'center'
        welcomeMessage.text.fontAutoSize = true
        // welcomeMessage.text.
    }

    show() {
        this.canvas = new UICanvas()
        this.canvas.visible = true


        // Create a textShape component, setting the canvas as parent
        this.container = new UIContainerStack(this.canvas)
        // container.adaptWidth = true
        this.container.adaptHeight = true
        this.container.width = "50px"
        this.container.positionY = 0
        this.container.positionX = "-10px"
        this.container.color = Color4.White()
        this.container.hAlign = "right"
        this.container.vAlign = "top"
        this.container.stackOrientation = UIStackOrientation.VERTICAL
        this.container.opacity = 1

        const message = new UIText(this.container)
        // const message = new UIText(this.canvas)
        message.value = "Cards:"
        message.fontSize = 15
        message.width = 70
        message.height = 30
        message.vTextAlign = "top"
        message.hTextAlign = "center"
        message.paddingLeft = 10
        message.paddingRight = 10
        message.paddingTop = 10
        message.paddingBottom = 10
        message.color = Color4.Black()

        this.cards = new UIText(this.container)
        this.cards.value = `${this.cardsCollected}/${this.cardsTotal}`
        this.cards.fontSize = 25
        this.cards.color = new Color4(1, .3, .15, 1)
        this.cards.width = 70
        this.cards.height = 30
        this.cards.hTextAlign = "center"
        this.cards.vTextAlign = "top"
        this.cards.positionX = 0

        this.cardsShadow = new UIText(this.cards)
        this.cardsShadow.value = `${this.cardsCollected}/${this.cardsTotal}`
        this.cardsShadow.fontSize = 25
        this.cardsShadow.color = Color4.Black()
        this.cardsShadow.width = 70
        this.cardsShadow.height = 30
        this.cardsShadow.hTextAlign = "center"
        this.cardsShadow.vTextAlign = "top"
        this.cardsShadow.positionX = -1.5
        this.cardsShadow.positionY = 1

        // const logoBackground = new UIButton(this.canvas)
        // logoBackground.width = 32
        // logoBackground.height = 32
        // logoBackground.positionX = "-65px"
        // logoBackground.positionY = 15
        // logoBackground.hAlign = "right"
        // logoBackground.vAlign = "top"
        // logoBackground.color = Color4.Black()
        // logoBackground.opacity = 0.5
        // logoBackground.visible = true
        // logoBackground.background = Color4.Black()
        // logoBackground.text = ""

        const logoImage = new Texture('models/Walgreens-Logo.png', { hasAlpha: true })
        const logoAvatar = new AvatarTexture('models/Walgreens-Logo.png')
        const logo = new UIImage(this.canvas, logoImage)
        logo.width = 32
        logo.height = 32
        logo.sourceWidth = 1024
        logo.sourceHeight = 1024
        logo.positionX = "-65px"
        logo.positionY = 15
        logo.hAlign = "right"
        logo.vAlign = "top"
    }

    updateCollectedCards() {
        // increment the number of cards collected
        this.cardsCollected++
        // update the UI
        this.cards.value = `${this.cardsCollected}/${this.cardsTotal}`
        this.cardsShadow.value = `${this.cardsCollected}/${this.cardsTotal}`
        

        // max out at the total number of cards
        if (this.cardsCollected > this.cardsTotal) {
            this.cardsCollected = this.cardsTotal
        }

        // if all cards are collected, show the message
        if (this.cardsCollected == this.cardsTotal) {
            const winPrompt = new ui.OkPrompt(
                `All cards collected!\nYou have collected all the cards in this scene.\nThank you for playing!`,
                () => { log("OK") }
            )
            winPrompt.text.hTextAlign = 'center'
            winPrompt.text.vTextAlign = 'center'
            winPrompt.text.fontAutoSize = true
        }
    }
}


// Create a new instance of the SimpleUI class
new SimpleUI();