"use strict";

function setup(bot) {
    bot.registerCommand("about", async function(msg, args) {
        return {
            embed: {
                title: "About " + bot.commandOptions.name,
                description: "A simple word of the day bot\n[Invite](https://discordapp.com/api/oauth2/authorize?client_id=701213002879336509&permissions=11328&scope=bot) me to your server!"
            }
        };
    },
    {
        description: "About info",
        fullDescription: "Some information about the bot"
    });
}

module.exports = {
    setup: setup
};
