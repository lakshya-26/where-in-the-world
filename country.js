const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector('.country-details img');
const countryTitle = document.querySelector('.details-text h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const toplLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountryNames = document.querySelector('.border-countries');
const themeChanger = document.querySelector('.theme-changer');
const darkModeToggle = document.querySelector('.dark-mode');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    flagImg.src = country.flags.svg;
    countryTitle.innerText = country.name.common;
    population.innerText = country.population.toLocaleString('en-IN');
    region.innerText = country.region;
    
    if(country.subregion){
        subRegion.innerText = country.subregion;
    }

    if(country.tld){
        toplLevelDomain.innerText = country.tld.join(', ');
    }

    if(country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }else{
        nativeName.innerText = country.name.nativename;
    }

    if(country.currencies){
        currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');
    }

    if(country.capital){
        capital.innerText = country.capital.join(', ');
    }

    if(country.languages){
    languages.innerText = Object.values(country.languages).join(', ');
    }

    if(country.borders){
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([broderCountry]) => {
                const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = broderCountry.name.common;
                borderCountryTag.href = `country.html?name=${broderCountry.name.common}`;
                borderCountryNames.append(borderCountryTag);
            })
        })
    }
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
