/*
Basic DB Methods
*/
const Parser = require('../csv');

var adminuser = "admin";
var adminpass = "admin";

var dbName = "lucera";
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

//var server = "localhost";
var server = "mongo";
var port   = 27017;

exports.connSzAuth = "mongodb://"+adminuser+":"+adminpass+"@"+server+":"+port+"/"+dbName;
exports.connSz = "mongodb://"+server+":"+port+"/"+dbName;

module.exports.find = (req, res, paramExtractor) => {

  console.log('find ');
  var collections = req.db.collection('bids');
  const query = paramExtractor(req);

  console.log("find - For: " +JSON.stringify(query));

  const data = collections
    .find(query.filter)
      .sort(query.sort)
        .limit(query.limit)
          .toArray(
            function(err, docs) {
            if(err) {
              console.log(err);
            }
            //console.log(docs.slice(0,10));
            res.json(docs);
            }
          );
}

module.exports.checkData = () => {
  mongoClient.connect(this.connSz, { useNewUrlParser: true },
    function(err, client) {
      if(!err) {
        var db=client.db(dbName);
        var collections=db.collection('bids');
        try {
            console.log("checkData Mongo DB connected\n");
            collections.findOne().then(function(doc) {
              if ( !doc ) {
                Parser.importCSV();
              }
              else {
                console.log("Check Data found data "+JSON.stringify(doc));
              }
            });

            client.close();
        }
        catch ( err ) {
        console.log(err);
        }
      }
      else{
        console.log("Mongo DB could not be connected");
      }
  });
}

module.exports.loadData = (data) => {
  console.log("Loading data to Mongo "+data[100]);
  mongoClient.connect(this.connSz, { useNewUrlParser: true },
    function(err, client) {
      if(!err) {
        var db=client.db(dbName);
        var collections=db.collection('bids');

        console.log("loadData: Mongo DB connected "+ data[0]);
        collections.insertMany(data).then((err, res) =>{
          console.log('loadData: Done');
        }).catch(function(err) {
          console.log(err);
        });
      }
      else{
        console.log("Mongo DB could not be connected");
      }
  });
};
