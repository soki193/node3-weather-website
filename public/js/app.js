const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = input.value;
    
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    fetch(`/weather?address=${search}`)
    .then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})