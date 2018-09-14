# Pi-Camera
A _very_ lightweight promise based Node.js wrapper for the [native Raspberry Pi Camera CLI tools](https://www.raspberrypi.org/documentation/usage/camera/raspicam/README.md).

_Note: This was written with the intent of NOT being a hand holding library, but rather just give you access to execute commands on the camera in a flexible way._

## Want to Contribute or Help Out?
Feel free to head over to the GitHub page for Pi-Camera and submit comments, issues, pulls, and whatever else you'd like. I plan on adding features as I need them for my own projects so if something isn't happening fast enough for you why not fix it? (:

## Installation
```javascript
// NPM 5
npm install pi-camera

// Older NPM versions
npm install pi-camera --save
```

## Basic usage
### Raspistill (Image Capture)
```javascript
const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

myCamera.snap()
  .then((result) => {
    // Your picture was captured
  })
  .catch((error) => {
     // Handle your error
  });
```
### Raspivid (Video Capture)
```javascript
const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'video',
  output: `${ __dirname }/video.h264`,
  width: 1920,
  height: 1080,
  timeout: 5000, // Record for 5 seconds
  nopreview: true,
});

myCamera.record()
  .then((result) => {
    // Your video was captured
  })
  .catch((error) => {
     // Handle your error
  });
```

__Something worth considering is that the Camera module captures videos in a .h264 format, which is raw and uncompressed. Most players do not support this format so you might want to convert your files into something like .mp4. You can read more about it [here](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspivid.md).__

## Flags and Options
The Raspistill and Raspivid commands support a good number of parameters and options.

Currently they're all stored in the same files, so you'll need to do your do diligence and make sure you're using the correct options and flags for what you're trying to do. A good list of them can be found [here](https://www.raspberrypi.org/documentation/raspbian/applications/camera.md)

### **What's the difference between Flags and Options?**
Good question!

Flags are portions of the `Raspistill` and `Raspivid` commands that are passed and require no additional input to fuction like so:
```bash
# NOTE: Not a working command
raspistill --nopreview --raw --hflip --vflip
```

Options are portions of the `Raspistill` and `Raspivid` commands that are passed and require additional input to fuction like so:
```bash
# NOTE: Not a working command
raspistill --output some/path/here --width 1080 --height 720
```

While the command line tools support many flags and options they're not all configured in this lib. If you discover one that you need but isn't supported, consider testing it, adding it and making a PR.
