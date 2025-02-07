import apiFetch from "../apiFetch";

import { CreateChoreData, CompleteChoreData } from "../types";
import { ActionTypes } from "../context/GlobalContext";

const getChores = (user_id: number) => {
  return async (dispatch: React.Dispatch<any>) => {
    const chores = await apiFetch.getChores(user_id);
    const { incompleteChores, completeChores } = chores;
    // console.log("CHORES", completeChores);
    if (chores) {
      dispatch({
        type: ActionTypes.GET_CHORES,
        payload: incompleteChores,
      });
      dispatch({
        type: ActionTypes.GET_COMPLETED_CHORES,
        payload: completeChores,
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

const markChoreComplete = (
  choreData: CompleteChoreData,
  tokens: number,
  user_id: number
) => {
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
        payload: { operation: "add", amount: tokens },
      });
    }
    getChores(user_id)(dispatch);
  };
};

export { getChores, createChore, markChoreComplete };
