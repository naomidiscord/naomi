class CommandStructure {
    constructor(params) {
        this.name = params.name;
        this.description = params.description;
        this.group = params.group;
        this.aliases = params.aliases || [];

        this.cooldown = params.cooldown || 0;
        this.args = params.args || false;
        this.usage = params.usage || null;

        this.guildOnly = params.guildOnly || false;
        this.developerOnly = params.developerOnly || false;
        this.nsfwOnly = params.nsfwOnly || false;
    }
}

module.exports = CommandStructure;