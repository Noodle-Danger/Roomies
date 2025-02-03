import apiFetch from "../apiFetch";

import { PerkSubmitData } from "../types";
import { ActionTypes } from "../context/GlobalContext";

const getPerks = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const perks = await apiFetch.getPerks();
    if (perks) {
      dispatch({
        type: ActionTypes.GET_PERKS,
        payload: { perks },
      });
    }
  };
};

const createPerk = (perkData: PerkSubmitData) => {
  return async (dispatch: React.Dispatch<any>) => {
    const newPerk = await apiFetch.createPerk(perkData);
    if (newPerk) {
      dispatch({
        type: ActionTypes.CREATE_PERK,
        payload: newPerk,
      });
    }
  };
};
const markChoreComplete = () => {};

export { getPerks, createPerk, markChoreComplete };
