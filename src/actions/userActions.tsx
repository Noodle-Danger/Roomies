// import api utils
import apiFetch from "../apiFetch";

// import actions types from global
import { ActionTypes } from "../context/GlobalContext";
// import type definitions
import {User} from "../types";
// define functions
let targetUserId = 0;
const getUser = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const users: User[] = await apiFetch.getUsers();
    console.log("users: ", users);
    targetUserId = targetUserId + 1;
    if (targetUserId === 5) {
      targetUserId = 1;
    }
    console.log("targetUserId: ", targetUserId);
    const user = users.find((user) => user.id === targetUserId); // set 

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
