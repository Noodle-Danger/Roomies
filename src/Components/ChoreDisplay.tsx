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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {chores.length > 0 ? (
        chores.map((chore) => (
          <div
            key={chore.id}
            className="choreCard"
          >
            <ChoreItem
              id={chore.id}
              name={chore.task_name}
              tokens={chore.tokens}
              onClick={() => onComplete(chore.id)}
            />
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No chores available</p>
      )}
    </div>
  );
};

export default ChoreDisplay;
