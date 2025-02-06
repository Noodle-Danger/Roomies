// import react hooks
import React, { createContext, useReducer, useEffect } from "react";
import { produce } from "immer";
import * as types from "../types";
// import custom hooks
import { getUser } from "../actions/userActions";
import { getChores } from "../actions/choreActions";
import { getPerks } from "../actions/perkActions";
// define dispatch ACTION TYPES and type definitions

// define APPLICATION STATE and type definitions

// define the REDUCER FUNCTION;

// create a CONTEXT

// create a PROVIDER COMPONENT

/* 
reducer takes state and dispatch action as args; 
pairs action.type via switch statement to determine how to change state; 
returns updated state; 
*/

// create provider component;
/*
 component that destructures  the reducer hook and provides the context 
*/

/*
 * ACTION TYPES
 */
interface GlobalContextActionTypes {
  GET_USER: string;
  GET_USER_PERKS: string;
  GET_CHORES: string;
  GET_PERKS: string;
  UPDATE_USER_BALANCE: string;
  CREATE_CHORE: string;
  COMPLETE_CHORE: string;
  CREATE_PERK: string;
  PURCHASE_PERK: string;
}

const ActionTypes: GlobalContextActionTypes = {
  GET_USER: "GET_USER",
  GET_USER_PERKS: "GET_USER_PERKS",
  GET_CHORES: "GET_CHORES",
  GET_PERKS: "GET_PERKS",
  UPDATE_USER_BALANCE: "UPDATE_USER_BALANCE",
  CREATE_CHORE: "CREATE_CHORE",
  COMPLETE_CHORE: "COMPLETE_CHORE",
  CREATE_PERK: "CREATE_PERK",
  PURCHASE_PERK: "PURCHASE_PERK",
};

/*
 * APPLICATION STATE
 */
interface GlobalState {
  userInfo: types.User;
  userInventory: { userPerks: any[]; choreHistory: types.Chore[] };
  chores: types.Chore[];
  perks: types.Perk[];
}

const initialState: GlobalState = {
  userInfo: {
    id: 0,
    username: "",
    email: "",
    tokens: 0,
    created_at: "",
  },
  userInventory: {
    userPerks: [],
    choreHistory: [],
  },
  chores: [],
  perks: [],
};

/*
 * REDUCER FUNCTION
 */
interface DispatchAction {
  type: string;
  payload: any;
}

