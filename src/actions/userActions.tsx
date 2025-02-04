// import api utils
import apiFetch from "../apiFetch";

// import actions types from global
import { ActionTypes } from "../context/GlobalContext";

// import type definitions

// define functions
const getUser = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const users = await apiFetch.getUsers();
    const user = users[0];
    // console.log("USERS", users);
    if (user) {
      dispatch({
        type: ActionTypes.GET_USER,
        payload: user,
      });
    }
  };
};

const getUserPerks = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const userPerks = await apiFetch.getUserPerks();
    if (userPerks) {
      dispatch({
        type: ActionTypes.GET_USER_PERKS,
        payload: userPerks,
      });
    }
  };
};

export { getUser, getUserPerks };
