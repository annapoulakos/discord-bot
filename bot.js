const Discord = require('discord.js');
const Logger = require('./libs/logger.js');

const clients = require(process.argv[2]);

let PluginManager = require('./plugins/plugin-manager');
let TestPlugin = require('./plugins/test');

let manager = new PluginManager();
manager.register(TestPlugin);

let configure = client => {
    let logger = new Logger(client.id);
    if (client.run) {
        logger.log(`Starting bot for ${client.id}...`);
        try {
            let bot = new Discord.Client();
            bot.on('ready', () => { logger.log('DiscordBot loaded and accepting responses.'); });
            bot.on('message', msg => manager.trigger(client.id, msg), e => logger.log(`Error -> ${e}`));
            return bot.login(client.token);
        } catch (e) {
            console.log(e);
        }
    } else {
        logger.log('This bot is disabled and will not run');
        return null;
    }
};

let bots = clients.map(configure).filter(c => c);
