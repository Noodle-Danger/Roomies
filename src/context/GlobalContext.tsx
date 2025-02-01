// import react hooks
import React, { createContext, useReducer, useEffect } from "react";
// import custom hooks
import apiFetch from "../apiFetch";
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
  userId: number;
  chores: any[];
  perks: any[];
  userPerks: any[];
}

const initialState: GlobalState = {
  userId: 456,
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
      console.log(action.payload.chores);
      const updatedChores = action.payload.chores;
      return { ...state, chores: updatedChores };
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
    // invoke fetch functions then dispatch actions to reducer
    const getChores = async () => {
      console.log("running fetch from context");
      const chores = await apiFetch.getChores();
      if (chores) {
        dispatch({
          type: ActionTypes.GET_CHORES,
          payload: { chores: chores },
        });
      }
      return;
    };
    getChores();
  }, []);

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

export { GlobalProvider, GlobalContext };
