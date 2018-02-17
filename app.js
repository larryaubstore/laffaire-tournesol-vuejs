var express             = require('express');
var debug               = require('debug')('app');
var nconf               = require('nconf');

require('./src/nconf');
var app = express();

const port = process.env['PORT'] || 3000;


app.get('/config', (req, res, next) => {
    debug('config');
    res.status(200);
    res.json({ API_HOST: nconf.get('API_HOST')});
});

app.use(express.static('dist'));
app.listen(port);
debug('serveur démarré sur le port ' + port);