const { Client, WebhookClient, Collection } = require('discord.js');
const { readdirSync } = require('fs');

const DatabaseManager = require('./managers/DatabaseManager');

class Naomi extends Client {
    constructor(opts) {
        super(opts.clientOptions);
        this.opts = opts;

        this.commands = new Collection();
        this.groups = new Collection();

        this.loadCommands();
        this.loadEvents();
        this.loadManagers();
        
        if (this.webhooks) this.loadWebhooks();
        
        this.login(this.opts.token);
    }

    async loadCommands() {
        const groups = await readdirSync(this.opts.commandsDir);

        for (const group of groups) {
            const commands = await readdirSync(`./commands/${group}`).filter((i) => i.endsWith('.js'));
        
            this.groups.set(group, group);
            
            for (const command of commands) {
                try {
                    const file = require(`../commands/${group}/${command}`);
                    const cmd = new file();

                    this.commands.set(cmd.name, cmd);

                    if (this.opts.debug) console.log(`Loaded command: ${cmd.name}`);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    }

    async loadEvents() {
        const events = await readdirSync(this.opts.eventsDir).filter((i) => i.endsWith('.js'));

        for (const event of events) {
            try {
                const file = require(`../events/${event}`);
                const evt = new file();

                this.on(evt.name, evt.run.bind(null, this));

                if (this.opts.debug) console.log(`Bound event to client: ${evt.name}`);
            } catch(err) {
                console.error(err);
            }
        }
    }

    async loadManagers() {
        this.db = new DatabaseManager(this.opts.database);
        if (this.opts.debug) console.log(`Loaded manager: DatabaseManager`);
    }

    async loadWebhooks() {
        this.webhooks = {}

        if (this.opts.webhooks.guildLog) {
            this.webhooks.guildLog = new WebhookClient(this.opts.webhooks.guildLog.id, this.opts.webhooks.guildLog.token);
            if (this.opts.debug) console.log(`Loaded webhook: guildLog`);
        }
    }
}

module.exports = Naomi;