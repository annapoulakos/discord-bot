let 
    Discord = require('discord.js'),
    Plugin = require('../plugin.js'),
    Database = require('./database.js'),
    Logger = require('../libs/logger.js')
    ;

class SlayTheSpirePlugin extends Plugin {
    constructor () {
        let 
            logger = new Logger('SlayTheSpirePlugin'),
            data = require('./data.json')
            ;
        
        logger.log('Beginning Setup Phase...');
        super(data);

        logger.log('Loading database...');
        this._db = new Database();

        logger.log('Setup complete!');
    }

    run (clientId, msg) {
        super.run(clientId, msg);

        let [command, query] = this._parseCommand(this._query);
        this._query = query;

        this.logger.log(`Executing command: ${command}`);
        this.logger.log(`For user: ${msg.author.username}`);
        this.logger.log(`With Query: ${query}`);

        this[command](msg);
    }

    DEFAULT (msg) {
        this.logger.log('--- DEFAULT ---');
        this.logger.log(`-> Query: ${this._query}`);

        let card = this._db.findOne(this._query);
        this.logger.log(`-> Card: ${JSON.stringify(card)}`);
    

        if (!card) {
            msg.reply(`Unable to find ${this._query}`);
            return;
        }

        if (card.type == 'Relic') {
            let embed = this._buildEmbed(card);
            msg.channel.send({embed});
            return;
        }

        msg.reply(card.img);
    }

    INFO (msg) {
        this.logger.log('--- INFO ---');
        this.logger.log(`Query: ${this._query}`);

        let card = this._db.findOne(this._query);
        if (!card) {
            msg.reply(`Unable to find ${this._query}`);
            return;
        }
        let embed = this._buildEmbed(card);

        msg.channel.send({embed});
    }

    _buildEmbed (card) {
        let embed = new Discord.RichEmbed();

        embed.setTitle(card.name);
        embed.setThumbnail(card.img);

        switch (card.type) {
            case 'Relic':
                embed.setDescription(card.oracle);
                embed.addField('Details', `Rarity: ${card.rarity}`);
                break;
            case 'Curse':
                embed.setDescription(card.oracle);
                break;
            case 'Status':
                embed.setDescription(card.basic.oracle);
                if (card.hasOwnProperty('upgraded')) {
                    embed.addField('Upgraded', card.upgraded.oracle);
                }
                break;
            default:
                embed.setDescription(`Energy: ${card.basic.energy}\n\n${card.basic.oracle}`);
                embed.addField('Upgraded', `Energy: ${card.upgraded.energy}\n\n${card.upgraded.oracle}`);
                embed.addField('Details', `Rarity: ${card.rarity}\nType:${card.type}\nSuper Type: ${card.supertype}`);
                break;
        }

        return embed;
    }
}

module.exports = SlayTheSpirePlugin;
