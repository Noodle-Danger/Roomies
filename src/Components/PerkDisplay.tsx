import PerkItem from './PerkItem';
import useGlobalContext from '../hooks/useGlobalContext';

interface Perk {
  id: number;
  task_name: string;
  tokens: number;
}

interface PerkDisplayProps {
  perks: Perk[];
  onComplete: (id: number) => void;
}

const PerkDisplay = ({ onComplete }: PerkDisplayProps) => {
  const { state } = useGlobalContext();
  const { perks } = state;

  return (
    <div className="chore-grid">
      {perks &&
        perks.length > 0 &&
        perks.map((perk) => (
          <PerkItem
            key={perk.id}
            id={perk.id}
            // ! add the image props
            name={perk.perk_name}
            qty={perk.qty_remaining}
            tokens={perk.tokens}
            onClick={() => onComplete(perk.id)}
          />
        ))}
    </div>
  );
};

export default PerkDisplay;