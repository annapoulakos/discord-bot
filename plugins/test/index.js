let
    Plugin = require('../plugin.js')
    ;

class Test extends Plugin {
    constructor () {
        let data = require('./data.json');
        super(data);
    }

    run (client, msg) {
        super.run(client, msg);

        this[this.command](msg);
    }
}

module.exports = Test;
