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
  getPerks: () => Promise<any>
}

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
 * @param {string} task_name
 * @param {string} type
 * @return
 */

apiFetch.createChore = async (task_name: string, type: string) => {
  try {
    const response = await fetch("http://localhost:8080/api/chores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name,
        type,
      }),
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
    const response = await fetch("http://localhost:8080/api/chores"); //url of endpoint

    if (!response.ok) {
      throw new Error(`Failed to get chores: ${response.status}`);
    }

    const data = await response.json(); //parse response to JSON
    // const choresArr = data.map((chore) => chore.task_name)
    // console.log('Here are all the chores', data);
    return data;
  } catch (err) {
    console.error("This is the getChore error: ", err);
  }
};

/*
* PERKS
*/

apiFetch.getPerks = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/perks"); //url of endpoint

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
