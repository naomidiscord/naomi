const CommandStructure = require('../../src/structures/CommandStructure');
const { User, getUserFromMention } = require('../../src/Helpers');

class Balance extends CommandStructure {
    constructor() {
        super({
            name: 'balance',
            description: 'Check how many coins you or another user has available',
            group: 'Economy',
            aliases: ['bal'],

            usage: '[user]'
        });
    }

    async run(client, message, args) {
        const userID = getUserFromMention(args[0]) || message.author.id;
        const member = message.guild.members.cache.get(userID);
        if (!member) return message.channel.send(`That user couldn't be found in this server.`);
        
        const user = await User(client, userID);

        const coins = {
            total: Number(user.balance.bank + user.balance.hand),
            bank: Number(user.balance.bank),
            hand: Number(user.balance.hand)
        }

        return message.channel.send({ embed: {
            color: 0xfee174,
            author: {
                name: member.user.username,
                icon_url: member.user.displayAvatarURL({ type: 'png', size: 256 })
            },
            description: `${user.userID === message.author.id ? 'You have' : `${member.user.username} has`} ${coins.total.toLocaleString()} coin${coins.total > 1 ? 's' : ''} (${coins.bank.toLocaleString()} in bank, ${coins.hand.toLocaleString()} on hand)`
        } });
    }
}

module.exports = Balance;