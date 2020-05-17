const EventStructure = require('../src/structures/EventStructure');
const { Guild } = require('../src/Helpers');
const { stripIndents } = require('common-tags');

class GuildCreate extends EventStructure {
    constructor() {
        super({
            name: 'guildCreate'
        });
    }

    async run(client, guild) {
        await Guild(client, guild.id);

        const owner = await client.users.fetch(guild.ownerID);

        const humans = guild.members.cache.filter((m) => !m.user.bot).size;
        const bots = guild.members.cache.filter((m) => m.user.bot).size;
        const humanPercentage = (bots/ humans) * 100;
        const botPercentage = (humans / bots) * 100;

        client.webhooks.guildLog.send(null, {
            username: 'Guild joined',
            embeds: [
                {
                    color: 0x43B581,
                    title: guild.name,
                    description: stripIndents`
                    Owned by ${owner.tag}
                    ${Number(guild.memberCount).toLocaleString()} member${guild.memberCount > 1 ? 's' : ''} (${Number(humans).toLocaleString()}/${humanPercentage}% human${humans > 1 ? 's' : ''}, ${Number(bots).toLocaleString()}/${botPercentage}% bot${bots > 1 ? 's' : ''})
                    `,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/embed/avatars/0.png'
                    },
                    timestamp: Date.now()
                }
            ]
        });
        
        if (botPercentage > 50) client.webhooks.guildLog.send(null, {
            username: 'Potential bot farm joined',
            embeds: [
                {
                    color: 0xFAA61A,
                    title: guild.name,
                    description: stripIndents`
                    Owned by ${owner.tag}
                    ${Number(guild.memberCount).toLocaleString()} member${guild.memberCount > 1 ? 's' : ''} (${Number(humans).toLocaleString()}/${humanPercentage}% human${humans > 1 ? 's' : ''}, ${Number(bots).toLocaleString()}/${botPercentage}% bot${bots > 1 ? 's' : ''})
                    `,
                    timestamp: Date.now()
                }
            ]
        });
    }
}

module.exports = GuildCreate;