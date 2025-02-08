// map over ChoreItem
import React from 'react';
import ChoreItem from './ChoreItem';
import useGlobalContext from '../hooks/useGlobalContext';

const ChoreDisplay = () => {
  const { state } = useGlobalContext();
  const { chores } = state;

  return (
    <div className='chore-grid'>
      {chores &&
        chores.length > 0 &&
        chores.map((chore) => (
          <ChoreItem
            key={chore.id}
            choreId={chore.id}
            choreName={chore.task_name}
            tokens={chore.tokens}
            choreImg={chore.chore_img}
          />
        ))}
    </div>
  );
};

export default ChoreDisplay;
