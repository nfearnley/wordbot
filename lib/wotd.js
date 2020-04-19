"use strict";

const moment = require("moment");
const got = require("got");
const xml2js = require("xml2js");

function parseWOTD(worddata) {
    return {
        word: worddata.title[0],
        link: worddata.link[0],
        audio: worddata.enclosure[0].$.url,
        date: new Date(worddata.pubDate[0]),
        expiry: moment(new Date(worddata.pubDate[0])).add(1, "day").toDate(),
        entry: worddata["itunes:summary"][0],
        shortdef: worddata["merriam:shortdef"][0]
    };
}

var cached;

async function fetchWOTDs() {
    // Cache the current wotd for 24 hours
    if (cached && cached[0] && moment().isBefore(cached[0].expiry)) {
        return cached;
    }

    var response = await got("http://www.merriam-webster.com/word/index.xml");

    var data = await xml2js.parseStringPromise(response.body);
    var wotds = data.rss.channel[0].item.map(d => parseWOTD(d));

    cached = wotds;

    return wotds;
}

async function getCurrWOTD() {
    var wotds = await fetchWOTDs();
    var wotd = wotds[0];
    return wotd;
}

module.exports = {
    get: getCurrWOTD,
    getAll: fetchWOTDs
};
