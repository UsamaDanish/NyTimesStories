export const API_URLS = {
    login: 'auth/login',
    signUp: 'auth/register',
    topStoriesByNewsCategory: (category: string, apiKey: string) => `svc/topstories/v2/${category}.json?api-key=${apiKey}`,
    searchArticles: (query: string, apiKey: string) => `svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`,
}