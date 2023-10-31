type ElementParams = {
  tag: string;
  classNames: Array<string>;
  textContent: string;
  callback: (() => void) | null;
  placeholder?: string;
};

export default class ElementCreator {
  element: HTMLElement | null;

  constructor(params: ElementParams) {
    this.element = null;
    this.createElement(params);
  }

  getElement() {
    return this.element;
  }

  addInnerElement(element: HTMLElement | ElementCreator) {
    if (element instanceof ElementCreator) {
      const childElement = element.getElement();
      if (childElement) {
        this.element?.appendChild(childElement);
      }
    } else {
      this.element?.appendChild(element);
    }
  }

  createElement(params: ElementParams) {
    this.element = document.createElement(params.tag);
    this.setCssClasses(params.classNames);
    this.setTextContent(params.textContent);
    this.setCallback(params.callback);
    if (params.placeholder) {
      this.setPlaceholder(params.placeholder);
    }
  }

  setPlaceholder(placeholder: string) {
    if (this.element instanceof HTMLInputElement) {
      this.element.placeholder = placeholder;
    }
  }

  setCssClasses(cssClasses: string[] = []) {
    cssClasses.forEach((cssClass) => this.element?.classList.add(cssClass));
  }

  setTextContent(text: string = "") {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  setCallback(callback: (() => void) | null): void {
    if (typeof callback === "function") {
      this.element?.addEventListener("click", callback);
    }
  }
}
