const Naomi = require('./src/index');

const { token, prefix, developers, apiKeys, webhooks, database } = require('./config');

new Naomi({
    token,
    prefix,
    developers,
    apiKeys,
    webhooks,
    database,
    commandsDir: './commands',
    eventsDir: './events',
    debug: false,
    clientOptions: {
        messageCacheMaxSize: 100,
        messageCacheLifetime: 60 * 60,
        messageSweepInterval: 60,
        disabledMentions: 'all',
        retryLimit: 0,
        presence: {
            activity: {
                name: `being rewritten! ${prefix}help`
            }
        }
    }
});