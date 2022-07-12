//Making the numbers count up to the data target we set in html

const counters = document.querySelectorAll('.counter') //Node list similar to an array

counters.forEach(counter => {
  counter.innerText = '0'//Setting the starting value of 0 

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target') //Retrieving the max number for each counter from the html file. Its converted into a numerical format using htte + sign at the beginning
    const c = +counter.innerText //The starting point in numerical form

    const increment = target / 1000 //The metric which will be used to gradually increase from 0 to max data target value. instead of counting 1,2,3 slowly, we increment using the value of this increment chunk

    if (c < target) {//For as long as the max data target hasnt been reached, update teh html text by the increment number
      counter.innerText = `${Math.ceil(c + increment)}`
      setTimeout(updateCounter, 1) //Every 1 millisecond, keep updating the counter until it reaches target value defined above
    } else {
      counter.innerText = target
    }
  }

  updateCounter()
})