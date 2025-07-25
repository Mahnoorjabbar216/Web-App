const select = document.getElementById('country-select');
const flag = document.getElementById('flag');
const capitalEl = document.getElementById('capital');
const populationEl = document.getElementById('population');
const countryInfo = document.getElementById('country-info');

let userCountryCode = null;
let lastValidSelection = "";
const countryDetailsMap = {};

// Fetch countries from REST API
fetch("https://restcountries.com/v3.1/all?fields=name,cca2,capital,population")
  .then(res => res.json())
  .then(data => {
    const countries = data
      .map(c => ({
        code: c.cca2,
        name: c.name.common,
        capital: c.capital ? c.capital[0] : "N/A",
        population: c.population || "N/A"
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(c => {
      const option = document.createElement('option');
      option.value = c.code;
      option.textContent = c.name;
      select.appendChild(option);
      countryDetailsMap[c.code] = c;
    });

    // Restore saved country
    const savedCountry = localStorage.getItem("userCountry");
    if (savedCountry && countryDetailsMap[savedCountry]) {
      select.value = savedCountry;
      showCountryDetails(savedCountry);
      lastValidSelection = savedCountry;
    }
  })
  .catch(error => {
    console.error("Error fetching country data:", error);
  });

// Show flag, capital, and population
function showCountryDetails(code) {
  const country = countryDetailsMap[code];
  if (!country) return;

  flag.src = `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
  flag.style.display = 'block';

  capitalEl.textContent = country.capital;
  populationEl.textContent = country.population.toLocaleString();
  countryInfo.style.display = 'block';
}

// Handle country select change
select.addEventListener('change', function () {
  const selectedCode = this.value;

  if (!selectedCode) {
    flag.style.display = 'none';
    countryInfo.style.display = 'none';
    localStorage.removeItem("userCountry");
    lastValidSelection = "";
    return;
  }

  // Confirm if user changes from original detected country
  if (userCountryCode && selectedCode !== userCountryCode) {
    const confirmed = confirm("Your country is Pakistan. Are you sure you want to change?");
    if (!confirmed) {
      this.value = lastValidSelection;
      return;
    }
  }

  showCountryDetails(selectedCode);
  lastValidSelection = selectedCode;
  localStorage.setItem("userCountry", selectedCode);
});

// Allow IP.js to set user’s real country code
window.setUserCountryCode = function (code) {
  userCountryCode = code;
};
