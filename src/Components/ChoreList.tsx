import React from "react";
import ChoreCreator from "./ChoreCreator";
import ChoreDisplay from "./ChoreDisplay";

function ChoreList() {
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

      <ChoreCreator />

      <div className="m-6"></div>

      <ChoreDisplay />
    </div>
  );
}

export default ChoreList;
