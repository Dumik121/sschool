import View from "../element-creator/view";
import "../app.css";
import ElementCreator from "../element-creator/element-creator";
import levelVariable from "../../data/data";

const cssClasses = {
  TABLE: "table",
  TableItem: "TableItem",
};

export default class TableView extends View {
  htmlElement: void;
  level: number;
  constructor(level: number) {
    /**
     * @type {import('../element-creator/view').ViewParams}
     */
    const params = {
      tag: "div",
      classNames: [cssClasses.TABLE],
    };
    super(params);
    this.level = level;
    this.htmlElement = this.configureView();
  }

  configureView() {
    const levelItem  = levelVariable[this.level].SelectItem.AllItem;

    for (const key in levelItem) {
      const trueItem = levelVariable[this.level].SelectItem.TrueItem[key];

      if (typeof levelItem[key] === "object" && levelItem[key] !== null) {
        const parentItem = Object.keys(levelItem[key])[0];
        const parentElement = document.createElement(parentItem);
        if (trueItem === parentItem) {
          parentElement.classList.add("strobe");
        }

        for (const subKey in levelItem[key]) {
          const subElement = document.createElement(levelItem[key][subKey]);
          if (trueItem === levelItem[key][subKey]) {
            subElement.classList.add("strobe");
          }
          parentElement.appendChild(subElement);
        }

        this.viewElementCreator.addInnerElement(parentElement);
      } else if (key !== "AllItem") {
        const itemElement = document.createElement(levelItem[key]);
        if (trueItem === levelItem[key]) {
          itemElement.classList.add("strobe");
        }
        this.viewElementCreator.addInnerElement(itemElement);
      }
    }
  }
}
