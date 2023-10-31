import GarageCars from "./garage";

interface LinksInterface {
  last?: string;
  first?: string;
  prev?: string;
  next?: string;
}

export default class CarCreator {
  public carContainer: HTMLElement;
  public carContainerConteiner: HTMLElement;
  private garageCars: GarageCars;
  private links: LinksInterface;
  private P1: HTMLHeadingElement;
  private ButtonPrev: HTMLButtonElement; // Add ButtonPrev as a class property
  private ButtonNext: HTMLButtonElement; // Add ButtonNext as a class property

  private currentPage: number;

  constructor() {
    this.garageCars = new GarageCars();
    this.carContainer = document.createElement("div");
    this.carContainer.classList.add("car-container");

    this.carContainerConteiner = document.createElement("div");
    this.carContainerConteiner.classList.add("car-container-container");

    this.P1 = document.createElement("h1");
    this.P1.textContent = `Garage ()`;

    this.ButtonPrev = document.createElement("button"); // Initialize ButtonPrev
    this.ButtonPrev.classList.add("ButtonPrev");
    this.ButtonPrev.textContent = "Prev";
    this.ButtonPrev.addEventListener("click", () => this.prevPage()); // Add event listener

    this.ButtonNext = document.createElement("button"); // Initialize ButtonNext
    this.ButtonNext.classList.add("ButtonNext");
    this.ButtonNext.textContent = "Next";
    this.ButtonNext.addEventListener("click", () => this.nextPage()); // Add event listener

    this.currentPage = 1;
    this.links = {};

    this.carContainer.appendChild(this.P1);
    this.carContainer.appendChild(this.ButtonPrev); // Use class properties
    this.carContainer.appendChild(this.ButtonNext); // Use class properties
    this.carContainer.appendChild(this.carContainerConteiner);

    // Initialize cars from the database
    this.initializeCarsFromDatabase();
  }

  async initializeCarsFromDatabase() {
    // Fetch all cars from the database
    const { cars, links } = await this.garageCars.getCars();

    this.links = links;

    // Reverse the array to get the last added car first
    const reversedCars = cars.reverse();

    // Create car divs for each car starting from the last added car
    for (const carData of reversedCars) {
      this.createCarDiv(carData);
    }
    this.updateGarageTitle();
  }

  async renderPage(link: string) {
    // Fetch all cars from the database
    const { cars, links } = await this.garageCars.getCars(link);

    this.links = links;

    // Create car divs for each car starting from the last added car
    for (const carData of cars) {
      this.createCarDiv(carData);
    }
  }

  private getTotalPages(totalCars: number, carsPerPage: number): number {
    return Math.ceil(totalCars / carsPerPage);
  }
  private async updateGarageTitle() {
    const numberOfCars = await this.garageCars.getNumberOfCars();
    const totalPages = this.getTotalPages(numberOfCars, 7);
    this.P1.textContent = `Garage (${numberOfCars}) - Page ${this.currentPage} / ${totalPages}`;
  }

  private prevPage() {
    if (this.currentPage != 1) {
      this.carContainerConteiner.innerHTML = "";
    }

    if (!!this.links.prev) {
      this.currentPage--;
      this.renderPage(this.links.prev);
    }
  }

  private nextPage() {
    const fetchNextPage = async () => {
      const numberOfCars = await this.garageCars.getNumberOfCars();
      const totalPages = this.getTotalPages(numberOfCars, 7);
      if (totalPages !== this.currentPage) {
        this.carContainerConteiner.innerHTML = "";
      }

      if (!!this.links.next) {
        this.currentPage++;
        this.renderPage(this.links.next);
        this.updateGarageTitle();
      }
    };

    fetchNextPage();
  }

  public createCarDiv(carData: { id: string; name: string; color: string }) {
    const { id, name, color } = carData;

    const carDiv = document.createElement("div");
    carDiv.classList.add("car");
    carDiv.setAttribute("id", id); // Set the id attribute

    // Create the div for Select, Remove, and Name
    const selectRemoveNameDiv = document.createElement("div");
    selectRemoveNameDiv.classList.add("select-remove-name");

    const nameElement = document.createElement("span");
    nameElement.textContent = `${carData.name}`;

    const selectButton = document.createElement("button");
    selectButton.textContent = "Select";
    selectButton.addEventListener("click", () => this.selectCar(carData.id));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => this.deleteCar(carData.id));

