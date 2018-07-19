import fetchData from './weather';

const apiBeginning = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiEnd = "&appid=af98a627b098f5fee1bdc89287b37d77";

export function applyBackground(code) {
    const outputElement = document.getElementById('output');
    switch (code) {
        case 800:
            outputElement.classList = 'output-clear';
            break;
        default:
            outputElement.classList = 'output-clouds';
    }
}

export function addEntry() {
    const midApi = document.getElementsByClassName('search-field')[0].value + ", " + document.getElementsByClassName('search-field')[1].value;
    fetchData(apiBeginning + midApi + apiEnd)
        .then((res) => {
            if (res.cod === 200) {
                const placesElem = document.getElementById('places');

                let labelElement = document.createElement('a');
                labelElement.innerHTML = midApi;
                labelElement.href = '#';
                labelElement.addEventListener('click', changeView);

                let removeButton = document.createElement('button');
                removeButton.innerHTML = 'x';
                removeButton.addEventListener('click', removeEntry);

                let outputElement = document.createElement('div');
                outputElement.appendChild(labelElement);
                outputElement.appendChild(removeButton);
                outputElement.classList = 'places-entry';

                document.getElementsByClassName('search-field')[0].value = "";
                document.getElementsByClassName('search-field')[1].value = "";

                placesElem.appendChild(outputElement);
            } else if (res.cod === "404") {
                console.error("Check credentials!");
            }
        })
}

export function removeEntry(e) {
    const placesElem = document.getElementById('places');
    if (confirm('Are you sure?')) {
        var div = e.target.parentElement;
        placesElem.removeChild(div);
    }
}

export function changeView(e) {
    let city = e.target.innerHTML.split(',')[0];
    let country = e.target.innerHTML.split(',')[1];
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