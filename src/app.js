import './style.css';
import './img/globe.jpg';
import { addEntry, removeEntry, changeView, applyBackground } from './actions';
import fetchData from './weather';

document.getElementById('add-button').addEventListener('click', addEntry);

// Initialisation
const locations = [
    'Almaty, Kazakhstan',
    'Moscow, Russia',
    'London, United Kingdom'
];

const apiBeginning = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiEnd = "&appid=af98a627b098f5fee1bdc89287b37d77";

function initPlaces() {
    const placesElem = document.getElementById('places');

    locations.forEach(value => {
        let labelElement = document.createElement('a');
        labelElement.innerHTML = value;
        labelElement.href = '#'
        labelElement.addEventListener('click', changeView);

        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'x';
        removeButton.addEventListener('click', removeEntry);

        let outputElement = document.createElement('div');
        outputElement.appendChild(labelElement);
        outputElement.appendChild(removeButton);
        outputElement.classList = 'places-entry';

        placesElem.appendChild(outputElement);
    });
}

function initFirstPlace() {
    let city = locations[0].split(',')[0];
    let country = locations[0].split(',')[1];
    let api = apiBeginning + city + "," + country + apiEnd;
    fetchData(api)
        .then(data => {
            applyBackground(data.weather[0].id);
            document.getElementById('output-title').innerHTML =
                `${city}, ${country} (${data.coord.lat}, ${data.coord.lon})`;
            document.getElementById('output-temp').innerHTML =
                data.weather[0].description;
            document.getElementById('output-status').innerHTML = Math.round(data.main.temp - 273) + "°C";
        })
}

initPlaces();
initFirstPlace();