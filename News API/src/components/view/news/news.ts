import { DataInterface } from '../../../types';
import './news.css';

class News {
    draw(data: DataInterface[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                newsClone.querySelector<HTMLElement>('.news__item')?.classList.add('alt');
            }

            const NewsPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (NewsPhoto) NewsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            const NewsAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (NewsAuthor) NewsAuthor.textContent = item.author || item.source.name;
            const MetaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (MetaDate) MetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const NewsTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (NewsTitle) NewsTitle.textContent = item.title;
            const DeskSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (DeskSource) DeskSource.textContent = item.source.name;
            const DeskContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (DeskContent) DeskContent.textContent = item.description;
            const ReadMore = newsClone.querySelector<HTMLElement>('.news__read-more a');
            if (ReadMore) ReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsElement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
