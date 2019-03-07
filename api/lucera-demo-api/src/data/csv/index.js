/*
Import the CSV file and load it to the Datanase
*/

const Papa = require("papaparse");
const Util = require("../util");
const Db = require("../persist");
const fs = require("fs");

exports.importCSV = () => {
  console.log("Importing CSV Data");

  fs.readFile("./data/adata.csv", "utf8", function(err, data) {
    console.log("reading file");
    if (err) return console.error(err);
    Papa.parse(data, {
      worker: false,
      complete: updateData,
      header: true
    });
  });
};

updateData = result => {
  console.log("Update data! " + result);
  var data = result.data;
  var nd = data
    .filter(value => Object.keys(value).length !== 0)
    .map((item, index) => {
      if (!item.sym) {
        console.log(
          `Item is bad: ${item.ts} ${item.lp} ${item.bid_price} ${item.bid_quantity
          } ${index}`
        );
      }

      let objArr = Object.keys(item).map(key => item[key]);
      let key = objArr.reduce(function(res, obj) {
        return res + obj;
      }, {});

      return {
        key: Util.getHashcode(key + index),
        bid: item
      };
    });

  console.log("loading data...");
  Db.loadData(nd);
};
