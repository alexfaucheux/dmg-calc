const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();


app.listen(PORT, HOST);
console.log(`Listening on http://${HOST}:${PORT}`);
