import apiFetch from "../apiFetch";

import { ChoreSubmitData } from "../types";
import { ActionTypes } from "../context/GlobalContext";

const getChores = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const chores = await apiFetch.getChores();
    if (chores) {
      dispatch({
        type: ActionTypes.GET_CHORES,
        payload: { chores },
      });
    }
  };
};

const createChore = (choreData: ChoreSubmitData) => {
  return async (dispatch: React.Dispatch<any>) => {
    console.log("CHORE DATA", choreData);
    const newChore = await apiFetch.createChore(choreData);
    if (newChore) {
      console.log("NEW CHORE", newChore);
      dispatch({
        type: ActionTypes.CREATE_CHORE,
        payload: newChore,
      });
    }
  };
};
const markChoreComplete = () => {};

export { getChores, createChore, markChoreComplete };
