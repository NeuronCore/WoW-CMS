export const api =
    {
        path: 'http://localhost:4000/',
        createRoute: (endpoint: string) => { return api.path + endpoint }
    }
