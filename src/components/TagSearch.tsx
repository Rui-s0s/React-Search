import React from 'react';

interface TagSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TagSearch({ value, onChange }: TagSearchProps) {
  return (
    <div className="search-group" style={{ width: '100%', maxWidth: '80vw', marginBottom: '15px' }}>
      <input
        type="text"
        placeholder="Search by tag (e.g., 'ideas' or '#todo')..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
        style={{ width: '100%', padding: '10px', fontSize: '1rem', boxSizing: 'border-box' }}
      />
    </div>
  );
}