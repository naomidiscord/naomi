const CommandStructure = require('../../src/structures/CommandStructure');
const { action, mapUserGroup, getUsersFromMention, getDisplayName } = require('../../src/Helpers');

class Dance extends CommandStructure {
    constructor() {
        super({
            name: 'dance',
            description: 'Dance by yourself/with one or more users. Images are provided by weeb.sh.',
            group: 'Actions',

            args: 1,
            usage: '<user, user...>'
        });
    }

    async run(client, message, args) {
        const users = await getUsersFromMention(args.join(' '), client, message.guild);
        const image = await action('dance');

        if (!image || image.status !== 200) return message.channel.send(`Unable to get a response from weeb.sh. Try again later.`);
        if (image.nsfw && !message.channel.nsfw) return message.channel.send(`The image returned was NSFW, but you're not in an NSFW channel.`);

        const msg = (users.length > 1)
        ? `${getDisplayName(message.member)} dances with ${mapUserGroup(users)}`
        : (users.length === 0)
        ? `${getDisplayName(message.member)} dances with themselves`
        : `${getDisplayName(message.member)} dances with ${users[0].user.username}`;

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

module.exports = Dance;