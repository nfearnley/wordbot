"use strict";

function setup(bot) {
    bot.registerCommand("setprefix", async function(msg, args) {
        var prefix = args[0];
        bot.registerGuildPrefix(msg.channel.guild.id, prefix);
        return "Guild prefix has been set to " + prefix;
    },
    {
        description: "Set guild prefix",
        fullDescription: "Sets a custom prefix for use in the current guild",
        argsRequired: true,
        requirements: {
            permissions: {
                "administrator": true
            }
        },
        guildOnly: true
    });
}

module.exports = {
    setup: setup
};
