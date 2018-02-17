var fs          = require('fs');
var nconf       = require('nconf');

nconf.argv()
     .env()
     .file({ file: './src/config.json' })
     .required([
      'API_HOST'
      ]);