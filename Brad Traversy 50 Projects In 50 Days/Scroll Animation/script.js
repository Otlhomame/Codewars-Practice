const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4 //Choosing when the boxes start flying in using CSS animations

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top //finding the position of the top of the box

        if(boxTop < triggerBottom) { //The function that determines whether the box flies in or not
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}
