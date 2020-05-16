const CommandStructure = require('../../src/structures/CommandStructure');
const { User } = require('../../src/Helpers');
const UserSchema = require('../../src/schemas/UserSchema');

class Deposit extends CommandStructure {
    constructor() {
        super({
            name: 'deposit',
            description: 'Deposit coins you have on hand into your bank',
            group: 'Economy',
            aliases: ['dep'],

            cooldown: 10,
            args: 1,
            usage: '<amount | "all">'
        });
    }

    async run(client, message, args) {
        const user = await User(client, message.author.id);
        const amount = (args[0].toLowerCase() || args[0]) === 'all' ? Number(user.balance.hand) : Number(args[0]);

        if (amount < 1) return message.channel.send(`You must deposit at least 1 coin.`);
        if (user.balance.hand < amount) return message.channel.send(`You don't have enough to deposit ${Number(amount).toLocaleString()} coin${amount > 1 ? 's' : ''}. You need ${Number(amount - user.balance.hand).toLocaleString()} more.`)
        
        const schema = new UserSchema(user);

        schema.balance = {
            bank: Number(Number(user.balance.bank) + amount),
            hand: Number(Number(user.balance.hand) - amount)
        }

        await client.db.collection('users').update({ userID: message.author.id }, schema.toJSON());

        return message.channel.send(`Deposited ${Number(amount).toLocaleString()} coin${amount > 1 ? 's' : ''} into your bank.`);
    }
}

module.exports = Deposit;