const reducer = (state: GlobalState, action: DispatchAction): GlobalState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.GET_USER:
        //   console.log("FETCHED USER:", action.payload);
        const user = action.payload;
        draft.userInfo = user;
        break;
      case ActionTypes.GET_CHORES:
        //   console.log("FETCHED CHORES", action.payload.chores);
        const fetchedChores = action.payload;
        draft.chores = fetchedChores;
        break;
      case ActionTypes.GET_PERKS:
        //   console.log("FETCHED PERKS:", action.payload.perks);
        const fetchedPerks = action.payload;
        draft.perks = fetchedPerks;
        break;
      case ActionTypes.GET_USER_PERKS:
        //   console.log("FETCHED USERPERKS", action.payload);
        const fetchedUserPerks: types.UserPerk[] = action.payload;

        const perkMap = new Map();

        fetchedUserPerks.forEach((perk) => {
          const { perk_name, user_id, qty } = perk;

          // if user_id isn't current user --> skip
          if (user_id !== state.userInfo.id) return;

          // else --> retrieve perk from map or if not in map, initialize object
          const incomingPerk = perkMap.get(perk_name) || {
            perkName: perk_name,
            totalQty: 0,
            perks: [],
          };
          // modify object values
          incomingPerk.totalQty += qty;
          incomingPerk.perks.push(perk);
          // update map value
          perkMap.set(perk_name, incomingPerk);
        });

        const sortedPerks = [...perkMap.values()].sort((a, b) =>
          a.perkName.localeCompare(b.perkName)
        );
        draft.userInventory.userPerks = sortedPerks;
        break;
      case ActionTypes.UPDATE_USER_BALANCE:
        // console.log("CHANGE BALANCE: ", action.payload);
        const { operation, amount } = action.payload;
        operation === "add"
          ? (draft.userInfo.tokens += amount)
          : (draft.userInfo.tokens -= amount);
        break;
      case ActionTypes.CREATE_CHORE:
        console.log("CREATED CHORE:", action.payload);
        const newChore = action.payload;
        draft.chores.push(newChore);
        break;
      case ActionTypes.COMPLETE_CHORE:
        console.log("COMPLETED CHORE:", action.payload);
        const completedChore = action.payload;
        draft.userInventory.choreHistory.push(completedChore);
        break;
      case ActionTypes.CREATE_PERK:
        console.log("CREATED PERK:", action.payload);
        const [newPerk] = action.payload;
        //   return { ...state, perks: [...state.perks, newPerk] };
        draft.perks.push(newPerk);
        break;
      case ActionTypes.PURCHASE_PERK:
        console.log("PURCHASED PERK:", action.payload);
        const { perk: purchasedPerk } = action.payload;
        const existingUserPerks = draft.userInventory.userPerks;
        // make array of perk names and see if purchased perk name exists
        const currentPerkNames = existingUserPerks.map((perk) => perk.perkName);
        const targetIndex = currentPerkNames.indexOf(purchasedPerk.perk_name);

        if (targetIndex >= 0) {
          const target = existingUserPerks[targetIndex];
          target.totalQty++;
          target.perks.push(purchasedPerk);
        } else {
          const newPerk = {
            perkName: purchasedPerk.perk_name,
            totalQty: 1,
            perks: [purchasedPerk],
          };
          existingUserPerks.push(newPerk);
          existingUserPerks.sort((a, b) =>
            a.perkName.localeCompare(b.perkName)
          );
        }

        /*
        [
    {
        "perkName": "Extra Vacation Day",
        "totalQty": 1,
        "perks": [
            {
                "id": 9,
                "user_id": 2,
                "perk_id": 3,
                "qty": 1,
                "purchased_at": "2025-02-05T07:36:44.155Z",
                "perk_name": "Extra Vacation Day"
            }
        ]
    },
    {
        "perkName": "Banana",
        "totalQty": 14,
        "perks": [
            {
                "id": 10,
                "user_id": 2,
                "perk_id": 15,
                "qty": 1,
                "purchased_at": "2025-02-05T07:49:41.399Z",
                "perk_name": "Banana"
            },
            {
                "id": 8,
                "user_id": 2,
                "perk_id": 16,
                "qty": 4,
                "purchased_at": "2025-02-04T12:51:22.869Z",
                "perk_name": "Banana"
            },
            {
                "id": 31,
                "user_id": 2,
                "perk_id": 12,
                "qty": 6,
                "purchased_at": "2025-02-05T14:27:34.350Z",
                "perk_name": "Banana"
            },
            {
                "id": 34,
                "user_id": 2,
                "perk_id": 14,
                "qty": 3,
                "purchased_at": "2025-02-05T14:33:55.954Z",
                "perk_name": "Banana"
            }
        ]
    },
   
]
        */
        break;
      default:
        break; //   return state;
    }
  });
};

/*
 * CREATE CONTEXT
 */
interface GlobalContext {
  state: GlobalState;
  dispatch: React.Dispatch<DispatchAction>;
}
const GlobalContext = createContext<GlobalContext | null>(null);

/*
 * PROVIDER COMPONENT
 */
const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // extract state and dispatch from useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // populate state on initial render
  useEffect(() => {
    getUser()(dispatch);
    getChores()(dispatch);
    getPerks()(dispatch);
  }, [dispatch]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// export the GlobalContext for other components to use to access the global state and dispatch function
// export the GlobalProvider for use in the main App component, wrapping the component tree that needs access to the context
// export the ActionTypes for use in other components
// export custom types for use in other components

export { GlobalProvider, GlobalContext, ActionTypes };
