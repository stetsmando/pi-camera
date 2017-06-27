const Execute = require('./lib/Execute');
const { spawn } = require('child_process');
const FLAGS = require('./flags');
const OPTS = require('./options');

// Class being exported
class PiCamera {
  constructor(config) {
    // Ensure config is an object
    config = config || {};

    if (!config.mode) {
      throw new Error('PiCamera requires a mode to be created');
    }
    
    // Set the mode prop
    this.mode = config.mode;

    // Remove mode and set config
    delete config.mode;
    this.config = config;
  }

  /*
  * Getter
  */
  get(prop) {
    if (!this.config[prop]) {
      throw new Error(`${ prop } isn't set on current object!`);
    }

    return this.config[prop];
  }

  /*
  * Setter
  */
  set(prop, value) {
    this.config[prop] = value;

    return this.config[prop];
  }

  // Take a picture
  snap() {
    if (this.mode !== 'photo') {
      throw new Error(`snap() can only be called when Pi-Camera is in 'photo' mode`);
    }
    
    return Execute.run(Execute.cmd('raspistill', this.configToArray()));
  }

  // Record a video
  record() {
    if (this.mode !== 'video') {
      throw new Error(`record() can only be called when Pi-Camera is in 'video' mode`);
    }

    return Execute.run(Execute.cmd('raspivid', this.configToArray()));
  }
}

// Takes internal config object and return array version
PiCamera.prototype.configToArray = function() {
  let configArray = [];
    for (let prop in this.config) {
      if (FLAGS.includes(prop) && this.config[prop]) {
        configArray.push(`--${ prop }`);
        continue;
      }

      if (OPTS.includes(prop)) {
        configArray.push(`--${ prop }`);
        configArray.push(this.config[prop]);
        continue;
      }
    }

  return configArray;
}

module.exports = PiCamera;
