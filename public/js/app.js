const locationForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

locationForm.addEventListener('submit', (event) => {
    event.preventDefault()
    fetch('/weather?address=' + locationInput.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.weather
            }
        })
    })
})