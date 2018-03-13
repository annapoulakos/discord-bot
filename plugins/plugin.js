let
    Discord = require('discord.js'),
    Logger = require('../libs/logger.js')
    ;

class Plugin {
    constructor (data) {
        let logger = new Logger('Setup');
        logger.log(`Building ${this.constructor.name}`);
        Object.assign(this, data);
    }

    trigger (content) {
        if (content.startsWith(this._trigger)) {
            this._query = content.replace(this._trigger, '').trim();
            return true;
        }

        return false;
    }

    run (client, msg) {
        this.logger = new Logger(client);
        this.logger.log(`Request triggered on ${msg.content}`);
        this.logger.log(`By User: ${msg.author.username}`);

        Object.assign(this, this._parseCommand());

        return;
    }

    VERSION (msg) {
        let embed = this._buildEmbed(`Version ${this.version}`);
        this.changelog.forEach(change => {
            embed.addField(change.version, '```' + change.changes.join('\n') + '```');
        });

        msg.channel.send({embed});
    }

    HELP (msg) {
        let embed = this._buildEmbed('Help Documentation');
        embed.setDescription(this.help.description);

        this.help.commands.forEach(command => {
            let data = [
                '`' + command.command + '`',
                command.help_text
            ];
            if (command.hasOwnProperty('key')) {
                let aliases = this.commands.filter(c => c.key == command.key);
                if (aliases.length > 0) {
                    data.push('Aliases: ' + aliases[0].aliases.join(', '));
                }
            }

            embed.addField(command.name, data.join('\n'));
        });

        if (this.help.additional_fields.length > 0) {
            this.help.additional_fields.forEach(f => embed.addField(f.name, f.help_text));
        }

        msg.channel.send({embed});
    }

    _parseCommand () {
        let command = 'DEFAULT', query = this._query;
        this.commands.forEach(cmd => {
            cmd.aliases.forEach(alias => {
                if (this._query.startsWith(alias)) {
                    command = cmd.key;
                    query = this._query.replace(alias, '').trim();
                }
            });
        });

        return {command, query};
    }

    _buildEmbed (title) {
        let embed = new Discord.RichEmbed()
            .setTitle(title)
            .setFooter('lovingly crafted by a bot for your reading pleasure')
            .setTimestamp();
        return embed;
    }
}

module.exports = Plugin;
