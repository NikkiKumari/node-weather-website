
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


const fetchWeather = (location)=>{
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                const currently = data.forecastData.currently;
                messageOne.textContent = location;
                messageTwo.textContent = `${currently.summary}, Temperature will be ${currently.temperature}F. There is ${currently.precipProbability}% chance of rain.`
            }

        })
    });
};



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messageTwo.textContent = '';
    messageOne.textContent = 'Fetching......';
    fetchWeather(location);
});