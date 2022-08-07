import axios from "axios"



const headerConfig = {
    headers: {
        Authorization: localStorage.getItem('token')
        // 'x-access-token': localStorage.getItem('token')
    }
}

//API for get countries list
export const getCountries = async () => {
    let response = await axios.get("https://restcountries.com/v2/all",headerConfig)
    return response
}

//API for get countries list
export const getCountryByCode = async (code) => {
    console.log(code, "get country data service");
    let response = await axios.get(`https://restcountries.com/v2/alpha/${code}`,headerConfig)
    
    return response
}


