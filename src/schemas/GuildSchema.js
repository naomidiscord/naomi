const SchemaStructure = require('../structures/SchemaStructure');

class GuildSchema extends SchemaStructure {
    constructor(params) {
        super({
            name: 'Guild'
        });

        /**
         * The ID of the guild
         * @type string
         */
        this.guildID = params.guildID;

        /**
         * When the guild's database entry was created
         * @type date
         */
        this.createdAt = params.createdAt || Date.now();

        /**
         * Whether to delete user commands or not
         * @type boolean
         */
        this.deleteCommands = params.deleteCommands || false;

        /**
         * The guild's chosen prefix, or null if set as default
         * @type string
         */
        this.prefix = params.prefix || null;
    }
}

module.exports = GuildSchema;