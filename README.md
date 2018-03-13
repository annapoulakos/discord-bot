# discord-bot

A simple, pluggable Discord bot. This bot was originally written to serve Magic: the Gathering cards to users, but is now also serving any number of plugins across a variety of topics.

#### Configuration

Create a `config.json` file containing the Discord tokens for rooms you want the bot to be a part of. You will additionally have to configure the other pieces of the Discord stack separately. Replace the `NAME` and `DISCORD_BOT_TOKEN` with the name of the discord you are using and the appropriate bot token. You can set `run` to `false in order to disable the bot the next time it starts.

#### Running

Running the bot is a simple command: `node bot.js ./config.example.json` (using your actual config file).
