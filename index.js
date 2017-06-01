const { run, cmd } = require('./lib/exec');

// Class being exported
class PiCamera {
  constructor(config) {
    // Ensure config is an object
    config = config || {};

    if (!config.mode || !config.fileName || !config.path) {
      throw new Error('PiCamera requires a mode, fileName and path to be created');
    }

    // TODO: Come back and do proper validation for all the available props on the different modules
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
    return run(cmd('raspistill', ['-o', `${ this.get('path') }/${ this.get('fileName') }`, '-w', this.get('w'), '-h', this.get('h')]));
  }
}

module.exports = PiCamera;




/*
  TODO: Build a dynamic command builder based on configured defaults and passed in config options

  Raspistill params that need to be supported
  -w, --width	: Set image width <size>
  -h, --height	: Set image height <size>
  -q, --quality	: Set jpeg quality <0 to 100>
  -o, --output	: Output filename <filename> (to write to stdout, use '-o -'). If not specified, no file is saved
  -l, --latest	: Link latest complete image to filename <filename>
  -t, --timeout	: Time (in ms) before takes picture and shuts down (if not specified, set to 5s)
  -th, --thumb	: Set thumbnail parameters (x:y:quality) or none
  -d, --demo	: Run a demo mode (cycle through range of camera options, no capture)
  -e, --encoding	: Encoding to use for output file (jpg, bmp, gif, png)
  -tl, --timelapse	: Timelapse mode. Takes a picture every <t>ms. %d == frame number (Try: -o img_%04d.jpg)
  -fp, --fullpreview	: Run the preview using the still capture resolution (may reduce preview fps)
  -cs, --camselect	: Select camera <number>. Default 0
  -md, --mode	: Force sensor mode. 0=auto. See docs for other modes available
  -fs, --framestart	: Starting frame number in output pattern(%d)
  -rs, --restart	: JPEG Restart interval (default of 0 for none)

  Preview parameter commands
  -p, --preview	: Preview window settings <'x,y,w,h'>
  -op, --opacity	: Preview window opacity (0-255)
*/