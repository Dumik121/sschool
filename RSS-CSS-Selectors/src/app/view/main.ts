import View from "../element-creator/view";
import "../app.css";
import ElementCreator from "../element-creator/element-creator";
import levelVariable from "../../data/data";

const cssClasses = {
  APP: "app",
  BUTTON: "button",
  TextTitle: "TextTitle",
};

export default class MainView extends View {
  htmlElement: void;
  level: number;

  constructor(level: number) {
    const params = {
      tag: "div",
      classNames: [cssClasses.APP],
    };
    super(params);
    this.level = level;
    this.htmlElement = this.configureView();
  }

  configureView() {
    let TextTitle = {
      tag: "h1",
      classNames: [cssClasses.TextTitle],
      textContent: levelVariable[this.level].title,
      callback: null,
    };
    const creatorLabel = new ElementCreator(TextTitle);
    this.viewElementCreator.addInnerElement(creatorLabel);

    let creatorButton: ElementCreator | null = null; // Declare creatorButton variable

    let ButtonReset = {
      tag: "button",
      classNames: [cssClasses.BUTTON],
      textContent: "Reset LocalStorage",
      callback: function() {
        localStorage.clear();
        location.reload();
      },
    };

    const ResetButton = new ElementCreator(ButtonReset);
    this.viewElementCreator.addInnerElement(ResetButton);

    let labelParams = {
      tag: "button",
      classNames: [cssClasses.BUTTON],
      textContent: "Correct Answer",
      callback: () => {
        if (creatorButton?.element) {
          creatorButton.element.textContent = levelVariable[this.level].SelectItem.CorrectAnswer;
        }
      },
    };
    creatorButton = new ElementCreator(labelParams); 
    this.viewElementCreator.addInnerElement(creatorButton);
  }
}
