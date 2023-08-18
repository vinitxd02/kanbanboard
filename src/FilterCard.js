import React from 'react';
import Dropdown from './Dropdown';

function FilterCard({ expanded, groupBy, sortBy, onGroupChange, onSortChange, groupByOptions, sortByOptions }) {
  if (!expanded) {
    return null; 
  }

  return (
    <div className="filter-card">
      <Dropdown label="Group by" value={groupBy} options={groupByOptions} onChange={onGroupChange} />
      <Dropdown label="Sort by" value={sortBy} options={sortByOptions} onChange={onSortChange} />
    </div>
  );
}

export default FilterCard;
