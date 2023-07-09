import cors from 'cors';

const publicURL = 
                // "http://localhost:8000/"
                ""
const apiURL = "https://dry-dawn-29479-ac33aa1a4e62.herokuapp.com/" + "api"

const headersWithToken = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',

    accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    "Content-Type": "multipart/form-data",
}

const scrollToSection = (elementRef) => {
    window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
    });
};

const currencyConvert = (num) => {
    return (new Intl.NumberFormat("de-DE").format(num))
}

export { apiURL, publicURL, currencyConvert, scrollToSection, headersWithToken }