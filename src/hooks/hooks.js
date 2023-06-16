const apiURL = "http://127.0.0.1:8000/api"
const publicURL = "http://127.0.0.1:8000/"

const scrollToSection = (elementRef) => {
    window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
    });
};

const currencyConvert = (num) => {
    return (new Intl.NumberFormat("de-DE").format(num))
}

export { apiURL, publicURL, currencyConvert, scrollToSection }