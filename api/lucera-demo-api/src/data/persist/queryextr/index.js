/*
Module to extract data from the req params for DB queries
*/
const mongo = require('mongodb')
const ObjectId = mongo.ObjectID;

exports.pricesExtr = (req) => {
  const symbol =  req.params.symbol1+"/"+req.params.symbol2;
  const query = {"bid.sym":symbol}
  const sort = {"bid.ts":1}

  return ({
    query: query,
    sort: sort
  })
};

exports.bidsExtr = (req) => {
  console.log(req +", "+req.url);
  const lastId =  req.query.lastId;
  const pageSize = req.query.pgsize || 100;
  const paramSort = req.query.sort;

  const filter = lastId?{ '_id':  { '$gt':new ObjectId(lastId) }}:null;
  const sort = getBidsSort(paramSort);
  const limit = pageSize;

  console.log("bidsExtr - " +filter+", "+sort+", "+limit);
  return {
    filter: filter,
    sort: sort,
    limit: cleanInt(limit)
  }
};

const getBidsSort = (sort) => {
  console.log(sort)
  if ( !sort ) {
    return {"bid.ts":1};
  }

  if ( sort === 'TIME' ) {
    return {"bid.ts":1};
  }
  else if ( sort === "LP" ) {
    return {"bid.lp":1};
  }
  else if ( sort === "SYMBOL" ) {
    return {"bid.sym":1};
  }
}

const cleanInt = (x) => {
    x = Number(x);
    return x >= 0 ? Math.floor(x) : Math.ceil(x);
}
