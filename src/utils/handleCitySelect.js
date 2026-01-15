
    


const HandleCitySelect = ({city, latitude, longitude, formRef, setCityData, listRef}) => {
        setCityData(city);
        localStorage.setItem('cityData', JSON.stringify(city)); 

        latitude.current.value = city.latitude.toFixed(2);
        longitude.current.value = city.longitude.toFixed(2);
        if (listRef?.current) {
        listRef.current.classList.remove('active');
    }
        formRef.current.requestSubmit();

        


}

export default HandleCitySelect;
