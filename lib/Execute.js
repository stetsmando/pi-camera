const { exec } = require('child_process');

class Execute {
  static run(fullCmd) {
    return new Promise((resolve, reject) => {
      exec(fullCmd, (error, stdout, stderr) => {
        if (stderr || error) {
          reject(stderr || error);
        }
        resolve(stdout);
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

module.exports = Execute;
