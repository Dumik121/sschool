import MainGarageView from "./MainGarageView";
import FieldsView from "./MainViewFields";

export default class App {
  static displayApp() {
    const main = new MainGarageView();
    const fields = new FieldsView();
    const mainElement = document.createElement("main");

    main.render(mainElement);
    fields.render(mainElement);
    
   // fields.renderWinner(mainElement);

    const container = document.querySelector("body") as HTMLElement;
    if (container) {
      container.innerHTML = "";
      container.appendChild(mainElement);
    }
  }
}

