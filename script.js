// Function to create a card element
function createCard(country) {
  const card = document.createElement('div');
  card.className = 'card col-lg-4 col-sm-12';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  cardHeader.textContent = country.name;

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const capital = document.createElement('p');
  capital.textContent = 'Capital: ' + country.capital;

  const region = document.createElement('p');
  region.textContent = 'Region: ' + country.region;

  const latlng = document.createElement('p');
  latlng.textContent = 'Latlng: ' + country.latlng.join(', ');

  const countryCodes = document.createElement('p');
  countryCodes.textContent = 'Country Codes: ' + country.alpha2Code + ', ' + country.alpha3Code;

  const flag = document.createElement('img');
  flag.src = country.flag;

  const weatherButton = document.createElement('button');
  weatherButton.className = 'btn btn-primary';
  weatherButton.textContent = 'Click for Weather';
  weatherButton.addEventListener('click', function () {
    fetchWeather(country);
  });

  cardBody.appendChild(capital);
  cardBody.appendChild(region);
  cardBody.appendChild(latlng);
  cardBody.appendChild(countryCodes);
  cardBody.appendChild(flag);
  cardBody.appendChild(weatherButton);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  return card;
}

// Function to fetch country data from REST Countries API
function fetchCountries() {
  fetch('https://restcountries.com/v3.1/all')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const countriesContainer = document.getElementById('countries-container');
      data.forEach(function (country) {
        const card = createCard(country);
        countriesContainer.appendChild(card);
      });
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
}

// Function to fetch weather data from OpenWeatherMap API
function fetchWeather(country) {
  const cityName = country.capital[0];

  // Pass necessary values from REST Countries API to OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR_API_KEY`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Weather Data:', data);
      // Display weather data in a modal or perform any desired actions
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
}

// Fetch countries when the page is loaded
fetchCountries();
