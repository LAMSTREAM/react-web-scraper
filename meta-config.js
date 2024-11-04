
const meta = {
    title: 'Web Scraper',
    author: 'Kyle-Wong',
    headerTitle: 'Web Scraper',
    description: 'The Web Scraper',
    language: 'en-US',
    theme: 'system',
    siteUrl: 'https://streamess.net/Scraper',
}

const config = {
    "auth-domain": process.env.REACT_APP_AUTH0_DOMAIN || '',
    "auth-client-id": process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    "auth-redirect-url": process.env.REACT_APP_REDIRECT_URL || '',
    "auth-audience": process.env.REACT_APP_AUTH0_AUDIENCE || '',
    "api-url": process.env.REACT_APP_API_SERVER_URL || ''
}


module.exports = {meta, config};