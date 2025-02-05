import apiFetch from "../apiFetch";

import { CreatePerkData, PurchasePerkData } from "../types";
import { ActionTypes } from "../context/GlobalContext";

const getPerks = () => {
  return async (dispatch: React.Dispatch<any>) => {
    const perks = await apiFetch.getPerks();
    if (perks) {
      dispatch({
        type: ActionTypes.GET_PERKS,
        payload: perks,
      });
    }
  };
};

const createPerk = (perkData: CreatePerkData) => {
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
const purchasePerk = (perkData: PurchasePerkData, tokens: number) => {
  return async (dispatch: React.Dispatch<any>) => {
    const purchasedPerk = await apiFetch.purchasePerk(perkData);
    if (purchasedPerk) {
      dispatch({
        type: ActionTypes.UPDATE_USER_BALANCE,
        payload: { operation: "subtract", amount: tokens },
      });
      dispatch({
        type: ActionTypes.PURCHASE_PERK,
        payload: purchasedPerk,
      });
    }
  };
};

export { getPerks, createPerk, purchasePerk };
