const CommandStructure = require('../../src/structures/CommandStructure');
const { action, mapUserGroup, getUsersFromMention, getDisplayName } = require('../../src/Helpers');

class Hug extends CommandStructure {
    constructor() {
        super({
            name: 'hug',
            description: 'Hug yourself/one or more users. Images are provided by weeb.sh.',
            group: 'Actions',

            usage: '[user, user...]'
        });
    }

    async run(client, message, args) {
        const users = await getUsersFromMention(args.join(' '), client, message.guild);
        const image = await action('hug');

        if (!image || image.status !== 200) return message.channel.send(`Unable to get a response from weeb.sh. Try again later.`);
        if (image.nsfw && !message.channel.nsfw) return message.channel.send(`The image returned was NSFW, but you're not in an NSFW channel.`);

        const msg = (users.length > 1)
        ? `${getDisplayName(message.member)} hugs ${mapUserGroup(users)}`
        : (users.length === 0)
        ? `${getDisplayName(message.member)} hugs themselves`
        : `${getDisplayName(message.member)} hugs ${users[0].user.username}`;

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

module.exports = Hug;