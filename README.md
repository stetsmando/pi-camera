# PiCamera
A _very_ lightweight promise based Node.js wrapper for the [native Raspberry Pi Camera CLI tools](https://www.raspberrypi.org/documentation/usage/camera/raspicam/README.md).

_Note: This was written with the intent of NOT being a hand holding library, but rather just give you access to execute commands on the camera in a flexible way._

## Installation
```javascript
// NPM 5
npm install pi-camera

// Older NPM versions
npm install pi-camera --save
```

## Basic usage
```javascript
const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});

myCamera.snap();
  .then((msg) => {
    // Your picture was captured
  })
  .catch((error) => {
     // Handle your error
  });
```

