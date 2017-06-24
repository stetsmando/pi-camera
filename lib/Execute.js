const { exec, spawn } = require('child_process');

class Execute {
  static run(fullCmd) {
    return new Promise((resolve, reject) => {
      exec(fullCmd, (error, stdout, stderr) => {
        if (error) {
          console.log(`Error in exec: ${ error }`);
          // throw error;
        }

        if (stderr) {
          reject(stderr);
        }
        if (stdout) {
          resolve(stdout);
        }
      });
    });
  }

  static cmd(base, params) {
    if (!params && base) {
    return base;
  }
  if (params.constructor !== Array) {
    throw new Error('params must be an Array');
  }
  
  return base + ' ' + params.join(' ');
  }
}

class Spawn {
  static run(cmd, params) {
    return spawn(cmd, params);
  }
}

module.exports = {
  Execute,
  Spawn
};
