import GarageCars from "./garage";
import CarCreator from "./CreateCars";

export default class FieldsView {
  private container: HTMLElement;
  private WinnersContainer: HTMLElement;
  private carContainer: HTMLElement;
  private carCreator: CarCreator;
  private garageCars: GarageCars;

  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("color-container");

    // Create the car-container div
    this.carContainer = document.createElement("div");
    this.carContainer.classList.add("container");

    // Create the Winners-container div
    this.WinnersContainer = document.createElement("div");
    this.WinnersContainer.classList.add("WinnersContainer");

    // Create the CarCreator instance
    this.carCreator = new CarCreator();
    this.garageCars = new GarageCars();

    const inputField1 = this.createInputField("text");
    const colorPicker1 = this.createColorPicker();
    const button1 = this.createButtonElement("CREATE");

    const inputField2 = this.createInputField("text");
    inputField2.classList.add("UPDATE-input");
    const colorPicker2 = this.createColorPicker();
    colorPicker2.classList.add("UPDATE-color");
    const button2 = this.createButtonElement("UPDATE");
    button2.classList.add("UPDATE-button");

    const button3 = this.createButton("RACE");
    const button4 = this.createButton("RESET");
    const button5 = this.createButton("GENERATE CARS");

    button1.addEventListener("click", async () => {
      const inputValue = inputField1.value;
      const colorValue = colorPicker1.value;
      const carData = { name: inputValue, color: colorValue };

      // Call the createCar method from the GarageCars class
      const createdCar = await this.garageCars.createCar(carData);

      if (createdCar) {
        // If the car was successfully created, call createCarDiv with the response data
        this.carCreator.createCarDiv(createdCar);
      } else {
        console.log("Error creating car. Check the console for details.");
      }
    });

    button2.addEventListener("click", async () => {
      // Get the values from the input field and color picker
      const newName = inputField2.value;
      const newColor = colorPicker2.value;

      // Get the ID of the selected car from the dataset
      const selectedCarId = button2.dataset.carId;
      if (!selectedCarId) {
        console.error("No car ID found in the dataset.");
        return;
      }

      // Prepare the new data for the car
      const newData = { color: newColor, name: newName };

      try {
        // Call the updateCar method from the GarageCars class with the selected car ID and new data
        const updatedCar = await this.garageCars.updateCar(
          selectedCarId,
          newData
        );
        console.log("Car updated:", updatedCar);

        // Update the car's color and name on the web
        const carDivToUpdate = this.carContainer.querySelector(
          `[id="${updatedCar.id}"]`
        );
        if (!carDivToUpdate) {
          console.error(`Car with ID ${updatedCar.id} not found.`);
          return;
        }

        // Update the car's color on the web
        const carSvg = carDivToUpdate.querySelector(".car-svg");
        if (!carSvg) {
          console.error("Car SVG element not found.");
          return;
        }
        carSvg.setAttribute("fill", updatedCar.color);

        // Update the car's name on the web
        const carNameElement = carDivToUpdate.querySelector("span");
        if (!carNameElement) {
          console.error("Car name element not found.");
          return;
        }
        carNameElement.textContent = updatedCar.name;
      } catch (error) {
        console.error("Error updating car:", error);
      }
      inputField2.classList.remove("active");
      colorPicker2.classList.remove("active");
      button2.classList.remove("active");
    });

    button3.addEventListener("click", async () => {
      const carIds = Array.from(document.querySelectorAll(".car")).map((car) =>
        car.getAttribute("id")
      );
      const filteredCarIds = carIds.filter((id) => id !== null) as string[];

      const raceTimes: Record<string, number> = {};
      const animationStoppedCars: string[] = [];

      const promises = filteredCarIds.map((id) =>
        this.carCreator.startCarEngine(id)
      );
      try {
        const res = await Promise.any(promises);
        console.log(`Winner: Car ${res.id}`);
        const winnerInfoDiv = document.querySelector(".WiinersTextCongrats") as HTMLElement;
        if (winnerInfoDiv) {
          winnerInfoDiv.textContent = `Winner: Car ${res.id}`;
          winnerInfoDiv.style.display = "block";
        }

        const existingWinner = await this.garageCars.getWinner(Number(res.id));
        if (existingWinner) {
          const updatedData = {
            wins: existingWinner.wins + 1,
            time: Math.min(existingWinner.time, res.time),
          };
          await this.garageCars.updateWinner(Number(res.id), updatedData);
        } else {
          const winnerData = {
            id: Number(res.id),
            wins: 1,
            time: res.time,
          };

          await this.garageCars.createWinner(winnerData);
        }
      } catch (e) {
        console.log(`All cars crashed`);
      }
    });

    button4.addEventListener("click", async () => {
      const winnerInfoDiv = document.querySelector(".WiinersTextCongrats") as HTMLElement;
      if (winnerInfoDiv) {
        winnerInfoDiv.style.display = "none";
      }
      const carIds = Array.from(document.querySelectorAll(".car")).map((car) =>
        car.getAttribute("id")
      );
      const filteredCarIds = carIds.filter((id) => id !== null) as string[];
      const promises = filteredCarIds.map((id) =>
        this.carCreator.stopCarEngine(id)
      );

      await Promise.all(promises);
    });

