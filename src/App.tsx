import React, { useState } from 'react';
import "./App.css"


interface TextEntry {
  id: number;
  content: string;
  tags: string;
}

type EditMode = 'CONTENT' | 'TAGS' | null;

function App() {
  const [texts, setTexts] = useState<TextEntry[]>([]);
  const [inputValue, setInputValue] = useState(''); // For the "Add" bar
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [editValue, setEditValue] = useState('');   // For the "Inline" editing

  const addText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTexts([...texts, { id: Date.now(), content: inputValue, tags:"" }]);
    setInputValue('');
  };

  const startEditingContent = (item: TextEntry) => {
    setEditingId(item.id);
    setEditMode('CONTENT');
    setEditValue(item.content);
  };

  const startEditingTags = (item: TextEntry) => {
    setEditingId(item.id);
    setEditMode('TAGS');
    setEditValue(item.tags);
  };

  const saveEdit = (id: number) => {
    setTexts(texts.map(t => {
      if (t.id === id) {
        return editMode === 'CONTENT' 
          ? { ...t, content: editValue } 
          : { ...t, tags: editValue };  
      }
      return t;
    }));
    setEditingId(null);
    setEditMode(null);
  };

  return (
    <div className="container">
      {/* LIST SECTION */}
      <ul className="list">
        {texts.map((item) => {
          const isEditing = editingId === item.id;

          return (
            <li key={item.id} className="list-item">
              {isEditing ? (
                // --- EDITING UI ---
                <div className="item-wrapper" style={{ width: '100%' }}>
                  <input 
                    className="edit-input"
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    autoFocus 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(item.id);
                      if (e.key === 'Escape') { setEditingId(null); setEditMode(null); }
                    }}
                  />
                </div>
              ) : (
                // --- VIEWING UI ---
                <>
                  <div className="post-container">
                    {/* 1. TOP: Tags row with ellipsis handling */}
                    <div className="tags-container">
                      {item.tags.split(',')
                        .filter(t => t.trim() !== "")
                        .map((tag, index) => (
                          <span key={index} className="tag">#{tag.trim()}</span>
                        ))
                      }
                    </div>

                    {/* 2. MIDDLE: Content Area that scrolls if it gets too big */}
                    <div className="content-area">
                      <strong>{item.content}</strong>
                    </div>

                    {/* 3. BOTTOM: Just the actions pinned to the right side */}
                    <div className="item-footer">
                      <div className="actions">
                        <button onClick={() => startEditingTags(item)}>Tags</button>
                        <button onClick={() => startEditingContent(item)}>Edit</button>
                        <button onClick={() => setTexts(texts.filter(t => t.id !== item.id))}>Delete</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </li>
          );
        })}
        {/* ADD SECTION */}
        <form 
          onSubmit={(e) => {
            e.preventDefault(); // Stop the page refresh!
            addText(e);
          }} 
          className="input-group"
        >
          <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Add new item..." 
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setInputValue(''); // Clear the input
                (e.target as HTMLInputElement).blur(); // Remove focus from the box
              }
            }}
          />
          {/* You can keep the button or remove it; Enter will still work */}
          <button type="submit">Add</button>
        </form>
      </ul>
    </div>
  );
}

export default App;