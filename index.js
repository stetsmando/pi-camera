const { Execute } = require('./lib/Execute');
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
      throw new Error('snap() can only be called when PiCamera is in \'photo\' mode');
    }
    
    return Execute.run(Execute.cmd('raspistill', this.configToArray()));
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


/*
  TODO: 
  Default configs when instantiating
    Convert everything to either the full name or just the short hand ie -h => --height
  Some private function to build a cmd based on the current config
*/


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

/*
  Raspistill configs to support
  --width,    -w      Set image width <size>
  --height,   -h      Set image height <size>
  --quality,  -q      Set JPEG quality <0 to 100> 
  --raw,  -r      Add raw Bayer data to JPEG metadata
  --output,   -o      Output filename <filename>
  --latest,   -l      Link latest frame to filename <filename>
  --verbose,  -v      Output verbose information during run
  --timeout,  -t      Time before the camera takes picture and shuts down
  --timelapse,    -tl     time-lapse mode
  --thumb,    -th     Set thumbnail parameters (x:y:quality)
  --demo, -d      Run a demo mode <milliseconds>
  --encoding, -e      Encoding to use for output file
  --exif, -x      EXIF tag to apply to captures (format as 'key=value')
  --exif GPS.GPSLongitude=5/1,10/1,15/1
  --fullpreview,  -fp     Full preview mode
  --keypress, -k      Keypress mode
  --signal,   -s      Signal mode


*/