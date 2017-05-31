const { exec } = require('child_process');

module.exports.run = function(cmd) {
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${ cmd }`);
    exec(cmd, (error, stdout, stderr) => { // eslint-disable-line no-unused-vars
      // Note: stderr isn't used here simply because it's redundant with what's in the error object
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
};
