const CommandStructure = require('../../src/structures/CommandStructure');
const parse = require('yargs-parser');
const { stripIndents } = require('common-tags');

class Eval extends CommandStructure {
    constructor() {
        super({
            name: 'eval',
            description: 'Evaluate node.js code from the bot',
            group: 'Developer',
            aliases: ['ev'],

            args: 1,
            usage: `<code>`,

            developerOnly: true
        });
    }

    async run(client, message, args) {
        const argv = parse(args.join(' '));
        const code = argv._.join(' ');

        const options = {
            async: argv.async || argv.a || false,
            delete: argv.delete || argv.d || false,
            formatting: argv.formatting || argv.f || null,
            silent: argv.silent || argv.s || false
        }

        if (options.delete) try { await message.delete(); } catch(err) {}

        try {
            let response;
            if (options.async) response = await eval(`let d; const func = (async () => { ${code} }); d = func();`);
            else response = await eval(code);

            if (options.silent) return true;
            else return message.channel.send(stripIndents`
                \`\`\`${!options.formatting ? '' : options.formatting}
                ${response}
                \`\`\`
            `);
        } catch(err) {
            return message.channel.send(stripIndents`
                \`\`\`${!options.formatting ? '' : options.formatting}
                ${err.stack}
                \`\`\`
            `);
        }
    }
}

module.exports = Eval;