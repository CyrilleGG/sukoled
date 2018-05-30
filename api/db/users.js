var records = [
    { id: 1, username: 'nico', password: '123', displayName: 'Nicolas', emails: [ { value: 'n_resmi@etu-webschoolfactory.fr' } ] }
  , { id: 2, username: 'cyrille', password: '456', displayName: 'Cyrille', emails: [ { value: 'c_guiot-guillin@etu-webschoolfactory.fr' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}