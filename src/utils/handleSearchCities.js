export const SearchCities = (query) => {
    return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=30&language=es&format=json`)
    .then(response => {
        if (!response.ok) {
                const result=[];
                result['error']=500;
                result['message']='Server error';
                throw new Error(result);
            }
        console.log('City response received:', response.status);
        return response.json()}
    ).then(data => {        
            console.log('City data fetched:', data);
            console.log('City results:', data.results);
            if (!data.results) {
                const result=[];
                result['error']=404;
                result['message']='No results found';
                throw new Error(result);
            }
            
        return Array.isArray(data.results) ? data.results : []
    })
    .catch(error => {
        console.error('Error fetching city data:', error.message)
        const result=error.message;
        return result;
    })
   
    

}



