const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    
    
    const APIKey = 'd293c12b8f3d717b0b09e5e5e2a903ec';
    const city = document.querySelector('.search-box input').value;


    if(city === '')
        return;
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
        
    
        if(json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');


        const image = document.querySelector('.weather-box img');
        const temp = document.querySelector('.weather-box .temp');
        const desc = document.querySelector('.weather-box .desc');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');


        switch(json.weather[0].main) {
            case 'Clear':
                image.src = 'image/sun.png';
                break;
            case 'Rain':
                image.src = 'image/rain.png';
                break;
            case 'Haze':
                image.src = 'image/haze.png';
                break;
            case 'Clouds':
                image.src = 'image/cloud.png';
                break;
            case 'Snow':
                image.src = 'image/snow.png';
                break;
            default:
                image.src = '';
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span><sup>°C</sup></span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px'


    });

});