import useGlobalContext from "../hooks/useGlobalContext";
import { createChore } from "../actions/choreActions";
import { useState } from "react"; // to manage local component state

const PerkInput = () => {
  const inputStyle = {
    boxShadow: `
            0 10px 25px -3px rgba(0, 0, 0, 0.3),
            0 4px 6px -2px rgba(0, 0, 0, 0.6),
            0 20px 25px -5px rgba(0, 0, 0, 0.2),
            inset 0 2px 2px rgba(255, 255, 255, 0.95)
            `,
  };

  const [perkName, setPerkName] = useState("");
  const [perkQty, setPerkQty] = useState("");
  const [tokens, setTokens] = useState("");

  const addPerk = () => {
    setPerkName("");
    setPerkQty("");
    setTokens("");
  };

  return (
    <div className="flex gap-2">
      <input
        style={inputStyle}
        className="font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200"
        placeholder="Perk qty..."
        value={perkQty}
        onChange={(event) => {
          setPerkQty(event.target.value);
        }}
      />
      <input
        style={inputStyle}
        className="font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200"
        placeholder="Token amount..."
        value={tokens}
        onChange={(event) => {
          setTokens(event.target.value);
        }}
      />
      <input
        style={inputStyle}
        className="font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200"
        placeholder="Perk name..."
        value={perkName}
        onChange={(event) => {
          setPerkName(event.target.value);
        }}
      />

      <button
        className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-2"
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
          addPerk();
        }}
      >
        Add Perk
      </button>
    </div>
  );
};

export default PerkInput;
