const { model } = require('mongoose');

const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = new model("postion", PositionsSchema);

module.exports = { PositionsModel };