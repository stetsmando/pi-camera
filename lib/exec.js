const { exec } = require('child_process');

module.exports.run = function(cmd) {
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${ cmd }`);
    exec(cmd, (error, stdout, stderr) => { // eslint-disable-line no-unused-vars
      if (stderr || error) {
        reject(stderr || error);
      }
      resolve(stdout);
    });
  });
};
