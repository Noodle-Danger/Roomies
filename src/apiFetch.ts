import {
  CreateChoreData,
  CompleteChoreData,
  CreatePerkData,
  PurchasePerkData,
} from './types';

interface apiRequests {
  // USERS
  createUser: (username: string, email: string) => Promise<any>;
  getUsers: () => Promise<any>;
  // ! client sends id as param and server sends filtered perks
  getUserPerks: () => Promise<any>;
  // CHORES
  createChore: (choreData: CreateChoreData) => Promise<any>;
  completeChore: (choreData: CompleteChoreData) => Promise<any>;
  getChores: (user_id: number) => Promise<any>;
  // PERKS
  createPerk: (perkData: CreatePerkData) => Promise<any>;
  purchasePerk: (perkData: PurchasePerkData) => Promise<any>;
  getPerks: () => Promise<any>;
}

const API_URL = 'http://localhost:8080/api';

const apiFetch: apiRequests = {
  createUser: async (username, email) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });
      if (!response.ok) {
        throw new Error(`Error in creating user: ${response.status}`);
      }
      const data = await response.json();
      console.log('Here is the created user: ', data);
      return data;
    } catch (err) {
      console.error('This is the error: ', err);
    }
  },
  getUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error(`Failed to get users: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('This is the getUser error: ', err);
    }
  },
  getUserPerks: async () => {
    try {
      const response = await fetch(`${API_URL}/userPerks`);
      if (!response.ok) {
        throw new Error(`Failed to get users: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log('ERROR: GETUSERPERKS API', err);
    }
  },
  createChore: async (choreData) => {
    try {
      const response = await fetch(`${API_URL}/chores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(choreData),
      });
      if (!response.ok) {
        throw new Error(`Error in creating a chore: ${response.status}`);
      }
      const data = await response.json();
      console.log('createChore: ', data);
      return data;
    } catch (err) {
      console.error('This is the error, ', err);
    }
  },
  completeChore: async (choreData) => {
    try {
      const response = await fetch(`${API_URL}/chores`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(choreData),
      });
      if (!response.ok) {
        throw new Error(`Error in completing chore: ${response.status}`);
      }
      const data = await response.json();
      console.log('completeChore: ', data);
      return data;
    } catch (err) {
      console.error('THIS IS THE ERROR: ', err);
    }
  },
  getChores: async (user_id: number) => {
    try {
      const responseIncompleteChores = await fetch(`${API_URL}/chores`);
      const responseCompleteChores = await fetch(
        `${API_URL}/chores/completed/${user_id}`
      );
      const incompleteChores = await responseIncompleteChores.json();
      const completeChores = await responseCompleteChores.json();
      return { incompleteChores, completeChores };
    } catch (err) {
      console.error('This is the getChore error: ', err);
    }
  },
  createPerk: async (perkData) => {
    try {
      const response = await fetch(`${API_URL}/perks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(perkData),
      });
      if (!response.ok) {
        throw new Error(`Error in creating a chore: ${response.status}`);
      }
      const data = await response.json();
      console.log('createPerk:', data);
      return data;
    } catch (err) {
      console.error('ERROR: createPerk', err);
    }
  },
  purchasePerk: async (perkData) => {
    try {
      const response = await fetch(`${API_URL}/perks`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(perkData),
      });
      if (!response.ok) {
        throw new Error(`Failed to get perks: ${response.status}`);
      }
      const data = await response.json();
      console.log('purchasePerk:', data);
      return data;
    } catch (err) {
      console.error('ERROR: PURCHASE PERK: ', err);
    }
  },
  getPerks: async () => {
    try {
      const response = await fetch(`${API_URL}/perks`);
      if (!response.ok) {
        throw new Error(`Failed to get perks: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('This is the getPerks error: ', err);
    }
  },
};

export default apiFetch;
