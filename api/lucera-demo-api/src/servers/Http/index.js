/*
HTTP Service with basic calls for data.
*/
var app = require('express')();
var expressMongoDb = require('express-mongo-db');

var Aggr = require('../../data/persist/aggregations')
var find = require('../../data/persist').find;
var connSz = require('../../data/persist').connSz;
var query = require('../../data/persist/queryextr');


module.exports.startServer = (port) => {
  app.listen(port, function(){
    console.log('MarsDesk listening on port ' +port);
  });
}

app.use(expressMongoDb(connSz));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.send("MarsDesk API at Your Service");
});

app.get('/lpbidptotals', function(req, res){

  const docs = Aggr.getTotBidsPerLP(req, res, 'bid_price');

});

app.get('/lpbidqtotals', function(req, res){

  const docs = Aggr.getTotBidsPerLP(req, res, 'bid_quantity');

});

app.get('/lpaskptotals', function(req, res){
  Aggr.getTotBidsPerLP(req, res, 'ask_price');
});

app.get('/prices/:symbol1/:symbol2', function(req, res){
  find(req, res, query.priceQuery);
});

app.get('/bids', function(req, res){
  console.log('/bids')
  find(req, res, query.bidsExtr);
});
