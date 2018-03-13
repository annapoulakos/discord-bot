let lev = require('fast-levenshtein')
    JsSearch = require('js-search');

class Database {
    constructor () {
        this._data = [];

        let colorless = require('./data/sts-colorless.json');
        this._data = this._data.concat(colorless.map(c => {
            c.supertype = 'Neutral';
            return c;
        }));

        let curses = require('./data/sts-curses.json');
        this._data = this._data.concat(curses.map(c => {
            c.supertype = 'Effect';
            return c;
        }));

        let ironclad = require('./data/sts-ironclad.json');
        this._data = this._data.concat(ironclad.map(c => {
            c.supertype = 'Ironclad';
            return c;
        }));

        let silent = require('./data/sts-silent.json');
        this._data = this._data.concat(silent.map(c => {
            c.supertype = 'Silent';
            return c;
        }));

        let statuses = require('./data/sts-statuses.json');
        this._data = this._data.concat(statuses.map(c => {
            c.supertype = 'Effect';
            return c;
        }));

        let relics = require('./data/sts-relics.json');
        this._data = this._data.concat(relics.map(r => {
            r.supertype = 'Relic';
            return r;
        }));

        console.log('Slay The Spire database loaded');
        console.log(`${this._data.length} records loaded.`);
    }

    find (cardName) {
        var found = this._getMatches(cardName);

        return found;
    }

    findOne (cardName) {
        console.log('-- database.findOne ---');
        console.log(`-> cardName: ${cardName}`);
        console.log(`-> Searchable Data: ${this._data.length}`);

        let search = new JsSearch.Search('name');
        search.addIndex('name');
        search.addDocuments(this._data);

        let item = search.search(cardName);

        if (!item || item.length == 0) {
            return null;
        }

        return item[0];
    }

    getTopMatches (cardName, limit) {
        var matches = this._getMatches(cardName);

        return matches.slice(0, limit).map(m => m.card);
    }

    _getMatches (cardName) {
        let names = this._data.map(card => {
            return {
                dist: lev.get(cardName, card.name),
                card: card
            };
        });

        names.sort((a,b) => {
            if (a.dist < b.dist) return -1;
            if (a.dist > b.dist) return 1;
            return 0;
        });

        return names;
    }
}

module.exports = Database;
