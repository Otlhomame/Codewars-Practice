/* Get our elements of the video player*/

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*2 ways to Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}


//Second way to build the play pause effect
// function togglePlay () {
//   if(video.paused) {
//     video.play();
//   }else {
//     video.pause();
//   }
// }

//Updating/changing the play button when the video is paused. Make sure we update the button whenever the video is paused
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'; //If its true that the video is paused, insert the play icon and if its playing, insert the pause icon
  console.log(icon);
  toggle.textContent = icon; //modify the content of the toggle element on the HTML  
}

//Creating Skip buttons on the video
function skip() { //We can use the number of seconds indicated in the HTML button to write the function by which we can skip throught the video
  video.currentTime += parseFloat(this.dataset.skip);
}
//handling the range in the video
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//Progress bar which must update in percentage when you drag it manually across the screen
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`; //flexbasis component found in the inspect element part of browser
}

//Scrub function to listen to a click on the progress bar to manually skip to the users desired location
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //this function uses pixels in the offsetX progress bar element on the page to detect where the user clicked
  video.currentTime = scrubTime;
}

/*Hook up the event listeners wfor when you click the video*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); //When the viudeo is played, run the update button function
video.addEventListener('pause', updateButton); //When the viudeo is played, run the update button function
video.addEventListener('timeUpdate', handleProgress); //Used to initialise the progress bar and run handle progress when the time is updated

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));//Listening for anythiing that has data=akip element in it from elements above
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); //Moving the marker that indicates video timestamp
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; //Check whether someone isnt clicking the mouse
progress.addEventListener('click', scrub); // Listene to when the user clicks on the progress element
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //Listen to when the user clicks and it automatically runs scrub. If false, ti doesnt run scrub
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);