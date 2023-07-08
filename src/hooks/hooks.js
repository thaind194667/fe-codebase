const publicURL = 
                // "http://localhost:8000/"
                "https://vapor-ap-southeast-1-assets-1688825259.s3.ap-southeast-1.amazonaws.com/4fe2a50b-b3c0-49c8-80c7-d20ce223ac0a/"
const apiURL = "https://yap36pcaypqwdyhfs5dku222bi0yeokj.lambda-url.ap-southeast-1.on.aws/" + "api"

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