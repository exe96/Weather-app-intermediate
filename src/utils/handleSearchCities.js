export const SearchCities = (query) => {
    return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=100&language=es&format=json`)
    .then(response => {
        if (!response.ok) {
                
                throw new Error(`HTTP ${response.status}: No connection to the server`);
            }
        return response.json()}
    ).then(data => Array.isArray(data.results) ? data.results : [])
    .catch(error => {
        console.error('Error searching cities:');
    })
   
    

}



