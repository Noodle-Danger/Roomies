import useGlobalContext from "../hooks/useGlobalContext";
import PerkInput from "./PerkInput";
import PerkRow from "./PerkRow";

function PerkList() {
  const { state } = useGlobalContext();
  const { perks } = state;

  return (
    <div className="p-2 m-4 h-fit">
      {/* WRAPPER DIV 
      --> PERK INPUT COMPONENT 
      --> DIV FOR SPACING
      --> PERK ROW COMPONENT
      */}

      <PerkInput />

      <div className="m-6"></div>

      {perks &&
        perks.length > 0 &&
        perks.map((perk) => <PerkRow id={perk.id} name={perk.perk_name} qty={perk.qty_remaining} tokens={perk.tokens} />)}
    </div>
  );
}

export default PerkList;
