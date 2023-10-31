import FieldsView from "./MainViewFields";

export default class MainGarageView {
  private container: HTMLElement;
  private WiinersTextCongrats: HTMLElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("button-container");

    // Create the WinnersTextCongrats div
    this.WiinersTextCongrats = document.createElement("div");
    this.WiinersTextCongrats.classList.add("WiinersTextCongrats");
    this.container.appendChild(this.WiinersTextCongrats);

    this.createButton("Garage", this.handleGarageButtonClick);
    this.createButton("Winners", this.handleWinnersButtonClick);
  }

  private createButton(text: string, clickHandler: () => void) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler.bind(this));
    this.container.appendChild(button);
  }

  private handleGarageButtonClick() {
    const container = document.querySelector(".container") as HTMLElement;
    const winnerButton = document.querySelector(
      ".button-container :nth-child(3)"
    ) as HTMLElement;
  
    if (winnerButton) {
      winnerButton.classList.remove("pressed");
    }
  
    const garageButton = document.querySelector(
      ".button-container :nth-child(2)"
    ) as HTMLElement;
    if (garageButton) {
      garageButton.classList.add("pressed");
    }
  
    if (container) {
      const winnerContainer = document.querySelector(
        ".WinnersContainer"
      ) as HTMLElement;
      if (winnerContainer) {
        winnerContainer.remove();
      }
      location.reload();
    }
  }
  
  private async handleWinnersButtonClick() {
    const winnerButton = document.querySelector(
      ".button-container :nth-child(3)"
    ) as HTMLElement;
    if (winnerButton) {
      winnerButton.classList.add("pressed");
    }
  
    const garageButton = document.querySelector(
      ".button-container :nth-child(2)"
    ) as HTMLElement;
    if (garageButton) {
      garageButton.style.pointerEvents="all";
      garageButton.style.opacity='1';
    }
  
    const container = document.querySelector(".container") as HTMLElement;
    const winnerInfoDiv = document.querySelector(
      ".WiinersTextCongrats"
    ) as HTMLElement;
    if (winnerInfoDiv) {
      winnerInfoDiv.style.display = "none";
    }
    if (container) {
      container.style.display = "none";
    }
  
    const fields = new FieldsView();
    const mainElement = document.querySelector("main");
  
    if (mainElement) {
      await fields.renderWinner(mainElement);
    }
  }
  

  render(container: HTMLElement) {
    container.appendChild(this.container);
  }
}
