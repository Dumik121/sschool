export default class GarageCars {
  async getCars(link?: string) {
    try {
      const response = await fetch(
        link ?? "http://127.0.0.1:3000/garage?_page=1&_limit=7"
      );
      const links = this.parseLinkHeader(response.headers.get("Link") || "");
      const cars = await response.json();
      return { cars, links };
    } catch (error) {
      console.error("Error fetching cars:", error);
      return { cars: [] };
    }
  }

  async getCar(id) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
      const car = await response.json();
      return car;
    } catch (error) {
      console.error(`Error fetching car with ID ${id}:`, error);
      return null;
    }
  }

  async createCar(car) {
    try {
      const response = await fetch("http://127.0.0.1:3000/garage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      });
      const createdCar = await response.json();
      return createdCar;
    } catch (error) {
      console.error("Error creating car:", error);
      return null;
    }
  }

  public async deleteCar(id) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const deletedCar = await response.json();
        return deletedCar;
      }
      throw new Error(`Error deleting car with ID ${id}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateCar(id, newData) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        const updatedCar = await response.json();
        return updatedCar;
      }
      throw new Error(`Error updating car with ID ${id}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getNumberOfCars(): Promise<number> {
    try {
      const response = await fetch("http://127.0.0.1:3000/garage?_limit=0");
      return Number(response.headers.get("X-Total-Count") || 0);
    } catch (error) {
      console.error("Error fetching cars:", error);
      return 0;
    }
  }

  parseLinkHeader(linkHeader: string) {
    if (!linkHeader) {
      return {};
    }
    const linkHeadersArray = linkHeader
      .split(", ")
      .map((header) => header.split("; "));
    const linkHeadersMap = linkHeadersArray.map((header) => {
      const thisHeaderRel = header[1]?.replace(/"/g, "")?.replace("rel=", "");
      const thisHeaderUrl = header[0]?.slice(1, -1);
      return [thisHeaderRel, thisHeaderUrl];
    });
    return Object.fromEntries(linkHeadersMap);
  }

  async startOrStopEngine(
    id: number,
    status: "started" | "stopped"
  ): Promise<{ velocity: number; distance: number } | null> {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
        {
          method: "PATCH",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        throw new Error(`Car with ID ${id} was not found in the garage.`);
      } else {
        throw new Error(
          `Error starting/stopping engine for car with ID ${id}.`
        );
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async switchEngineToDriveMode(
    id: number
  ): Promise<{ success: boolean } | null> {
    const response = await fetch(
      `http://127.0.0.1:3000/engine?id=${id}&status=drive`,
      {
        method: "PATCH",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      throw new Error(
        `Engine parameters for car with ID ${id} were not found in the garage. Have you tried to set the engine status to "started" before?`
      );
    } else if (response.status === 429) {
      throw new Error(
        `Drive already in progress. You can't run the drive for the same car twice while it's not stopped.`
      );
    } else if (response.status === 500) {
      throw new Error(
        `Car has been stopped suddenly. Its engine was broken down.`
      );
    } else {
      throw new Error(
        `Error switching engine to drive mode for car with ID ${id}.`
      );
    }
  }
  async getWinners(
    _page?: number,
    _limit?: number,
    _sort?: string,
    _order?: string
  ) {
    try {
      let url = "http://127.0.0.1:3000/winners";

      if (_page !== undefined) {
        url += `?_page=${_page}`;
      }
      if (_limit !== undefined) {
        url += `&_limit=${_limit}`;
      }
      if (_sort !== undefined) {
        url += `&_sort=${_sort}`;
      }
      if (_order !== undefined) {
        url += `&_order=${_order}`;
      }

      const response = await fetch(url);
      const totalCount = Number(response.headers.get("X-Total-Count") || 0);
      const winners = await response.json();
      return { winners, totalCount };
    } catch (error) {
      console.error("Error fetching winners:", error);
      return { winners: [], totalCount: 0 };
    }
  }

  async getWinner(id: number) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`);
      if (!response.ok) {
        console.error(`Error fetching winner with ID ${id}:`, response.statusText);
        return null;
      }
      const winner = await response.json();
      console.log(winner, response.statusText);
      return winner;
    } catch (error) {
      console.error(`Error fetching winner with ID ${id}:`, error);
      return null;
    }
  }

  async createWinner(data: { id: number; wins: number; time: number }) {
    try {
      const response = await fetch("http://127.0.0.1:3000/winners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const createdWinner = await response.json();
      return createdWinner;
    } catch (error) {
      console.error("Error creating winner:", error);
      return null;
    }
  }

  async deleteWinner(id: number) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        return {};
      }
      throw new Error(`Error deleting winner with ID ${id}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateWinner(id: number, newData: { wins: number; time: number }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        const updatedWinner = await response.json();
        return updatedWinner;
      }
      throw new Error(`Error updating winner with ID ${id}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
