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
            usage: '<amount>'
        });
    }

    async run(client, message, args) {
        const user = await User(client, message.author.id);
        const amount = Number(args[0]);


    }
}

module.exports = Withdraw;