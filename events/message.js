const EventStructure = require('../src/structures/EventStructure');
const { stripIndents } = require('common-tags');

class Message extends EventStructure {
    constructor() {
        super({
            name: 'message'
        });
    }

    async run(client, message) {
        if (message.author.bot) return;

        const prefixArray = [client.opts.prefix, `<@${client.user.id}> `, `<@!${client.user.id}> `];
        const prefix = prefixArray.find((i) => message.content.toLowerCase().startsWith(i));
        if (!prefix) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const command = client.commands.get(commandName) || client.commands.find((command) => command.aliases && command.aliases.includes(commandName));
        if (!command) return;

        if (command.ownerOnly && !owners.includes(message.author.id)) return;

        if (command.guildOnly && message.channel.type !== 'text')
        return message.channel.send(`This command can only be used in a server.`);

        if (command.requiredAPI) {
            if (command.requiredAPI === 'idiotic' && !client.opts.apiKeys['idiotic']) return message.channel.send(`This command cannot be used, as no Idiotic API key was provided.`);
            if (command.requiredAPI === 'ksoft' && !client.opts.apiKeys['ksoft']) return message.channel.send(`This command cannot be used, as no KSoft API key was provided.`);
            if (command.requiredAPI === 'weebsh' && !client.opts.apiKeys['weebsh']) return message.channel.send(`This command cannot be used, as no weeb.sh API key was provided.`);
        }
    
        if (command.args && (!args.length >= command.args)) {
            if (!command.usage) return message.channel.send(`${command.name} requires at least ${command.args} argument${command.args > 1 ? 's' : '' }.`);
            else return message.channel.send(stripIndents`
                ${command.name} requires at least ${command.args} argument${command.args > 1 ? 's' : '' }.
                Expected usage: \`${client.opts.prefix}${command.name} ${command.usage}\`
            `);
        }
     
        try {
            await command.run(client, message, args);
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = Message;