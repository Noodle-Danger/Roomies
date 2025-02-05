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
  userInventory: { userPerks: types.UserPerk[]; choreHistory: types.Chore[] };
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
        //   return { ...state, userInfo: user };
        draft.userInfo = user;
        break;
      case ActionTypes.GET_CHORES:
        //   console.log("FETCHED CHORES", action.payload.chores);
        const fetchedChores = action.payload;
        //   return { ...state, chores: fetchedChores };
        draft.chores = fetchedChores;
        break;
      case ActionTypes.GET_PERKS:
        //   console.log("FETCHED PERKS:", action.payload.perks);
        const fetchedPerks = action.payload;
        //   return { ...state, perks: fetchedPerks };
        draft.perks = fetchedPerks;
        break;
      case ActionTypes.GET_USER_PERKS:
        //   console.log("FETCHED USERPERKS", action.payload);
        const fetchedUserPerks = action.payload;
        const userPerks: types.UserPerk[] = fetchedUserPerks.filter(
          (perk: types.UserPerk) => perk.user_id === state.userInfo?.id
        );
        //   console.log("FILTERED USERPERKS", userPerks);
        //   return {
        //     ...state,
        //     userInventory: { ...state.userInventory, userPerks: userPerks },
        //   };
        draft.userInventory.userPerks = userPerks;
        break;
      case ActionTypes.UPDATE_USER_BALANCE:
        console.log("CHANGE BALANCE: ", action.payload);
        const { operation, amount } = action.payload;
        const newUserBalance =
          operation === "add"
            ? (draft.userInfo.tokens += amount)
            : (draft.userInfo.tokens -= amount);
        // ? (state.userInfo.tokens += amount)
        // : (state.userInfo.tokens -= amount);
        //   return { ...state, userInfo: {...state.userInfo,tokens:newUserBalance } };
        break;
      case ActionTypes.CREATE_CHORE:
        console.log("CREATED CHORE:", action.payload);
        const newChore = action.payload;
        //   return { ...state, chores: [...state.chores, newChore] };
        draft.chores.push(newChore);
        break;
      case ActionTypes.COMPLETE_CHORE:
        console.log("COMPLETED CHORE:", action.payload);
        const completedChore = action.payload;
        //   const updatedChoreHistory = {
        //     ...state.userInventory,
        //     choreHistory: [...state.userInventory.choreHistory, completedChore],
        //   };
        //   return {
        //     ...state,
        //     userInventory: updatedChoreHistory,
        //   };
        draft.userInventory.choreHistory.push(completedChore);
        break;
      case ActionTypes.CREATE_PERK:
        console.log("CREATED PERK:", action.payload);
        const [newPerk] = action.payload;
        //   return { ...state, perks: [...state.perks, newPerk] };
        draft.perks.push(newPerk);
        break;
      //   case ActionTypes.PURCHASE_PERK:
      //     console.log("PURCHASED PERK:", action.payload);
      //     const purchasedPerk = action.payload;
      //     const updatedUserPerks = {
      //       ...state.userInventory,
      //       userPerks: [...state.userInventory.userPerks, purchasedPerk],
      //     };
      //   return { ...state, userInventory: updatedUserPerks };

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
