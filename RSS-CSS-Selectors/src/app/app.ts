import EditorsView from "./view/EditorsSpace";
import LevelsView from "./view/levels";
import MainView from "./view/main";
import TableView from "./view/table";

export default class App {
  private static changeLevel(level: number) {
    try {
      App.displayLevel(level);
    } catch (e) {
      console.log(e);
    }
  }

  static displayLevel(
    level: number = parseInt(localStorage.getItem("level") || "0")
  ) {
    const main = new MainView(level);
    const table = new TableView(level);
    const editors = new EditorsView(level, App.changeLevel);
    const levels = new LevelsView(App.changeLevel);

    const container = document.querySelector("main") as HTMLElement;
    if (container) {
      // Clear the existing content inside the container
      container.innerHTML = "";

      // Append new elements to the container
      container.appendChild(main.getHtmlElement());
      container.appendChild(table.getHtmlElement());
      container.appendChild(editors.getHtmlElement());
      container.appendChild(levels.getHtmlElement());
    } else {
      console.error("The 'main' element was not found.");
    }
  }
}
