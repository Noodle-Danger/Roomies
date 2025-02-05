import useGlobalContext from "../hooks/useGlobalContext";
import { createPerk } from "../actions/perkActions";
import { useState } from "react"; // to manage local component state
import { inputStyle, buttonStyle } from '../constants/constStyle';
import Button from './Button';
import InputField from './InputField';

const PerkInput = () => {
  const { dispatch } = useGlobalContext();

  const [perkName, setPerkName] = useState("");
  const [perkQty, setPerkQty] = useState("");
  const [tokens, setTokens] = useState("");

  const addPerk = () => {
    const perkData = {
      perk_name: perkName,
      tokens: Number(tokens),
      qty: Number(perkQty),
    };
    createPerk(perkData)(dispatch);
    setPerkName("");
    setPerkQty("");
    setTokens("");
  };

  return (
    <div className="flex">
      <InputField
        style={inputStyle}
        className="font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200"
        placeholder="Perk qty..."
        value={perkQty}
        onChange={(event) => {
          setPerkQty(event.target.value);
        }}
      />
      <InputField
        style={inputStyle}
        className="font-sans text-sky-900 py-1 px-1 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200"
        placeholder="Token amount..."
        value={tokens}
        onChange={(event) => {
          setTokens(event.target.value);
        }}
      />
      <InputField
        style={inputStyle}
        className="font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200 w-36"
        placeholder="Perk name..."
        value={perkName}
        onChange={(event) => {
          setPerkName(event.target.value);
        }}
      />

      <Button
        className="font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1"
        style={buttonStyle}
        onClick={() => {
            addPerk();
        }}
      >
        Add Perk
      </Button>
    </div>
  );
};

export default PerkInput;
