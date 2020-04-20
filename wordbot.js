"use strict";

const fs = require("fs").promises;

const mongoose = require("mongoose");
const Eris = require("eris");

process.on("unhandledRejection", (err, promise) => {
    console.error("== Node detected an unhandled rejection! ==");
    console.error(err ? err.stack : promise);
});

async function main() {
    try {
        await mongoose.connect("mongodb://localhost/wordbot", { useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch(err) {
        console.error("connection error:", err);
        throw err;
    }

    var token = await fs.readFile("./token.txt");
    var bot = new Eris.CommandClient(token, {}, {
        description: "Word of the Day bot",
        owner: "Natalie Fearnley"
    });

    bot.on("ready", async function() {
        console.log("WordBot is ready");
    });

    bot.on("warn", async function(message) {
        console.warn("WordBot WARN", message);
    });

    bot.on("error", async function(err) {
        console.error("WordBot ERROR", err);
    });

    var modules = ["about", "admin", "word"];
    modules.forEach(function(name) {
        var module = require("./modules/" + name);
        module.setup(bot);
    });

    bot.connect();
}

main();
