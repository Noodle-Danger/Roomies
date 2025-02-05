
import ChoreInput from "./ChoreCreator";
import ChoreDisplay from "./ChoreDisplay";

function ChoreList2() {
  let error;
  if (error) {
    return <div data-testid="error-message">{error}</div>;
  }

  return (
    <div className="p-2 m-4 h-fit" data-testid="chore-1">
      {/* WRAPPER DIV 
      --> CHORE INPUT COMPONENT 
      --> DIV FOR SPACING
      --> CHORE ROW COMPONENT
      */}

      <ChoreInput />

      <div className="m-6"></div>

      <ChoreDisplay />
    </div>
  );
}

export default ChoreList2;
