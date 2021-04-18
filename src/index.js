import './css/styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css'
import api from './api-service';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/many-countries-card.hbs';
const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');


const form = document.querySelector('.form')
const list = document.querySelector('.list')

form.addEventListener('input', debounce(searchCountry, 500))

function searchCountry(e) {
    e.preventDefault()
    clearArticlesContainer()
    const searchQuery = e.target.value;


  api.fetchCountries(searchQuery).then(data => {
    if (data.length > 10) {
      error({
        text: "Too many matches found. Please enter a more specific query!",
         delay: 3000
      })
    }
    else if (data.status === 404) {
      error({
        text: "No country has been found. Please enter a more specific query!",
        delay: 3000
      })
    }
    else if (data.length === 1) {
            createsMarcup(data, countryCardTpl )
        }
        else if(data.length > 1 && data.length <= 10) {
        createsMarcup(data, countryListTpl )
        }
  }).catch(Error => {
    Error({
      text: "You must enter query parameters!",
      delay: 3000
    })
  })  
}
function createsMarcup (countries, templates) {
    const marcup = countries.map(country => templates(country) 
    ).join()
     list.insertAdjacentHTML('afterbegin', marcup)
}
function clearArticlesContainer() {
  list.innerHTML = '';
}