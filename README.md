# Naomi
A helpful Discord bot with smart features and a rich economy for everybody to enjoy.

![Discord](https://img.shields.io/discord/469337933498023937)

## Getting Started
Naomi is a public bot by default. If you'd just like to get started, click [here](https://discord.com/oauth2/authorize?client_id=469345260963758081&scope=bot) to invite the public bot to your server. However, if you'd like to run your own version, a guide can be found below.

## Build
In order to get Naomi running locally, you'll need the following:
* A MongoDB instance, with `guilds` and `users` collections
* A Discord client token/secret
* A recent version of Node.js (v12 or above)
* Either Yarn or NPM for dependencies (Yarn recommended)

First, clone this repository to an empty directory on your computer.
```
git clone https://github.com/naomidiscord/naomi.git
```

Then, make a copy of `config.json.example`, rename it to `config.json`, and fill in the values provided. If some values are missing, parts of the bot will be disabled.

The main values that are needed are the `token`, `developers` and `database` values.
```js
{
    "token": "my-bot-token",
    "developers": [
        "array of user ids"
    ],
    "database": {
        "url": "mongodb://my-mongodb:connection/uri",
        "dbname": "my-db-name"
    }
}
```

Lastly, install all the dependencies. We use Yarn, but you can use NPM if really wanted, although please do not push any `package-lock.json` files if you contribute to the repository.
```
yarn install
npm install
```

All that's left to do is to start the bot. If everything has gone well, you'll be up and going in no time.
```
npm start
```

## Contributing
Naomi's source code is open source because we :heart: open source software, and we love contributions. Feel free to contribute in any way you feel.

*todo: contribution guide*

## License
Naomi is licensed under the MIT License, with some exceptions:
### Do's
* You can run a local instance of Naomi's source code for testing, learning or contribution
* You can use parts of Naomi's source code in your own bots or projects using appropriate credit

### Dont's
* You cannot reuse Naomi's name or branding
* You cannot run an instance of Naomi's source code publicly
* You cannot monetize Naomi's source code
* You cannot provide support for others that are running local or public instances
* You cannot use parts of Naomi's code without credit or prior approval

If you have any questions, we're happy to help. Join our Discord server and send a developer or support member a private message.