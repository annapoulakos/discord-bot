class Logger {
    constructor (clientId) {
        this._clientId = clientId;
    }

    log (msg) {
        let dt = new Date();
        let date = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
        console.log(`[${date} ${this._clientId}] ${msg}`);
    }
}

module.exports = Logger;
