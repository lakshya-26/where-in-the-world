const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
let allCountriesData;
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');
const darkModeToggle = document.querySelector('.dark-mode');

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) => {
    renderCountries(data);
    allCountriesData = data;
});

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
})

function renderCountries(data){
    countriesContainer.innerHTML = '';
    data.forEach((country) => {
        // console.log(country);
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `/country.html?name=${country.name.common}`

const cardHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Capital:</b> ${country.capital}</p>
            </div>
                `;

countryCard.innerHTML = cardHTML;

countriesContainer.append(countryCard);
    });
}

searchInput.addEventListener('input', (e) => {
    const filterCOuntries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filterCOuntries);
})

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    updateButtonContent();
})


function updateButtonContent() {
    const isDarkMode = document.body.classList.contains('dark');
    const iconClass = isDarkMode ? 'fa-sun' : 'fa-moon';
    darkModeToggle.innerHTML = `<i class="fa-regular ${iconClass}"></i>&nbsp;&nbsp; ${isDarkMode ? 'Light Mode' : 'Dark Mode'}`;
}
