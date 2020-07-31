const keys = require('../config/keys');
const mongoose = require('mongoose');
const Enchant = require('../models/enchantModel');

const mongoDB = keys.mongoURL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.createEnchant = (req, res) => {
    let body = req.body;

    let enchant = new Enchant({
        name: body.name,
        boost: body.boost
    });

    enchant.save(function (err) {
        if (err) throw err;
        res.json({message: `Enchant ${req.body.name} successfully added`})
    });
};

exports.getEnchant = (req, res) => {
    let query = req.query;

    Enchant.findOne({name: query.name}, (err, enchant) => {
        if(err) throw err;
        res.send(enchant);
    })
};