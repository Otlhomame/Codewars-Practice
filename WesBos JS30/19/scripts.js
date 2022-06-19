const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
//Getting teh video into the mix
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }) //.mediaDevices is for newer browswers
    .then(localMediaStream => {
      console.log(localMediaStream);
    
//  DEPRECIATION : 
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      
      video.srcObject = localMediaStream; //Creating the live video feed
      video.play();
    })
    .catch(err => { //Camera access control for user permission restrictions
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() { //Transferring the frames from the video onto the screen canvas
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;//Make sure the video frame and the canvas size are the same
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with them
    // pixels = redEffect(pixels);

    pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);//The 16ms time interval between frames we take from the webcam to the canvas for us to see our face on the screen
}

function takePhoto() {
  // played the sound when taking the photo
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg'); //text based representation of the photo
  const link = document.createElement('a');//Creating the link to the photo taken from the video
  link.href = data;
  link.setAttribute('download', 'handsome'); //Downloading teh image and saving it as handsome.jpeg
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`; //MAking the photos appear on the page every time you take a photo using this function
  strip.insertBefore(link, strip.firstChild);
}
//For filtering, the process consists of extracting the pixel values from the canvas, changing their values and then putting them back on the canvas
function redEffect(pixels) { //red filter where we modified the r part of rgb colour code
  for (let i = 0; i < pixels.data.length; i+=4) { //pixels.data.length specifies the array format we want to manipulate
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}
//Effect makes the rgb colours all appear at once on the screena as a filter
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}
//An adjustable array of rgb colour values to change the filter dynamically accodrding to the constraints defined below.
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);//Making sure that the video is initialised and painted to canvas automatically when the video is played
