// import react hooks
import React, { createContext, useReducer, useEffect } from "react";
import * as types from "../types";
// import custom hooks
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
  GET_CHORES: string;
  CREATE_CHORE: string;
  COMPLETE_CHORE: string;
  GET_PERKS: string;
  CREATE_PERK: string;
  PURCHASE_PERK: string;
  GET_USER_PERKS: string;
}

const ActionTypes: GlobalContextActionTypes = {
  GET_CHORES: "GET_CHORES",
  CREATE_CHORE: "CREATE_CHORE",
  COMPLETE_CHORE: "COMPLETE_CHORE",
  GET_PERKS: "GET_PERKS",
  CREATE_PERK: "CREATE_PERK",
  PURCHASE_PERK: "PURCHASE_PERK",
  GET_USER_PERKS: "GET_USER_PERKS",
};

/*
 * APPLICATION STATE
 */
interface GlobalState {
  user_id: number;
  chores: types.Chore[];
  perks: types.Perk[];
  userPerks: any[];
}

const initialState: GlobalState = {
  user_id: 1,
  chores: [],
  perks: [],
  userPerks: [],
};

/*
 * REDUCER FUNCTION
 */
interface DispatchAction {
  type: string;
  payload: any;
}

const reducer = (state: GlobalState, action: DispatchAction) => {
  switch (action.type) {
    case ActionTypes.GET_CHORES:
      console.log("CHORES", action.payload.chores);
      const fetchedChores = action.payload.chores;
      return { ...state, chores: fetchedChores };

    case ActionTypes.CREATE_CHORE:
      console.log("NEW CHORE:", action.payload);
      const newChore = action.payload;
      return { ...state, chores: [...state.chores, newChore] };

    case ActionTypes.GET_PERKS:
      console.log("PERKS:", action.payload.perks);
      const fetchedPerks = action.payload.perks;
      return { ...state, perks: fetchedPerks };

    case ActionTypes.CREATE_PERK:
      console.log("NEW PERK:", action.payload);
      //! server response is an array. can it be single object?
      const [newPerk] = action.payload;
      return { ...state, perks: [...state.perks, newPerk] };

    default:
      return state;
  }
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
