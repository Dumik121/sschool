import View from "../element-creator/view";
import "../app.css";
import ElementCreator from "../element-creator/element-creator";
import levelVariable from "../../data/data";

const cssClasses = {
  LevelsPanel: "LevelsPanel",
  Level: "Level",
  LevelIco: "LevelIco",
  currentlevel:"currentlevel",
  Passed : "passed",
};

export default class LevelsView extends View {
  htmlElement: void;
  setLevel: (a: number) => void;
  constructor(changeLevel: { (level: number): void; (a: number): void; }) {
    const params = {
      tag: "div",
      classNames: [cssClasses.LevelsPanel],
    };
    super(params);
    this.setLevel = changeLevel;
    this.htmlElement = this.configureView();
    document.addEventListener("DOMContentLoaded", () => {
      const levelString = localStorage.getItem("level") || "0";
      const level = parseInt(levelString, 10); // Convert the string to a number
      this.CurrentLevel(level);
    });
    
  }
  configureView() {
    for (let i in levelVariable) {
      
      let LevelDiv = {
        tag: "div",
        classNames: [cssClasses.Level],
        textContent: i,
        callback: null,
      };
      
      const creatorLevelDiv = new ElementCreator(LevelDiv);
      if (creatorLevelDiv.element) {
        if (localStorage.getItem(i) === "passed") {
          creatorLevelDiv.element.classList.add("passed");
        }
      }
      
  

      let EditorsTitle = {
        tag: "button",
        classNames: [],
        textContent: levelVariable[i].title,
        callback: () => {
          const levelNumber = parseInt(i);
          this.setLevel(levelNumber);
          this.CurrentLevel(levelNumber);
          localStorage.setItem("level", levelNumber.toString());
        },
      };
      const creatorEditor : any= new ElementCreator(EditorsTitle);


      creatorLevelDiv.addInnerElement(creatorEditor);

      this.viewElementCreator.addInnerElement(creatorLevelDiv);
    }
    
  }
  CurrentLevel(levelNumber:   number  ){
    const levelElements = document.querySelectorAll(`.${cssClasses.Level}`);

    // Check if the levelNumber is within the valid range
    if (levelNumber >= 0 && levelNumber < levelElements.length) {
      // Remove the custom class from all level elements
      levelElements.forEach((element) => {
        element.classList.remove(cssClasses.currentlevel);
      });
  
      // Add the custom class to the specified levelNumber-th element
      const targetElement = levelElements[levelNumber];
      targetElement.classList.add(cssClasses.currentlevel);
    }
  
  }
}
