import { ChoreSubmitData, PerkSubmitData } from "./types";
interface apiRequests {
  // USERS
  createUser: (username: string, email: string) => Promise<any>;
  deleteUser: (id: string) => Promise<any>;
  getUsers: () => Promise<any>;
  // CHORES
  createChore: (task_name: string, type: string) => Promise<any>;
  deleteChore: (id: string) => Promise<any>;
  getChores: () => Promise<any>;
  // PERKS
  createPerk: () => Promise<any>;
  getPerks: () => Promise<any>;
}

const API_URL = "http://localhost:8080/api";

const apiFetch: any | apiRequests = {};
/*
 * USERS
 */
/**
 * Creates a new user.
 *
 * @param {string} username
 * @param {string} email
 * @return {JSON}
 */

apiFetch.createUser = async (username: string, email: string) => {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
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
};

/**
 * Deletes an existing user.
 *
 * @param id
 * @return
 */

apiFetch.deleteUser = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      //!check id proper syntax
      //!possibly pass in username instead s
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error in deleting user: ");
    }

    const data = await response.json();
    console.log("This is the deleted user: ", data);
    return data;
  } catch (err) {
    console.error("THIS IS THE ERROR: ", err);
  }
};

/**
 * Returns all users.
 *
 * @return
 */

apiFetch.getUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users"); //url of endpoint

    if (!response.ok) {
      throw new Error(`Failed to get users: ${response.status}`);
    }

    const data = await response.json(); //parse response to JSON
    // console.log('This is the data: ', data);
    const userArr = data.map((user: any) => user.username);
    // console.log("userArr in APIFetch: ", userArr);

    return userArr;
  } catch (err) {
    console.error("This is the getUser error: ", err);
  }
}; //!double check that deletion is successful

/*
 * CHORES
 */

/**
 * Creates new chore.
 *
 * @param {number} user_id
 * @param {string} task_name
 * @param {number} tokens
 * @return
 */

apiFetch.createChore = async (choreData: ChoreSubmitData) => {
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
};

/**
 * Deletes a chore.
 *
 * @param id
 * @return
 */
apiFetch.deleteChore = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/chores/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error in deleting chore: ${response.status}`);
    }

    const data = await response.json();
    console.log("This is the deleted chore: ", data);
    return data;
  } catch (err) {
    console.error("THIS IS THE ERROR: ", err);
  }
};

/**
 * Returns all chores.
 *
 * @return {JSON}
 */

apiFetch.getChores = async () => {
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
};

/*
 * PERKS
 */

apiFetch.createPerk = async (perkData: PerkSubmitData) => {
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
};

apiFetch.getPerks = async () => {
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
};

export default apiFetch;