    selectRemoveNameDiv.appendChild(selectButton);
    selectRemoveNameDiv.appendChild(removeButton);
    selectRemoveNameDiv.appendChild(nameElement);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

    const buttonA = document.createElement("button");
    buttonA.textContent = "A";
    buttonA.classList.add("buttonA");
    buttonA.addEventListener("click", async () => {
      try {
        await this.startCarEngine(carData.id);
      } catch (e) {
        console.error(e);
      }
    });
    
    const buttonB = document.createElement("button");
    buttonB.textContent = "B";
    buttonB.classList.add("buttonB");
    buttonB.classList.add("clicked");
    
    buttonB.addEventListener("click", async () => {
      try {
        await this.stopCarEngine(carData.id);
      } catch (e) {
        console.error(e);
      }
    });
    

    buttonDiv.appendChild(buttonA);
    buttonDiv.appendChild(buttonB);

    const carsvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    carsvg.classList.add("car-svg");
    carsvg.setAttribute("fill", color);
    carsvg.setAttribute("version", "1.1");
    carsvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    carsvg.setAttribute("viewBox", "0 -43.92 122.88 122.88");
    carsvg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "st0");
    path.setAttribute(
      "d",
      "M99.42,13.57c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73 C88.69,18.37,93.49,13.57,99.42,13.57L99.42,13.57z M79.05,5c-0.59,1.27-1.06,2.69-1.42,4.23c-0.82,2.57,0.39,3.11,3.19,2.06 c2.06-1.23,4.12-2.47,6.18-3.7c1.05-0.74,1.55-1.47,1.38-2.19c-0.34-1.42-3.08-2.16-5.33-2.6C80.19,2.23,80.39,2.11,79.05,5 L79.05,5z M23.86,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99c-2.75,0-4.99-2.23-4.99-4.99 C18.87,21.54,21.1,19.31,23.86,19.31L23.86,19.31z M99.42,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99 c-2.75,0-4.99-2.23-4.99-4.99C94.43,21.54,96.66,19.31,99.42,19.31L99.42,19.31z M46.14,12.5c2.77-2.97,5.97-4.9,9.67-6.76 c8.1-4.08,13.06-3.58,21.66-3.58l-2.89,7.5c-1.21,1.6-2.58,2.73-4.66,2.84H46.14L46.14,12.5z M23.86,13.57 c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73C13.13,18.37,17.93,13.57,23.86,13.57 L23.86,13.57z M40.82,10.3c3.52-2.19,7.35-4.15,11.59-5.82c12.91-5.09,22.78-6,36.32-1.9c4.08,1.55,8.16,3.1,12.24,4.06 c4.03,0.96,21.48,1.88,21.91,4.81l-4.31,5.15c1.57,1.36,2.85,3.03,3.32,5.64c-0.13,1.61-0.57,2.96-1.33,4.04 c-1.29,1.85-5.07,3.76-7.11,2.67c-0.65-0.35-1.02-1.05-1.01-2.24c0.06-23.9-28.79-21.18-26.62,2.82H35.48 C44.8,5.49,5.04,5.4,12.1,28.7C9.62,31.38,3.77,27.34,0,18.75c1.03-1.02,2.16-1.99,3.42-2.89c-0.06-0.05,0.06,0.19-0.15-0.17 c-0.21-0.36,0.51-1.87,1.99-2.74C13.02,8.4,31.73,8.52,40.82,10.3L40.82,10.3z"
    );
    carsvg.appendChild(path);

    const flag = document.createElement("div");
    flag.classList.add("flag-div");
    // Append the divs to the car div
    carDiv.appendChild(selectRemoveNameDiv);
    carDiv.appendChild(buttonDiv);
    carDiv.appendChild(carsvg);
    carDiv.appendChild(flag);

    this.carContainerConteiner.appendChild(carDiv);

    this.updateGarageTitle();
  }

  async startCarEngine(id: string) {
    const result = await this.garageCars.startOrStopEngine(
      Number(id),
      "started"
    );

    if (result && result.velocity && result.distance) {
      console.log(
        `Car ${id} engine started. Velocity: ${result.velocity}, Distance: ${result.distance}`
      );

      // Start animation for the car
      this.startAnimation(id, result.velocity, result.distance);
    } else {
      console.error(`Failed to start car engine.`);

      throw Error();
    }

    try {
      const switchResult = await this.garageCars.switchEngineToDriveMode(
        Number(id)
      );

      if (!switchResult || !switchResult.success) {
        console.error(
          `Failed to switch engine to drive mode for car with ID ${id}.`
        );
      }
      console.log(`Car ${id} finished`);
      return { id, time: result.distance / result.velocity };
      // success
    } catch (e) {
      this.stopAnimation(id);
      throw e;
    }
  }

  async stopCarEngine(id: string) {
    const result = await this.garageCars.startOrStopEngine(
      Number(id),
      "stopped"
    );
    const carDiv = this.carContainerConteiner.querySelector(`[id="${id}"]`);
    if (!carDiv) {
      console.error(`Car with ID ${id} not found.`);
      return;
    }

    const carSvg = carDiv.querySelector(".car-svg") as SVGElement;

    carSvg.classList.remove("car-animation");
    const carButtonA = carDiv?.querySelector(".buttonA") as HTMLElement;
    const carButtonB = carDiv?.querySelector(".buttonB") as HTMLElement;

    if (carButtonA) {
      carButtonA.classList.remove("clicked");
    }
    if (carButtonB) {
      carButtonB.classList.add("clicked");
    }
  }

  stopAnimation(id: string) {
    const carDiv = this.carContainerConteiner.querySelector(`[id="${id}"]`);
    if (!carDiv) {
      console.error(`Car with ID ${id} not found.`);
      return;
    }
    const carSvg = carDiv.querySelector(".car-svg") as SVGElement;

    carSvg.style.animationPlayState = "paused";
    console.log(`stop ${id}`);
  }

  async startAnimation(id: string, velocity: number, distance: number) {
    const carDiv = this.carContainerConteiner.querySelector(`[id="${id}"]`);

    const carButtonA = carDiv?.querySelector(".buttonA") as HTMLElement;
    const carButtonB = carDiv?.querySelector(".buttonB") as HTMLElement;

    if (carButtonA) {
      carButtonA.classList.add("clicked");
    }
    if (carButtonB) {
      carButtonB.classList.remove("clicked");
    }
    if (!carDiv) {
      console.error(`Car with ID ${id} not found.`);
      return;
    }

    const carSvg = carDiv.querySelector(".car-svg") as SVGElement;

    const animationDuration = distance / velocity;
    carSvg.style.animationDuration = animationDuration / 1000 + "s";

    // Add the animation class to the car SVG element to start the animation
    carSvg.classList.add("car-animation");
    carSvg.style.animationPlayState = "running";
  }

  private selectCar(id: string) {
    const carDivToUpdate = this.carContainerConteiner.querySelector(
      `[id="${id}"]`
    );
    if (!carDivToUpdate) {
      console.error(`Car with ID ${id} not found.`);
      return;
    }

    // Get the existing input field, color picker, and update button elements
    const inputField2 = document.querySelector(
      ".UPDATE-input"
    ) as HTMLInputElement;
    const colorPicker2 = document.querySelector(
      ".UPDATE-color"
    ) as HTMLInputElement;
    const button2 = document.querySelector(
      ".UPDATE-button"
    ) as HTMLButtonElement;

    // Add "active" class to the input field, color picker, and update button of the selected car
    inputField2.classList.add("active");
    colorPicker2.classList.add("active");
    button2.classList.add("active");

    // Set the id of the selected car to the update button
    button2.dataset.carId = id;
  }

  private async deleteCar(id: string) {
    // Find the car div with the matching id
    const carDivToRemove = this.carContainerConteiner.querySelector(
      `[id="${id}"]`
    );

    if (!carDivToRemove) {
      console.error(`Car with ID ${id} not found.`);
      return;
    }

    try {
      // Check if the car is a winner
      const winner = await this.garageCars.getWinner(Number(id));

      if (winner) {
        // If the car is a winner, delete it from the winners list
        await this.garageCars.deleteWinner(Number(id));
      }

      // Delete the car from the garage
      await this.garageCars.deleteCar(id);

      // Remove the car div from the container
      this.carContainerConteiner.removeChild(carDivToRemove);

      // Update the garage title
      this.updateGarageTitle();
    } catch (error) {
      console.error("Error deleting car:", error);
      // Handle the error if needed
    }
  }

  render(container: HTMLElement) {
    container.appendChild(this.carContainer);
  }
}
