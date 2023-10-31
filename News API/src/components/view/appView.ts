import { DataInterface, SourceInterface } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export interface SourcesPayloadInterface{
    sources: SourceInterface[] 
}

export interface DataPayloadInterface{
    articles: DataInterface[] 
}

export class AppView {
    news: News;

    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DataPayloadInterface) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesPayloadInterface) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
