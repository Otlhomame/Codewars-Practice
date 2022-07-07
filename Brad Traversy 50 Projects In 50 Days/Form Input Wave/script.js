const labels = document.querySelectorAll('.form-control label')
//A function to animate the words
labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')//Split the letters into an array
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)//An array of letter spans with a delay effect applied to them
        .join('') //Turning the array back into a string
})