export const environment = {
    DefaultLanguage: "en",
    production: false,
    development: true,
    environmentName:"DEV",
    baseURL:'http://localhost:8080',
    getBaseUrl(): string {
        return this.baseURL;
    }
};