    const carColors = [
      "Red",
      "Blue",
      "Green",
      "Yellow",
      "Orange",
      "Purple",
      "Pink",
      "Black",
      "White",
      "Silver",
      "Gray",
      "Brown",
      "Gold",
      "Cyan",
      "Magenta",
      "Lime",
      "Teal",
      "Olive",
      "Maroon",
      "Navy",
      "Aquamarine",
      "Turquoise",
      "Indigo",
      "Periwinkle",
      "Slate",
      "Lavender",
      "Mint",
      "Coral",
      "Salmon",
      "Beige",
      "Lemon",
      "Ruby",
      "Pearl",
      "Emerald",
      "Amethyst",
      "Citrine",
      "Topaz",
      "Sapphire",
      "Amber",
      "Ebony",
      "Ivory",
      "Jade",
      "Opal",
      "Onyx",
      "Plum",
      "Rose",
      "Rust",
      "Sky",
      "Sunset",
      "Violet",
      "Wine",
    ];

    const carNames = [
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "Nissan",
      "BMW",
      "Mercedes",
      "Audi",
      "Volkswagen",
      "Hyundai",
      "Kia",
      "Subaru",
      "Mazda",
      "Lexus",
      "Volvo",
      "Porsche",
      "Tesla",
      "Jaguar",
      "Land Rover",
      "Ferrari",
      "Lamborghini",
      "Rolls-Royce",
      "Bentley",
      "Bugatti",
      "Maserati",
      "Aston Martin",
      "Alfa Romeo",
      "Mini",
      "Acura",
      "Infiniti",
      "Lancia",
      "Lotus",
      "McLaren",
      "Mitsubishi",
      "Opel",
      "Peugeot",
      "Renault",
      "Saab",
      "Seat",
      "Skoda",
      "Smart",
      "Suzuki",
      "Tata",
      "Vauxhall",
      "Citroen",
      "Chrysler",
      "Dodge",
      "Jeep",
      "GMC",
    ];

    button5.addEventListener("click", async () => {
      const garageCars = new GarageCars();

      for (let i = 0; i < 100; i++) {
        const randomColor =
          carColors[Math.floor(Math.random() * carColors.length)];
        const randomName =
          carNames[Math.floor(Math.random() * carNames.length)];

        const newCar = {
          color: randomColor,
          name: randomName,
        };

        const createdCar = await garageCars.createCar(newCar);
      }

      location.reload();
    });

    // Append elements to the container
    this.container.appendChild(inputField1);
    this.container.appendChild(colorPicker1);
    this.container.appendChild(button1);

    this.container.appendChild(inputField2);
    this.container.appendChild(colorPicker2);
    this.container.appendChild(button2);

    this.container.appendChild(button3);
    this.container.appendChild(button4);
    this.container.appendChild(button5);

    // Append color-container div to car-container div
    this.carContainer.appendChild(this.container);

    // Render the CarCreator container
    this.carCreator.render(this.carContainer);
  }

  private createInputField(type: string): HTMLInputElement {
    const inputField = document.createElement("input");
    inputField.type = type;
    return inputField;
  }

  private createColorPicker(): HTMLInputElement {
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    return colorPicker;
  }

  private createButtonElement(text: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    return button;
  }

  private createButton(text: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    return button;
  }

  render(container: HTMLElement) {
    container.appendChild(this.carContainer);
  }

  async renderWinner(container: HTMLElement) {
    container.appendChild(this.WinnersContainer);

    const { winners } = await this.garageCars.getWinners();

    const table = document.createElement("table");

    const headers = ["Number", "Car", "Name", "Wins", "Best times"];
    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    winners.forEach(async (winner) => {
      const row = document.createElement("tr");

      const numberTd = document.createElement("td");
      numberTd.textContent = String(winner.id);
      row.appendChild(numberTd);

      const car = await this.garageCars.getCar(winner.id);
      if (car) {
        // Create a td element for the Car column (SVG with winner's color)
        const carTd = document.createElement("td");
        const carSvg = this.createCarSvg(car.color);
        carTd.appendChild(carSvg);
        row.appendChild(carTd);

        // Create a td element for the Name column
        const nameTd = document.createElement("td");
        nameTd.textContent = car.name;
        row.appendChild(nameTd);
      } else {
        const carTd = document.createElement("td");
        carTd.textContent = "N/A";
        row.appendChild(carTd);

        const nameTd = document.createElement("td");
        nameTd.textContent = "N/A";
        row.appendChild(nameTd);
      }

      const winsTd = document.createElement("td");
      winsTd.textContent = String(winner.wins);
      row.appendChild(winsTd);

      const bestTimesTd = document.createElement("td");
      bestTimesTd.textContent = String((winner.time / 1000).toFixed(2));
      row.appendChild(bestTimesTd);

      table.appendChild(row);
    });

    this.WinnersContainer.appendChild(table);
  }
  private createCarSvg(color: string): SVGSVGElement {
    // Create the SVG element for the car
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
    return carsvg;
  }
}
