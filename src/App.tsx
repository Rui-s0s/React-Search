import React, { useState } from 'react';
import { PostItem } from './components/PostItem';
import { AddItemForm } from './components/AddItemForm';
import { TagSearch } from './components/TagSearch';
import "./App.css";

import type { TextEntry, EditMode } from './types/post.types';

function App() {
  const [texts, setTexts] = useState<TextEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  
  // 1. New state to track the single expanded post
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAddItem = (content: string) => {
    setTexts([...texts, { id: Date.now(), content, tags: "" }]);
  };

  const handleStartEdit = (id: number, mode: EditMode) => {
    setEditingId(id);
    setEditMode(mode);
  };

  const handleSaveEdit = (id: number, newValue: string) => {
    setTexts(texts.map(t => {
      if (t.id === id) {
        return editMode === 'CONTENT' 
          ? { ...t, content: newValue } 
          : { ...t, tags: newValue };  
      }
      return t;
    }));
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditMode(null);
  };

  const handleBackToList = () => {
    setExpandedId(null);
    setEditingId(null);
    setEditMode(null);
  };
  

  const handleDeleteItem = (id: number) => {
    setTexts(texts.filter(t => t.id !== id));
    // If the open item is deleted, kick user back to list
    if (expandedId === id) setExpandedId(null);
  };

  const filteredTexts = texts.filter((item) => {
    if (!searchQuery.trim()) return true;
    const cleanQuery = searchQuery.replace('#', '').toLowerCase().trim();
    return item.tags.toLowerCase().split(',').some(tag => tag.trim().includes(cleanQuery));
  });

  // 2. Find the object if an item is expanded
  const expandedItem = texts.find(t => t.id === expandedId);

  return (
    <div className="container">
      {/* CONDITION A: Show Single Expanded Post */}
      {expandedItem ? (
        <div className="expanded-view-container" style={{ width: '100%', maxWidth: '80vw' }}>
          <button 
            onClick={handleBackToList} 
            className="back-button"
            style={{ marginBottom: '15px', padding: '6px 12px', cursor: 'pointer' }}
          >
            ← Back to List
          </button>
          
          <ul className="list" style={{ border: 'none' }}>
            <PostItem 
              item={expandedItem}
              editingId={editingId}
              editMode={editMode}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
            />
          </ul>

          {/* NEW: Dedicated Expanded Control Toolbar */}
          {/* Only show these management options if the item isn't actively being edited right now */}
          {editingId !== expandedItem.id && (
            <div className="expanded-toolbar" style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'flex-end' }}>
              <button onClick={() => handleStartEdit(expandedItem.id, 'TAGS')}>Edit Tags</button>
              <button onClick={() => handleStartEdit(expandedItem.id, 'CONTENT')}>Edit Content</button>
              <button 
                onClick={() => handleDeleteItem(expandedItem.id)}
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
        {/* CONDITION B: Show standard list view */}
          <TagSearch value={searchQuery} onChange={setSearchQuery} />

          <ul className="list">
            {filteredTexts.map((item) => (
              // We pass a way to expand the item down to the component
              <div 
                key={item.id} 
                onClick={(e) => {
                  // Prevent expanding if the user is clicking action buttons or inputting text
                  const target = e.target as HTMLElement;
                  if (target.tagName !== 'BUTTON' && target.tagName !== 'INPUT') {
                    setExpandedId(item.id);
                  }
                }}
                style={{ cursor: 'pointer' }}
                className="clickable-post-wrapper"
              >
                <PostItem 
                  item={item}
                  editingId={editingId}
                  editMode={editMode}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                />
              </div>
            ))}
            
            <AddItemForm onAdd={handleAddItem} />
          </ul>
        </>
      )}
    </div>
  );
}

export default App;