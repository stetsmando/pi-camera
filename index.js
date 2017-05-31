const execute = require('./lib/exec');

// Class being exported
exports.PiCamera = function() {
  execute('ls')
    .then((msg) => {
      console.log(msg);
    })
    .catch((error) => {
      console.log(error);
    });
}