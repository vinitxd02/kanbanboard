import React from 'react';
import Card from './Card';

function KanbanColumn({ title, tasks }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map(task => (
        <Card key={task.id} task={task} />
      ))}
    </div>
  );
}

export default KanbanColumn;
