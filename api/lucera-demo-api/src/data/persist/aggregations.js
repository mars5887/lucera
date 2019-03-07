/*
Mongo DB Aggregations for Bar Graphs
*/
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var server = require('../persist').server;
var port   = require('../persist').port;
var dbName = "lucera";

var connSz = "mongodb://"+server+":"+port+"/"+dbName;
const getPricesPer = (symbol) => {
  [
  {
    '$match': {
      'bid.lp': symbol
    }
  }, {
    '$sort': {
      'bid.ts': 1
    }
  }
]
}

const getLPTotAccum = (field) => {
  return [
    {
      '$group': {
        '_id': '$bid.lp',
        'Total Bids': {
          '$sum': {
            '$toLong': '$bid.'+field
          }
        }
      }
    }, {
      '$sort': {
        '_id': 1
      }
    }
  ]
}

exports.getPricesFor = (req, res) => {

  var collections=req.db.collection('bids');

  const symbol =  req.params.symbol1+"//"+req.params.symbol2;
  console.log("Mongo Aggr getPricesFor " +symbol);

  collections.aggregate(getPricesPer(symbol)).toArray(function(err, docs) {
    if(err) {
      console.log(err);
    }
    res.json(docs);
  });
}

exports.getTotBidsPerLP = (req, res, field) => {

  var collections=req.db.collection('bids');

  console.log("Mongo Aggr getTotBidsPerLP");

  collections.aggregate(getLPTotAccum(field)).toArray(function(err, docs) {
      if(err) {
        console.log(err);
      }
      res.json(docs);
    });

};
