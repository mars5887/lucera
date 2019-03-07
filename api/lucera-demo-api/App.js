const Http = require('./src/servers/Http');
const Db = require('./src/data/persist');

Db.checkData()

Http.startServer(3030);
