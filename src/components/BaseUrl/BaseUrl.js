const url = (parametar) => {
    // Local url for development.
    const aspDotNetCore = "https://localhost:44312/api/"

    const testUrl = "https://ecommerce-training.azurewebsites.net/api/";

    // Hosting url for production.
    const productionUrl = "https://ecommerce-training.azurewebsites.net/api/";

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        return aspDotNetCore + parametar;
    } else {
        // production code
        return productionUrl + parametar;
    }
}

export default url;