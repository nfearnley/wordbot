"use strict";

const Guild = require("../models/guild");

async function initGuilds(bot) {
    var guilds = await Guild.find();
    guilds.filter(g => g.prefix).forEach(function(g) {
        bot.registerGuildPrefix(g.id, g.prefix);
    });
}

function setup(bot) {
    bot.on("ready", function() {
        initGuilds(bot);
    });

    bot.registerCommand("setprefix", async function(msg, args) {
        var prefix = args[0];
        var guilddata = await Guild.findOne({ id: msg.channel.guild.id });
        if (!guilddata) {
            guilddata = new Guild({ id: msg.channel.guild.id });
        }
        guilddata.prefix = prefix;
        await guilddata.save();
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
