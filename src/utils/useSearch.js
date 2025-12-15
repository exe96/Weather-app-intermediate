import { useContext } from "react";
import { UserContext } from "@/utils/useContext";  

const UseSearch = () => {
    const { setCityData } = useContext(UserContext);

    return { setCityData };
}

export default UseSearch;


