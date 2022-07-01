const panels = document.querySelectorAll('.panel') //Bringing in all panels

panels.forEach(panel => { //A function that changes the styling of the panel that is clicked.
    panel.addEventListener('click', () => {
        removeActiveClasses() //Removing the current class of all other panels that havent been clicked
        panel.classList.add('active') //Adding a class of active to the clicked panel to make it larger as center of attention
    })
})

function removeActiveClasses() { //Looping throught the active panels and removing the active classes
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}