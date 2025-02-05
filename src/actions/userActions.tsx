// import api utils
import apiFetch from "../apiFetch";

// import actions types from global
import { ActionTypes } from "../context/GlobalContext";
// import type definitions

// define functions
const getUser = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const users = await apiFetch.getUsers();
    const user = users.find((obj) => obj.id === 2);

    if (user) {
      dispatch({
        type: ActionTypes.GET_USER,
        payload: user,
      });
      getUserPerks()(dispatch);
    }
  };
};

const getUserPerks = () => {
  return async (dispatch: React.Dispatch<any>) => {
    // console.log('getUserPerks running')
    const userPerks = await apiFetch.getUserPerks();
    // console.log("getUserPerks: ", userPerks);
    if (userPerks) {
      dispatch({
        type: ActionTypes.GET_USER_PERKS,
        payload: userPerks,
      });
    }
  };
};

export { getUser, getUserPerks };
