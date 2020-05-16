const EventStructure = require('../src/structures/EventStructure');
const { Guild } = require('../src/Helpers');
const GuildSchema = require('../src/schemas/GuildSchema');
const { stripIndents } = require('common-tags');

class GuildDelete extends EventStructure {
    constructor() {
        super({
            name: 'guildDelete'
        });
    }

    async run(client, guild) {
        const hasGuild = await client.db.collection('guilds').has({ guildID: guild.id });
        if (hasGuild) await client.db.collection('guilds').delete({ id: guild.id });

        const owner = await client.users.fetch(guild.ownerID);

        const humans = guild.members.cache.filter((m) => !m.user.bot).size;
        const bots = guild.members.cache.filter((m) => m.user.bot).size;

        client.webhooks.guildLog.send(null, {
            username: 'Guild left',
            embeds: [
                {
                    title: guild.name,
                    description: stripIndents`
                    Owned by ${owner.tag}
                    ${Number(guild.memberCount).toLocaleString()} member${guild.memberCount > 1 ? 's' : ''} (${Number(humans).toLocaleString()} human${humans > 1 ? 's' : ''}, ${Number(bots).toLocaleString()} bot${bots > 1 ? 's' : ''})
                    `,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/embed/avatars/0.png'
                    },
                    timestamp: Date.now()
                }
            ]
        });
    }
}

module.exports = GuildDelete;