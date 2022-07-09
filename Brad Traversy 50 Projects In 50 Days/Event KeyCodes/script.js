const insert = document.getElementById('insert')

//Getting the key,keycode and code objects into the browser
window.addEventListener('keydown', (event) => { //By console.log(e) you can find out the properties of key that has been pressed down
  insert.innerHTML = `
  <div class="key">
    ${event.key === ' ' ? 'Space' : event.key}
    <small>event.key</small>
  </div>

  <div class="key">
    ${event.keyCode}
    <small>event.keyCode</small>
  </div>

  <div class="key">
    ${event.code}
    <small>event.code</small>
  </div>
  `
})
