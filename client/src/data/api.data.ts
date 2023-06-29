export const apiData =
    {
        path: 'http://localhost:4000/',
        createRoute: (endpoint: string) =>
        {
            return apiData.path + endpoint;
        }
    };
