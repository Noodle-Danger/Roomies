// import api utils
import apiFetch from "../apiFetch";

// import actions types from global
import { ActionTypes } from "../context/GlobalContext";

// import type definitions

// define functions
const getUser = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const users = await apiFetch.getUsers();
    const user = users[0]
    // console.log("USERS", users);
    if (user) {
      dispatch({
        type: ActionTypes.GET_USER,
        payload: user,
      });
    }
  };
};

export { getUser };
