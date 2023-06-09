

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }
  
<Camera
    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
    onCameraError = { (error) => { handleCameraError(error); } }
    idealFacingMode = {FACING_MODES.ENVIRONMENT}
    idealResolution = {{height: 375}}
    imageType = {IMAGE_TYPES.JPG}
    imageCompression = {0.97}
    isMaxResolution = {true}
    isImageMirror = {false}
    isSilentMode = {false}
    isDisplayStartCameraError = {true}
    isFullscreen = {false}
    sizeFactor = {1}
    onCameraStart = { (stream) => { handleCameraStart(stream); } }
    onCameraStop = { () => { handleCameraStop(); } }
/>