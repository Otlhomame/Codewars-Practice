const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0;

let int = setInterval(blurring, 30); //Making the number update every 30ms

function blurring () { //The function to increase loading treext from 0 to 100%
  load++
    if(load > 99) { //Making the logic which will count from 0 to 100 every 30ms
      clearInterval(int)
    }
    loadText.innerText = `${load}%`//Changing the HTML 0% by the update fromnew load number as the number increases by 1 every 30ms
    loadText.style.opacity = scale(load, 0, 100, 1, 0)//Making the load text opacity fade from 1 to 0 as the load number increases from 0% to 100% using the scale mappiing function below
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)` //Making the blur on the background go from 30 to 0 as loaqd increases from 0 to 100
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}