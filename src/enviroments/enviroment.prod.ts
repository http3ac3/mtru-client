export const environment = {
    DefaultLanguage: "en",
    production: true,
    development: false,
    environmentName:"DEV",
    baseUrl: 'http://localhost:',
    getBaseUrl(): string {
        return this.baseUrl + location.port;
    }
};