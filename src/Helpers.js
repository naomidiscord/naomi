const { developers, apiKeys } = require('../config.json');
const phin = require('phin');
const GuildSchema = require('./schemas/GuildSchema');
const UserSchema = require('./schemas/UserSchema');

//  ------------------------------------------------------------
//  | General                                                  |
//  ------------------------------------------------------------
exports.get = phin.defaults({
    method: 'GET',
    parse: 'json'
});





//  ------------------------------------------------------------
//  | Requests & APIs                                          |
//  ------------------------------------------------------------
exports.action = async (type) => {
    try {
        const { body } = await this.get({
            url: `https://api.weeb.sh/images/random?type=${type}`,
            headers: {
                'Authorization': `Wolke ${apiKeys.weebsh}`,
                'User-Agent': 'Naomi/1.0.0/dev',
            }
        });

        return body;
    } catch(err) {
        return null;
    }
}



//  ------------------------------------------------------------
//  | Database                                                 |
//  ------------------------------------------------------------
exports.Guild = async (client, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const guild = await client.db.collection('guilds').find({ guildID: id });

            if (!guild) {
                const schema = new GuildSchema({ guildID: id });
    
                await client.db.collection('guilds').add(schema.toJSON());
                return resolve(schema);
            } else {
                const schema = new GuildSchema(guild);
                return resolve(schema);
            }
        } catch(err) {
            return reject(err);
        }
    });
}

exports.User = async (client, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await client.db.collection('users').find({ userID: id });

            if (!user) {
                const schema = new UserSchema({ userID: id });
    
                await client.db.collection('users').add(schema.toJSON());
                return resolve(schema);
            } else {
                const schema = new UserSchema(user);
                return resolve(schema);
            }
        } catch(err) {
            return reject(err);
        }
    });
}



//  ------------------------------------------------------------
//  | Utility Helpers                                          |
//  ------------------------------------------------------------
exports.getDisplayName = (member) => member.nickname || member.user.username;

exports.isDeveloper = (userID) => developers.some((id) => id === userID);

exports.mapUserGroup = (array) => {
    const arr = [];

    array.map((u) => {
        if (array.indexOf(u) === (array.length - 1)) return arr.push(`and ${this.getDisplayName(u)}`);
        if ((array.indexOf(u) + 1) === (array.length - 1)) return arr.push(this.getDisplayName(u));

        return arr.push(`${this.getDisplayName(u)},`);
    });

    if (array.length === 2) return arr.join(' and ');
    else return arr.join(' ');
}

exports.getUserFromMention = (content, client, guild = null) => {
    if (!content) return null;
	const matches = content.match(/^<@!?(\d+)>$/);
	if (!matches) return null;
    if (!guild) return client.users.cache.get(matches[1]);
    else return guild.members.cache.get(matches[1]);
}

exports.getUsersFromMention = (content, client, guild = null) => {
    if (!content) return null;
	const matches = content.match(/<@(!)?(\d+)>/g);
	if (!matches) return [];
    if (!guild) return matches.map((i) => client.users.cache.get(i.replace(/<@(!)?/, '').replace('>', '')));
    else return matches.map((i) => guild.members.cache.get(i.replace(/<@(!)?/, '').replace('>', '')));
}