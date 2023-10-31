import { DataInterface, SourceInterface } from '../../types';
import AppController from '../controller/controller';
import { AppView, DataPayloadInterface, SourcesPayloadInterface } from '../view/appView';

class App {
    controller: AppController;

    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data as DataPayloadInterface))
            );
        this.controller.getSources((data) => this.view.drawSources(data as SourcesPayloadInterface));
    }
}

export default App;
