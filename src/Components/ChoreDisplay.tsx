// map over ChoreItem
import ChoreItem from "./ChoreItem";
import useGlobalContext from "../hooks/useGlobalContext";

const ChoreDisplay = () => {
  const { state } = useGlobalContext();
  const { chores } = state;

  return (
    <div className="chore-grid">
      {chores &&
        chores.length > 0 &&
        chores.map((chore) => (
          <ChoreItem
            key={chore.id}
            choreId={chore.id}
            // ! add the image props
            choreName={chore.task_name}
            tokens={chore.tokens}
          />
        ))}
    </div>
  );
};

export default ChoreDisplay;
