import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'bc53c940a6f74c8596534d3ba0bcc253', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
