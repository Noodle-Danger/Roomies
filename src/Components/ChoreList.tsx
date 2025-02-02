import useGlobalContext from "../hooks/useGlobalContext";
import { createChore } from "../actions/choreActions";
import { useState } from "react"; // to manage local component state
import ChoreRow from "./ChoreRow"; // display component for chore data

function ChoreList() {
  // destructure state from context
  const { state, dispatch } = useGlobalContext();
  const { user_id, chores } = state;

  // manage chore name and token input value
  const [choreName, setChoreName] = useState("");
  const [tokens, setTokens] = useState("");

  let error;
  if (error) {
    return <div data-testid="error-message">{error}</div>;
  }

  const inputStyle = {
    boxShadow: `
        0 10px 25px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.6),
        0 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };

  const addChore = () => {
    console.log("Button clicked");
    //! trim whitespace
    //! ensure tokens is number
    // generate choreData object from user inputs
    const choreData = { user_id, task_name: choreName, tokens: Number(tokens) };
    // send choreData to action creator
    createChore(choreData)(dispatch);
    // clear input boxes
    setChoreName("");
    setTokens("");
  };

  return (
    <div className="p-2 m-4 h-fit" data-testid="chore-1">
      <h1 className="font-display text-sky-900">Chore List</h1>
      {/* {error && <div data-testid="error-message">{error}</div>} */}
      <div className="flex gap-2">
        <input
          style={inputStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1  bg-white border-white rounded-[50px] grow-2 outline-amber-200"
          placeholder="0"
          value={tokens}
          onChange={(event) => {
            console.log(event.target.value);
            setTokens(event.target.value);
          }}
        />
        <input
          style={inputStyle}
          className="font-sans text-sky-900 py-1 px-2 m-1  bg-white border-white rounded-[50px] grow-2 outline-amber-200"
          placeholder="Chore..."
          value={choreName}
          onChange={(event) => {
            console.log(event.target.value);
            setChoreName(event.target.value);
          }}
        />

        <button
          className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1"
          style={{
            boxShadow: `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `,
            transition: "all 0.1s ease-in-out",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow =
              "inset 0 2px 4px rgba(0, 0, 0, 0.2)";
            e.currentTarget.style.transform = "translateY(2px)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `;
            e.currentTarget.style.transform = "none";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `;
            e.currentTarget.style.transform = "none";
          }}
          onClick={() => {
            addChore();
          }}
        >
          Add Chore
        </button>
      </div>
      {/* DIV FOR SPACING */}
      <div className="m-6"></div>

      {/* CHORE ROWS */}
      {chores &&
        chores.length > 0 &&
        chores.map((chore) => (
          <ChoreRow
            key={chore.id}
            id={chore.id}
            name={chore.task_name}
            tokens={chore.tokens}
          />
        ))}
    </div>
  );
}

export default ChoreList;
