const apiURL = "http://127.0.0.1:8000/api"
const publicURL = "http://127.0.0.1:8000/"

const currencyConvert = (num) => {
    return (new Intl.NumberFormat("de-DE").format(num))
}

export { apiURL, publicURL, currencyConvert }