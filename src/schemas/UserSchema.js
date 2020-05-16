const SchemaStructure = require('../structures/SchemaStructure');

class UserSchema extends SchemaStructure {
    constructor(params) {
        super({
            name: 'User'
        });

        /**
         * The ID of the user
         * @type string
         */
        this.userID = params.userID;

        /**
         * An array containing the badges that the user has earnt
         */
        this.badges = params.badges || [];
        
        /**
         * An object containing the user's balance state (bank, hand)
         * @type object
         */
        this.balance = {
            /**
             * How many coins the user has in the bank/deposited
             * @type number
             */
            bank: (params.balance || {})['bank'] || 0,

            /**
             * How many coins the user has on hand
             * @type number
             */
            hand: (params.balance || {})['hand'] || 50
        }

        /**
         * When the user's database entry was created
         * @type date
         */
        this.createdAt = params.createdAt || Date.now();
    }
}

module.exports = UserSchema;