import cors from 'cors';

const publicURL = 
                // "http://localhost:8000/"
                ""
const apiURL = "https://rraqdwongf72vlviym7iquvfxq0vmnpe.lambda-url.ap-southeast-1.on.aws/" + "api"

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