import AppLoader from './appLoader';
import { CallbackInterface } from './loader';


class AppController extends AppLoader {
    getSources(callback: CallbackInterface) {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: CallbackInterface) {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target?.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId !== null) {
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                }
                return;
            }

            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
