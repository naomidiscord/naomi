const CommandStructure = require('../../src/structures/CommandStructure');
const { action, mapUserGroup, getUsersFromMention, getDisplayName } = require('../../src/Helpers');

class Tickle extends CommandStructure {
    constructor() {
        super({
            name: 'tickle',
            description: 'Tickle yourself/one or more users. Images are provided by weeb.sh.',
            group: 'Actions',

            usage: '[user, user...]'
        });
    }

    async run(client, message, args) {
        const users = await getUsersFromMention(args.join(' '), client, message.guild);
        const image = await action('tickle');

        if (!image || image.status !== 200) return message.channel.send(`Unable to get a response from weeb.sh. Try again later.`);
        if (image.nsfw && !message.channel.nsfw) return message.channel.send(`The image returned was NSFW, but you're not in an NSFW channel.`);

        const msg = (users.length > 1)
        ? `${getDisplayName(message.member)} tickles ${mapUserGroup(users)}`
        : (users.length === 0)
        ? `${getDisplayName(message.member)} tickles themselves`
        : `${getDisplayName(message.member)} tickles ${users[0].user.username}`;

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

module.exports = Tickle;