import {
  CreateChoreData,
  CompleteChoreData,
  CreatePerkData,
  PurchasePerkData,
} from "./types";
interface apiRequests {
  // USERS
  createUser: (username: string, email: string) => Promise<any>;
  getUsers: () => Promise<any>;
  // CHORES
  createChore: (choreData: CreateChoreData) => Promise<any>;
  completeChore: (choreData: CompleteChoreData) => Promise<any>;
  getChores: () => Promise<any>;
  // PERKS
  createPerk: (perkData: CreatePerkData) => Promise<any>;
  purchasePerk: (perkData: PurchasePerkData) => Promise<any>;
  getPerks: () => Promise<any>;
}

const API_URL = "http://localhost:8080/api";

const apiFetch: apiRequests = {
  createUser: async (username, email) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error in creating user: ${response.status}`);
      }

      const data = await response.json();
      console.log("Here is the created user: ", data);
      return data;
    } catch (err) {
      console.error("This is the error: ", err);
    }
  },
  getUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`); //url of endpoint

      if (!response.ok) {
        throw new Error(`Failed to get users: ${response.status}`);
      }

      const data = await response.json(); //parse response to JSON
      return data;
    } catch (err) {
      console.error("This is the getUser error: ", err);
    }
  },
  createChore: async (choreData) => {
    try {
      const response = await fetch(`${API_URL}/chores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(choreData),
      });

      if (!response.ok) {
        throw new Error(`Error in creating a chore: ${response.status}`);
      }

      const data = await response.json();
      console.log("This is the new chore (data): ", data);
      return data;
    } catch (err) {
      console.error("This is the error, ", err);
    }
  },
  completeChore: async (choreData) => {
    try {
      const response = await fetch(`${API_URL}/chores`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(choreData),
      });

      if (!response.ok) {
        throw new Error(`Error in completing chore: ${response.status}`);
      }

      const data = await response.json();
      console.log("This is the completed chore: ", data);
      return data;
    } catch (err) {
      console.error("THIS IS THE ERROR: ", err);
    }
  },
  getChores: async () => {
    try {
      const response = await fetch(`${API_URL}/chores`); //url of endpoint

      if (!response.ok) {
        throw new Error(`Failed to get chores: ${response.status}`);
      }

      const data = await response.json(); //parse response to JSON

      return data;
    } catch (err) {
      console.error("This is the getChore error: ", err);
    }
  },
  createPerk: async (perkData) => {
    try {
      const response = await fetch(`${API_URL}/perks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(perkData),
      });

      if (!response.ok) {
        throw new Error(`Error in creating a chore: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("ERROR: createPerk", err);
    }
  },
  purchasePerk: async () => {},
  getPerks: async () => {
    try {
      const response = await fetch(`${API_URL}/perks`); //url of endpoint

      if (!response.ok) {
        throw new Error(`Failed to get perks: ${response.status}`);
      }

      const data = await response.json(); //parse response to JSON
      // const choresArr = data.map((chore) => chore.task_name)
      // console.log('Here are all the chores', data);
      return data;
    } catch (err) {
      console.error("This is the getPerks error: ", err);
    }
  },
};

export default apiFetch;
