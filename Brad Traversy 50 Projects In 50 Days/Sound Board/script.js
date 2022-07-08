const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'] //Aray as usual for our sound effects

sounds.forEach(sound => { //Creating a button for each sound item from the array above
    const btn = document.createElement('button')
    btn.classList.add('btn')

    btn.innerText = sound //For the button created, the inner text will be the sound of interest from the array above when the looping function runs

    btn.addEventListener('click', () => {
        stopSongs()

        document.getElementById(sound).play()//When you click on the button, get the sound and play it
    })

    document.getElementById('buttons').appendChild(btn) //MAking the sound buttons visible on the page
})

function stopSongs() {//Pausing a song when needed
    sounds.forEach(sound => {
        const song = document.getElementById(sound)

        song.pause()
        song.currentTime = 0;
    })
}