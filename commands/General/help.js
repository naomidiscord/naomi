const CommandStructure = require('../../src/structures/CommandStructure');
const { stripIndents } = require('common-tags');
const { isDeveloper } = require('../../src/Helpers');

class Help extends CommandStructure {
    constructor() {
        super({
            name: 'help',
            description: 'View a list of available commands, or view information for a specific command',
            group: 'General'
        });
    }

    async run(client, message, args) {
        if (!args.length) {
            let commands;
            if (isDeveloper(message.author.id)) commands = client.commands;
            else commands = client.commands.filter((cmd) => !cmd.developerOnly);

            const fields = client.groups.map((group) => {
                return {
                    name: group,
                    value: commands.filter((cmd) => cmd.group === group).map((cmd) => `\`${cmd.name}\``).join(', ')
                }
            });

            return message.channel.send({ embed: {
                color: 0xfee174,
                author: {
                    name: 'Naomi Help',
                    icon_url: client.user.displayAvatarURL({ type: 'png', size: 256 })
                },
                description: `Need to read up on a specific command? Just type \`${client.opts.prefix}help <command name>\` to view more information on a specified command.`,
                fields,
                footer: {
                    text: `${commands.size} commands`
                }
            } });
        }
    }
}

module.exports = Help;