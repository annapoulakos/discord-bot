class PluginManager {
    constructor () {
        this._plugins = {};
    }

    register (plugin) {
        let p = new plugin();
        console.log(`Registering plugin: ${p.constructor.name}`);

        this._plugins[p.constructor.name] = p;
    }

    trigger (client, msg) {
        for (let key in this._plugins) {
            if (msg.content.startsWith('/plugin')) {
                let keys = Object.keys(this._plugins);
                msg.reply('\n**Available Plugins (' + keys.length + '):**\n```' + keys.map(k => this._plugins[k].toString()).join('\n') + '```');
                return;
            }

            if (this._plugins.hasOwnProperty(key) && this._plugins[key].trigger(msg.content)) {
                console.log(`Triggered: ${key}`);
                this._plugins[key].run(client, msg);
            }
        }
    }
}

module.exports = PluginManager;
