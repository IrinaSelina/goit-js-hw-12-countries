const basUrl = 'https://restcountries.eu/rest/v2/name/'
export default {
    fetchCountries(searchQuery) {
        return fetch(`${basUrl}${searchQuery}`).then(response =>
            response.json(),
        );
    }
}