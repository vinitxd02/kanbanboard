import React, { useState } from 'react';

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

function Card({ task }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`card ${expanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
      
      
      <h3 className="card-title">{task.title}</h3>
      <div className="card-tags">
        {task.tag.map((tag, index) => (
          <span key={index} className="card-tag">
            {tag}
          </span>
        ))}
      </div>
      {expanded && (
        <div className="card-content">
          <p>User: {task.userId}</p>
          <p>Priority: {priorityLabels[task.priority]}</p>
        </div>
      )}
    </div>
  );
}

export default Card;
