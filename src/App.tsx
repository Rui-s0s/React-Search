import React, { useState } from 'react';

interface TextEntry {
  id: number;
  content: string;
}

function App() {
  const [texts, setTexts] = useState<TextEntry[]>([]);
  const [inputValue, setInputValue] = useState(''); // For the "Add" bar
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');   // For the "Inline" editing

  const addText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTexts([...texts, { id: Date.now(), content: inputValue }]);
    setInputValue('');
  };

  const saveEdit = (id: number) => {
    setTexts(texts.map(t => t.id === id ? { ...t, content: editValue } : t));
    setEditingId(null);
  };

  const startEditing = (item: TextEntry) => {
    setEditingId(item.id);
    setEditValue(item.content);
  };

  return (
    <div className="container">
      {/* ADD SECTION */}
      <form onSubmit={addText} className="input-group">
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add new item..." 
        />
        <button type="submit">Add</button>
      </form>

      {/* LIST SECTION */}
      <ul className="list">
        {texts.map((item) => (
          <li key={item.id} className="list-item">
            {editingId === item.id ? (
              // --- MODE: EDITING ---
              <div className="edit-inline">
                <input 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)} 
                  autoFocus 
                />
                <button onClick={() => saveEdit(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              // --- MODE: VIEWING ---
              <>
                <span>{item.content}</span>
                <div className="actions">
                  <button onClick={() => startEditing(item)}>Edit</button>
                  <button onClick={() => setTexts(texts.filter(t => t.id !== item.id))}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;