// Bringing in all the elements
const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')

let currentActive = 1
//Creating the logic for the app to go from circle 1 to 4 when the user clicks
next.addEventListener('click', () => {
    currentActive++ //Add 1 to the curent count every time the user clicks
    //Setting limits to the next button to not count beyond 4 which is the maximum number of circles in the app
    if(currentActive > circles.length) {
        currentActive = circles.length
    }

    update() //Updating the DOM eberytime the user clicks
})
//Creating the transition for the previous button which is opposite
prev.addEventListener('click', () => {
    currentActive--
    //Remember the first circle was set to 1 so you need to make sure when teh user clicks, it doesnt go to 0
    if(currentActive < 1) {
        currentActive = 1
    }

    update()
})
//The logic that checks what the index of the circle is in order to determine whether to go next or previous
function update() {
    circles.forEach((circle, idx) => {
        if(idx < currentActive) {
            circle.classList.add('active') //Making the cirlces show that they are active which wshows the stage.
        } else {
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')
    //Making the lines transition from grey to blue
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%' //Using percentages to determine how much of the line to turn blue
    //The logic for the previous button
    if(currentActive === 1) {
        prev.disabled = true
    } else if(currentActive === circles.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
}