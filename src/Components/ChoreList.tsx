// import context
import useGlobalContext from "../hooks/useGlobalContext";

// import display component
import ChoreInput from "./ChoreInput";
import ChoreRow from "./ChoreRow"; // display component for chore data
import UserWrapper from "./UserWrapper";

function ChoreList() {
  let error;
  if (error) {
    return <div data-testid="error-message">{error}</div>;
  }

  const { state } = useGlobalContext();
  const { userInfo, chores } = state;
  const { id } = userInfo;

  return (
    <div className="p-2 m-4 h-fit" data-testid="chore-1">
      {/* WRAPPER DIV 
      --> CHORE INPUT COMPONENT 
      --> DIV FOR SPACING
      --> CHORE ROW COMPONENT
      */}

      <ChoreInput userId={id}/>

      <div className="m-6"></div>

      {chores &&
        chores.length > 0 &&
        chores.map((chore) => (
          <ChoreRow
            key={chore.id}
            userId={id}
            choreId={chore.id}
            choreName={chore.task_name}
            tokens={chore.tokens}
          />
        ))}

      <UserWrapper />
    </div>
  );
}

export default ChoreList;
