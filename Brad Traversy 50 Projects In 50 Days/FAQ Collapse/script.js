//Bringing in all the toggle buttons
const toggles = document.querySelectorAll('.faq-toggle')

//Lop through each toggle button and listen for a click
toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active') //toggling the class on teh parent node which is the div that has class "faq active"
    })
})
