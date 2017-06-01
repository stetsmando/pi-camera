const { exec } = require('child_process');

function run(fullCmd) {
return new Promise((resolve, reject) => {
    console.log(`Executing command: ${ fullCmd }`);
    exec(fullCmd, (error, stdout, stderr) => { // eslint-disable-line no-unused-vars
      if (stderr || error) {
        reject(stderr || error);
      }
      resolve(stdout);
    });
  });
}

function cmd(base, params) {
  if (params.constructor !== Array) {
    throw new Error('params must be an Array');
  }
  
  return base + ' ' + params.join(' ');
}

module.exports = {
  run,
  cmd,
}
