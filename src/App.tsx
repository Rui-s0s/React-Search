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
        {texts.map((item) => {
          const isEditing = editingId === item.id;

          return (
            <li key={item.id} className="list-item">
              {isEditing ? (
                // --- MODE: EDITING ---
                <div className="item-wrapper">
                  <input 
                    className="edit-input"
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    autoFocus 
                    placeholder={editMode === 'TAGS' ? "Edit tags..." : "Edit content..."}
                  />
                  <div className="actions">
                    <button onClick={() => saveEdit(item.id)}>Save</button>
                    <button onClick={() => { setEditingId(null); setEditMode(null); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                // --- MODE: VIEWING ---
                <div className="item-wrapper">
                  <div className="content-area">
                    <strong>{item.content}</strong>
                    <span className="tags-container">
                      {item.tags.split(',')
                        .filter(t => t.trim() !== "")
                        .map((tag, index) => (
                          <span key={index} className="tag">#{tag.trim()}</span>
                        ))
                      }
                    </span>
                  </div>

                  <div className="actions">
                    <button onClick={() => startEditingTags(item)}>Tags</button>
                    <button onClick={() => startEditingContent(item)}>Edit</button>
                    <button onClick={() => setTexts(texts.filter(t => t.id !== item.id))}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;