import cors from 'cors';

const publicURL = 
                // "http://localhost:8000/"
                ""
const apiURL = //"https://rraqdwongf72vlviym7iquvfxq0vmnpe.lambda-url.ap-southeast-1.on.aws/" 
            "https://c889-2402-800-617f-2239-4848-964d-4132-c473.ngrok-free.app/"
            + "api"

const headersWithToken = {
    accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    "Content-Type": "multipart/form-data",
    "ngrok-skip-browser-warning": "69420",
    // Origin: window.location.origin,
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