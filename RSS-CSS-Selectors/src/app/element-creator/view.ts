import ElementCreator from './element-creator';
type ElementParams = {
  tag: string;
  classNames: Array<string>;
  textContent: string;
  callback: (() => void) | null;
  placeholder?: string;
};

export default class View {
  viewElementCreator: ElementCreator;

  constructor(params: { tag: string; classNames: string[] } = { tag: "section", classNames: [""] }) {
    this.viewElementCreator = this.createView(params);
  }

  getHtmlElement(): HTMLElement {
    return this.viewElementCreator.getElement() as HTMLElement;
  }

  createView(params: { tag: string; classNames: string[] }): ElementCreator {
    const elementParams: ElementParams = {
      tag: params.tag,
      classNames: params.classNames,
      textContent: "",
      callback: null,
    };
    const viewElementCreator = new ElementCreator(elementParams);

    return viewElementCreator;
  }
}
