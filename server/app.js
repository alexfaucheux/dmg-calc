const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(cors());
app.use(bodyParser());

const enchantController = require('./controllers/enchantController');

app.get('/enchant', enchantController.getEnchant);
app.post('/enchant', enchantController.createEnchant);


app.listen(PORT, HOST);
console.log(`Listening on http://${HOST}:${PORT}`);
