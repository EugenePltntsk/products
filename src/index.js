
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';



const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box" );
const ulEl = document.querySelector(".country-list");
const divEl = document.querySelector(".country-info");



inputEl.addEventListener("input", debounce(event => {
    const country = event.target.value.trim();
    if (country !== "") {
       fetchCountries(country).then(countries => {
        if (countries.length > 10) {
            Notify.warning("Too many matches found. Please enter a more specific name.");
            divEl.innerHTML = "";
            ulEl.innerHTML = "";
        } else if (countries.length > 1) {
        const template = countries.map(item => {
            return `<li><img src='${item.flags.svg}'/><h2>${item.name.official}</h2></li>`
        }).join("");

        ulEl.innerHTML = template;
        divEl.innerHTML = "";
            
        } else if (countries.length === 0) {
            Notify.failure('Oops, there is no country with that name');
            divEl.innerHTML = "";
            ulEl.innerHTML = "";

        } else if (countries.length === 1) {
            
            const item = countries[0];

            const languagesArray = Object.values(item.languages);
            const template = `<img src='${item.flags.svg}'/><p>country: ${item.name.official}</p><p>capital: ${item.capital}</p><p>population: ${item.population}</p><p>languages: ${languagesArray.join(", ")}</p>`;

           
            divEl.innerHTML = template;
            ulEl.innerHTML = "";
        }
    
    }); 
    }



    else {
        ulEl.innerHTML = "";
        divEl.innerHTML = "";
    }


    
    
}, DEBOUNCE_DELAY));


