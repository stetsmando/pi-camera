const { exec } = require('child_process');
const EventEmitter = require('events');

class Execute extends EventEmitter {
  constructor() {
    super();
  }

  static run(fullCmd) {
    return new Promise((resolve, reject) => {
      console.log(`Executing command: ${ fullCmd }`);
      exec(fullCmd, (error, stdout, stderr) => {
        if (stderr || error) {
          reject(stderr || error);
        }
        resolve(stdout);
      });
    });
  }

  static cmd(base, params) {
    if (params.constructor !== Array) {
      throw new Error('params must be an Array');
    }
    
    return base + ' ' + params.join(' ');
  }
}

module.exports.Execute = Execute;
