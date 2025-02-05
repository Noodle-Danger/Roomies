// map over ChoreItem
import ChoreItem from './ChoreItem';
import useGlobalContext from '../hooks/useGlobalContext';

interface Chore {
  id: number;
  task_name: string;
  tokens: number;
}

interface ChoreDisplayProps {
  chores: Chore[];
  onComplete: (id: number) => void;
}

const ChoreDisplay = ({ onComplete }: ChoreDisplayProps) => {
  const { state } = useGlobalContext();
  const { chores } = state;

  return (
    <div className="chore-grid">
      {chores &&
        chores.length > 0 &&
        chores.map((chore) => (
            <ChoreItem
              key={chore.id}
              id={chore.id}
              // ! add the image props
              name={chore.task_name}
              tokens={chore.tokens}
              onClick={() => onComplete(chore.id)}
            />
        ))}
    </div>
  );
};

export default ChoreDisplay;
