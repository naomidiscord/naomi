const CommandStructure = require('../../src/structures/CommandStructure');
const { join } = require('path');
const { stripIndents } = require('common-tags');

class Reload extends CommandStructure {
    constructor() {
        super({
            name: 'reload',
            description: 'Reload a command',
            group: 'Developer',

            args: 1,
            usage: `<command>`,

            developerOnly: true
        });
    }

    async run(client, message, args) {
        const commandName = args.join(' ').toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find((command) => command.aliases && command.aliases.includes(commandName));
        if (!command) return message.channel.send(`Command not found.`);

        try {
            const path = join(`${__dirname}/../${command.group}/${command.name}`);

            delete require.cache[require.resolve(path)];
    
            const Command = require(path);
            const cmd = new Command();
    
            client.commands.set(cmd.name, cmd);

            return message.channel.send(`Command \`${cmd.name}\` reloaded.`);
        } catch(err) {
            console.error(err);

            return message.channel.send(stripIndents`
                Failed to reload: ${err}
            `);
        }
    }
}

module.exports = Reload;