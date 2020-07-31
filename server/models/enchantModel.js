const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Model = mongoose.model;

const enchantSchema = new Schema({
    name: {type: String},
    boost: {type: Number}
})

module.exports = Model('enchant', enchantSchema);