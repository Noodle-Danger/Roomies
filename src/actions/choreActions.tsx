import apiFetch from "../apiFetch";

import { CreateChoreData, CompleteChoreData } from "../types";
import { ActionTypes } from "../context/GlobalContext";

const getChores = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const chores = await apiFetch.getChores();
    // console.log("CHORES", chores);
    if (chores) {
      dispatch({
        type: ActionTypes.GET_CHORES,
        payload: chores,
      });
    }
  };
};

const createChore = (choreData: CreateChoreData) => {
  return async (dispatch: React.Dispatch<any>) => {
    // console.log("CHORE DATA", choreData);
    const newChore = await apiFetch.createChore(choreData);
    if (newChore) {
      //   console.log("NEW CHORE", newChore);
      dispatch({
        type: ActionTypes.CREATE_CHORE,
        payload: newChore,
      });
    }
  };
};

const markChoreComplete = (choreData: CompleteChoreData, tokens:number) => {
  return async (dispatch: React.Dispatch<any>) => {
    const completedChore = await apiFetch.completeChore(choreData);
    // console.log("COMPLETED CHORE", completedChore);
    if (completedChore) {
      dispatch({
        type: ActionTypes.COMPLETE_CHORE,
        payload: completedChore,
      });
      dispatch({
        type: ActionTypes.UPDATE_USER_BALANCE,
        payload: {operation: "add", amount: tokens}
      })
    }
    getChores()(dispatch)
  };
};

export { getChores, createChore, markChoreComplete };
