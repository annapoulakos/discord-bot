# Slay the Spire Plugin

This plugin allows users to retrieve information about Slay the Spire cards.

#### Using this plugin

* Update `bot.js` to include the following:
    ```javascript
    let StsPlugin = require('./plugins/sts');

    manager.register(StsPlugin);
    ```
* In Discord, run `/slay --help` for more detailed usage instructions.

#### Notes

This plugin displays the card image by default for cards you search for.

This plugin displays a small information panel for relics you search for.

The detailed information panel will give detailed card information.

The data for this is static, and does not necessarily reflect recent changes to the game.
