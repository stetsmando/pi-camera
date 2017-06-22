const { exec } = require('child_process');
const EventEmitter = require('events');

class Execute extends EventEmitter {
  constructor(options) {
    super();
    let { fullCmd, params } = options;

    this.fullCmd = fullCmd;
    this.params = params;
  }

  run() {
    RunCmd(BuildCmd(this.fullCmd, this.params))
      .then((msg) => {
        this.emit('end', msg);
      })
      .catch((error) => {
        this.emit('error', error)
      });
  }

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
    return BuildCmd(base, params);
  }
}

module.exports = Execute;

function RunCmd(fullCmd) {
  return new Promise((resolve, reject) => {
    exec(fullCmd, (error, stdout, stderr) => {
      if (stderr || error) {
        reject(stderr || error);
      }
      resolve(stdout);
    });
  });
}

function BuildCmd(base, params) {
  if (!params && base) {
    return base;
  }
  if (params.constructor !== Array) {
    throw new Error('params must be an Array');
  }
  
  return base + ' ' + params.join(' ');
}
