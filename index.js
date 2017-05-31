const execute = require('./lib/exec');

// Class being exported
class PiCamera {
  constructor(config) {
    // Ensure config is an object
    config = config || {};

    if (!config.mode || !config.fileName || !config.path) {
      throw new Error('Camera requires a mode, fileName and path to be created');
    }

    for (const option in config) { // eslint-disable-line guard-for-in
      this[option] = config[option];
    }
  }

  /*
  * Getter
  */
  get(prop) {
    if (!this[prop]) {
      throw new Error(`${ prop } isn't set on current object!`);
    }

    return this[prop];
  }

  /*
  * Setter
  */
  set(prop, value) {
    this[prop] = value;

    return this[prop];
  }

  capture() {
    return execute.run(`raspistill -o ${ this.get('path') }/${ this.get('imageName') }.jpg -w ${ this.get('w') } -h ${ this.get('h') }`);
  }
}

module.exports = PiCamera;