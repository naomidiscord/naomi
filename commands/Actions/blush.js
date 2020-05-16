const CommandStructure = require('../../src/structures/CommandStructure');
const { action, mapUserGroup, getUsersFromMention, getDisplayName } = require('../../src/Helpers');

class Blush extends CommandStructure {
    constructor() {
        super({
            name: 'blush',
            description: 'Blush at one or more users. Images are provided by weeb.sh.',
            group: 'Actions',

            args: 1,
            usage: '<user, user...>',
            requiredAPI: 'weebsh'
        });
    }

    async run(client, message, args) {
        const users = await getUsersFromMention(args.join(' '), client, message.guild);
        const image = await action('blush');

        if (!image || image.status !== 200) return message.channel.send(`Unable to get a response from weeb.sh. Try again later.`);
        if (image.nsfw && !message.channel.nsfw) return message.channel.send(`The image returned was NSFW, but you're not in an NSFW channel.`);

        const msg = (users.length > 1)
        ? `${getDisplayName(message.member)} blushes at ${mapUserGroup(users)}`
        : `${getDisplayName(message.member)} blushes at ${users[0].user.username}`;

        return message.channel.send({ embed: {
            description: msg,
            footer: {
                text: 'weeb.sh'
            },
            image: {
                url: image.url
            }
        } });
    }
}

module.exports = Blush;