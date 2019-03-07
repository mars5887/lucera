
exports.getHashcode = (s) => {
  var hash = 0, len = s.length;
  if ( len === 0 ) return hash;
  for( var i = 0; i < len; ++i ) {
  let achar = s.charCodeAt(i);
  hash = ((hash<<5)-hash)+achar;
  hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
