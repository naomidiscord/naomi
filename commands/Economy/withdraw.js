const CommandStructure = require('../../src/structures/CommandStructure');
const { User } = require('../../src/Helpers');
const UserSchema = require('../../src/schemas/UserSchema');

class Withdraw extends CommandStructure {
    constructor() {
        super({
            name: 'withdraw',
            description: 'Withdraw coins you have from your bank',
            group: 'Economy',
            aliases: ['with'],

            cooldown: 10,
            args: 1,
            usage: '<amount | "all">'
        });
    }

    async run(client, message, args) {
        const user = await User(client, message.author.id);
        const amount = Number(args[0]);

        if (amount < 1) return message.channel.send(`You must withdraw at least 1 coin.`);
        if (user.balance.bank < amount) return message.channel.send(`You don't have enough to withdraw ${Number(amount).toLocaleString()} coin${amount > 1 ? 's' : ''}. You need ${Number(user.balance.bank - amount).toLocaleString()} more.`)
    
        const schema = new UserSchema(user);

        schema.set('balance', {
            bank: Number(Number(user.balance.bank) - amount),
            hand: Number(Number(user.balance.hand) + amount)
        });

        await client.db.collection('users').update({ userID: message.author.id }, schema.toJSON());

        return message.channel.send(`Withdrawn ${Number(amount).toLocaleString()} coin${amount > 1 ? 's' : ''} from your bank.`);
    }
}

module.exports = Withdraw;