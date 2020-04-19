"use strict";

const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    id: { type: String, required: true },
    prefix: { type: String }
});

var Guild = mongoose.model("Guild", schema);

module.exports = Guild;
