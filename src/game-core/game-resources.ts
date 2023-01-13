/*      GAME RESOURCES
    used to manage overhead resources for card games. the main utility is maintaining 
    a single set of card data and objects used between multiple card games a single table.
    this massively reduces in-scene requirements, as each card game can just interact with this
    class to get their resources instead of generating their own.

    if a resource or data is a common requirement across multiple games, then is should be placed here. this
    includes references to menu state display, card objects, and card data. in-scene objects (such as
    groups and cards) should still be moved/have positioning maintained within card game manager class.

    NOTE: objects are not destroyed between games, but are removed from scene rendering. this cuts
    down on processing usage by always retaining generated decks at a slight hit to memory (which is
    currently worth it).
*/