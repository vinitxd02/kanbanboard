import React, { useState, useEffect } from 'react';
import { fetchTasks,fetchUsers } from './api';
import Dropdown from './Dropdown';
import KanbanColumn from './KanbanColumn';

const groupByOptions = [
  { label: 'Status', value: 'status' },
  { label: 'User', value: 'userId' },
  { label: 'Priority', value: 'priority' },
];

const sortByOptions = [
  { label: 'Priority', value: 'priority' },
  { label: 'Title', value: 'title' },
];

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [filterExpanded, setFilterExpanded] = useState(false); // New state for filter expansion
  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };
  const statusLabels = {
    'Todo': 'To Do',
    'In progress': 'In Progress',
    'Backlog': 'Backlog',
    // ... Add more status labels as needed
  };
  
  useEffect(() => {
    Promise.all([fetchTasks(), fetchUsers()]) // Fetch tasks and users simultaneously
      .then(([tasksData, usersData]) => {
        setTasks(tasksData);
        setUsers(usersData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toggleFilterExpansion = () => {
    setFilterExpanded(!filterExpanded);
  };

  if (!Array.isArray(tasks)) {
    return <div>Loading...</div>;
  }

  const groupedTasks = tasks.reduce((acc, task) => {
    const groupKey = task[groupBy];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(task);
    return acc;
  }, {});

  Object.keys(groupedTasks).forEach(key => {
    groupedTasks[key].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  const handleGroupChange = event => {
    setGroupBy(event.target.value);
  };

  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <div className="filter-toggle">
      <button id="display" onClick={toggleFilterExpansion} className="display-button">  Display  </button>
       </div>
       {filterExpanded && (
        <div className="filter-options">
          <Dropdown
            label="Grouping"
            value={groupBy}
            options={groupByOptions}
            onChange={handleGroupChange}
          />
          <Dropdown
            label="Ordering"
            value={sortBy}
            options={sortByOptions}
            onChange={handleSortChange}
          />
        </div>
      )}
      <div className="kanban-board">
      {groupBy === 'userId' && (
    // Render columns grouped by user names
    Object.keys(groupedTasks).map(userId => {
      const user = users.find(user => user.id === userId);
      const userName = user ? user.name : 'Unknown User';
      return (
        <KanbanColumn
          key={userId}
          title={userName}
          tasks={groupedTasks[userId]}
        />
      );
    })
  )}
      {groupBy === 'status' && (
    // Render columns grouped by status
    Object.keys(groupedTasks).map(statusKey => (
      <KanbanColumn
        key={statusKey}
        title={statusLabels[statusKey]}
        tasks={groupedTasks[statusKey]}
      />
    ))
  )}
        {groupBy === 'priority' && (
  // Render columns grouped by priority
  Object.keys(groupedTasks).map(priorityKey => (
    <KanbanColumn
      key={priorityKey}
      title={`${priorityLabels[priorityKey]}`} // Use priorityLabels to get the label
      tasks={groupedTasks[priorityKey]}
    />
  ))
)}
      </div>
    </div>
    
  );
}


export default KanbanBoard;