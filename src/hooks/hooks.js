import cors from 'cors';

const publicURL = 
                // "http://localhost:8000/"
                ""
const apiURL = "https://c69a-2402-800-617f-2239-4848-964d-4132-c473.ngrok-free.app/" + "api"

const headersWithToken = {
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