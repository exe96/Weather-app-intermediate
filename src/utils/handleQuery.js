import { useEffect } from 'react';
import { SearchCities } from '@utils/handleSearchCities';

const HandleQuery = ({query, setResults, setIsOpen, setLoading}) => {
    useEffect(() => {
            const normalized = (query ?? '').trim();
        if (normalized.length < 2) {
                setResults([]);
                setIsOpen(false);
                return;
            }
    
            const timer = setTimeout(async () => {
                setLoading(true);
                const cities = await SearchCities(normalized);
                if(!cities ||cities.length === 0){
                    console.warn('No cities found');
                    setLoading(false);
                    return;
                    
                }
            
                setResults(cities);
                setIsOpen(cities.length > 0);
                setTimeout(() =>
                setLoading(false), 300);
            }, 300);
            
            return () => clearTimeout(timer);
        }, [query,setResults,setIsOpen,setLoading]);
}

export default HandleQuery;
