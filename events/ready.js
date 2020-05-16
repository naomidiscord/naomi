const EventStructure = require('../src/structures/EventStructure');

class Ready extends EventStructure {
    constructor() {
        super({
            name: 'ready'
        });
    }

    async run(client) {
        console.log(`Logged in successfully`);
    }
}

module.exports = Ready;