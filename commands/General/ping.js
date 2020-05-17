const CommandStructure = require('../../src/structures/CommandStructure');

class Ping extends CommandStructure {
    constructor() {
        super({
            name: 'ping',
            description: 'Check the bot\'s latency to Discord',
            group: 'General'
        });
    }

    async run(client, message, args) {
        const msg = await message.channel.send(`Ping?`);
        return msg.edit(`Pong! Latency: ${Math.round(client.ws.ping)}ms gateway, ${Math.round(msg.createdTimestamp - message.createdTimestamp)}ms REST`);
    }
}

module.exports = Ping;