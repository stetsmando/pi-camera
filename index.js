const Execute = require('./lib/Execute');
const FLAGS = require('./flags');
const OPTS = require('./options');

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

  // Take a picture and return it in Data URL format (data:image/jpg;base64,...)
  async snapDataUrl(maxBuffer = 1024*1024*10) {

    if (this.mode !== 'photo') {
      throw new Error(`snapDataUrl() can only be called when Pi-Camera is in 'photo' mode`);
    }

    this.config.output = '-';
    const image = await Execute.run(Execute.cmd('raspistill', this.configToArray()), {encoding: 'binary', maxBuffer: maxBuffer});
    let data = Buffer.from(image, 'binary').toString('base64');
    return 'data:image/jpg;base64,' + data;
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
  let configArray = []
  Object.keys(this.config).forEach((key, i) => {
    // Only include flags if they're set to true
    if (FLAGS.includes(key) && this.config[key]) {
      configArray.push(`--${key}`)
    } else if (OPTS.includes(key)) {
      configArray.push(`--${key}`, this.config[key])
    }
  })

  return configArray;
}

module.exports = PiCamera;
