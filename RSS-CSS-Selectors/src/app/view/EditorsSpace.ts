import View from "../element-creator/view";
import "../app.css";
import ElementCreator from "../element-creator/element-creator";
import levelVariable from "../../data/data";

const cssClasses = {
  EditorWindow: "EditorWindow",
  EditorsTitle: "EditorsTitle",
  InputField: "InputField",
  HTMLField: "HTMLField",
};

export default class EditorsView extends View {
  htmlElement: void;
  level: number;
  setLevel: (a: number) => void;
  constructor(
    level: number,
    changeLevel: { (level: number): void; (a: number): void }
  ) {
    const params = {
      tag: "div",
      classNames: [cssClasses.EditorWindow],
    };
    super(params);
    this.level = level;
    this.htmlElement = this.configureView();
    this.setLevel = changeLevel;
  }
  configureView() {
    let EditorsTitle = {
      tag: "div",
      classNames: [cssClasses.EditorsTitle],
      textContent: "CSS Editor",
      callback: null,
    };
    const creatorEditor = new ElementCreator(EditorsTitle);
    this.viewElementCreator.addInnerElement(creatorEditor);

    let EditorsTitle2 = {
      tag: "div",
      classNames: [cssClasses.EditorsTitle],
      textContent: "HTML Viewer",
      callback: null,
    };
    const creatorEditor2 = new ElementCreator(EditorsTitle2);
    this.viewElementCreator.addInnerElement(creatorEditor2);

    let InputField = {
      tag: "input",
      classNames: [cssClasses.InputField],
      textContent: "",
      callback: null,
      placeholder: "Type in a CSS selectors",
    };
    const Inputcreate = new ElementCreator(InputField);
    this.viewElementCreator.addInnerElement(Inputcreate);

    const isCorrect = levelVariable[this.level].SelectItem.CorrectAnswer;

    // input check function
if (Inputcreate.element) {
  Inputcreate.element.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLButtonElement)?.value;

      if (isCorrect === inputValue) {
        localStorage.setItem("level", (this.level + 1).toString());
        (e.target as HTMLButtonElement)?.classList.remove("shake");
        this.setLevel(++this.level);

        const levelElements = document.querySelectorAll(".Level");
        if (this.level >= 0 && this.level < levelElements.length) {
          levelElements.forEach((element, index) => {
            element.classList.remove("currentlevel");
            if (index < this.level - 1) {
              element.classList.add("passed");
            }
          });

          const targetElement = levelElements[this.level];
          const previousElement = levelElements[this.level - 1];
          targetElement.classList.add("currentlevel");
          previousElement.classList.add("passed");
          localStorage.setItem((this.level - 1).toString(), "passed");
        }
      } else {
        (e.target as HTMLButtonElement)?.classList.add("shake");
        setTimeout(function () {
          (e.target as HTMLButtonElement)?.classList.remove("shake");
        }, 2000);
      }
    }
  });
}


    let HTMLField = {
      tag: "div",
      classNames: [cssClasses.HTMLField],
      textContent: "",
      callback: null,
    };

    const HTMLFieldcreate = new ElementCreator(HTMLField);
    this.viewElementCreator.addInnerElement(HTMLFieldcreate);

    const levelItem = levelVariable[this.level].SelectItem.AllItem;
    let divElementBegin = document.createElement("div");
    divElementBegin.textContent = "<div class=" + "table" + ">";
    HTMLFieldcreate.addInnerElement(divElementBegin);

    for (const key in levelItem) {
      let divElement = document.createElement("div");
      if (typeof levelItem[key] === "object" && levelItem[key] !== null) {
        let divElementObjBegin = document.createElement("div");
        divElementObjBegin.textContent = `    <${
          Object.keys(levelItem[key])[0]
        }>\n`;
        HTMLFieldcreate.addInnerElement(divElementObjBegin);
        for (const subKey in levelItem[key]) {
          let divElementObjEnd = document.createElement("div");
          divElementObjEnd.textContent = `            <${levelItem[key][subKey]}/>\n`;
          HTMLFieldcreate.addInnerElement(divElementObjEnd);
        }
        divElement.textContent = `    </${Object.keys(levelItem[key])[0]}>\n`;
        HTMLFieldcreate.addInnerElement(divElement);
      } else {
        divElement.textContent = `    <${levelItem[key]}/>\n`;
        HTMLFieldcreate.addInnerElement(divElement);
      }
    }
    let divElementEnd = document.createElement("div");
    divElementEnd.textContent = "</div>";
    HTMLFieldcreate.addInnerElement(divElementEnd);
  }
}
function reload() {
  throw new Error("Function not implemented.");
}
