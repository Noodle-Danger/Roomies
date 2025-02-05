import PerkItem from "./PerkItem";
import useGlobalContext from "../hooks/useGlobalContext";

const PerkDisplay = () => {
  const { state } = useGlobalContext();
  const { perks } = state;

  return (
    <div className="chore-grid">
      {perks &&
        perks.length > 0 &&
        perks.map((perk) => (
          <PerkItem
            key={perk.id}
            perkId={perk.id}
            // ! add the image props
            perkName={perk.perk_name}
            qty={perk.qty_remaining}
            perkTokens={perk.tokens}
          />
        ))}
    </div>
  );
};

export default PerkDisplay;
