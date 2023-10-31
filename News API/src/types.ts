export interface DataInterface {
    author: string;
    publishedAt: string;
    urlToImage: string;
    title: string;
    description: string;
    url: string;
    content: string;
    source: {
        name: string;
    };
}
export interface SourceInterface {
    name: string;
    id: string;
}
