"use strict";

const wotd = require("../lib/wotd");

function toggle(n) {
    if (n === 0) {
        return 1;
    }
    else {
        return 0;
    }
}

function setup(bot) {
    bot.registerCommand("word", async function(msg, args) {
        var currwotd = await wotd.get();
        var summary = {
            embed: {
                color: 0x305F7A,
                author: {
                    name: "Word of the Day"
                },
                title: currwotd.word,
                url: currwotd.link,
                description: currwotd.shortdef,
                timestamp: currwotd.date,
                footer: {
                    text: "Press 📘 to expand"
                }
            }
        };

        var expanded = {
            embed: {
                color: 0x305F7A,
                author: {
                    name: "Word of the Day"
                },
                title: currwotd.word,
                url: currwotd.link,
                description: currwotd.entry,
                timestamp: currwotd.date,
                footer: {
                    text: "Press 📘 to collapse"
                }
            }
        };

        // A hack to pass around data using the args
        args.splice(0, args.length);
        args.push([summary, expanded]);
        args.push(0);

        return args[0][args[1]];
    },
    {
        description: "Word of the Day",
        fullDescription: "Fetch the latest Word of the Day from Merriam Webster",
        reactionButtons: [
            {
                emoji: "📘",
                type: "edit",
                response: async function(msg, args, userID) {
                    args[1] = toggle(args[1]);
                    return args[0][args[1]];
                }
            }
        ]
    });

    bot.registerCommand("words", async function(msg, args) {
        var words = await wotd.getAll();
        var summary = {
            embed: {
                color: 0x305F7A,
                author: {
                    name: "Previous Words of the Day"
                },
                fields: words.map(w => ({ name: w.word, value: w.shortdef }))
            }
        };

        return summary;
    },
    {
        description: "Previous Words of the Day",
        fullDescription: "Fetch the last few Words of the Day from Merriam Webster"
    });
}

module.exports = {
    setup: setup
};
