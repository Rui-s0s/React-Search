import React, { useState } from 'react';

interface AddItemFormProps {
  onAdd: (text: string) => void;
}

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Add new item..." 
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setInputValue('');
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}