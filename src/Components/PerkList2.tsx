import PerkInput from './PerkCreator';
import PerkDisplay from './PerkDisplay';

function PerkList2() {

  return (
    <div className="p-2 m-4 h-fit">
      {/* WRAPPER DIV 
        --> PERK INPUT COMPONENT 
        --> DIV FOR SPACING
        --> PERK ROW COMPONENT
        */}

      <PerkInput />

      <div className="m-6"></div>

      <PerkDisplay />
    </div>
  );
}

export default PerkList2;
