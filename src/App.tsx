import React, { useState } from 'react';
import { PostItem } from './components/PostItem';
import { AddItemForm } from './components/AddItemForm';
import { TagSearch } from './components/TagSearch'; // 1. Import Search Bar
import "./App.css";

// Remember to use 'import type' for your types!
import type { TextEntry, EditMode } from './types/post.types';

function App() {
  const [texts, setTexts] = useState<TextEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [searchQuery, setSearchQuery] = useState(''); // 2. Search State

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

  const handleDeleteItem = (id: number) => {
    setTexts(texts.filter(t => t.id !== id));
  };

  // 3. THE FILTER MAGIC
  // This takes your original master list and calculates a temporary 
  // filtered list on every single keystroke.
  const filteredTexts = texts.filter((item) => {
    // If search is empty, show everything
    if (!searchQuery.trim()) return true;

    // Clean up the search term (remove '#' if the user types it)
    const cleanQuery = searchQuery.replace('#', '').toLowerCase().trim();

    // Check if any tag inside the item contains the search string
    return item.tags
      .toLowerCase()
      .split(',')
      .some(tag => tag.trim().includes(cleanQuery));
  });

  return (
    <div className="container">
      {/* 4. Place Search bar at the top */}
      <TagSearch value={searchQuery} onChange={setSearchQuery} />

      {/* 5. Loop through filteredTexts instead of texts */}
      <ul className="list">
        {filteredTexts.map((item) => (
          <PostItem 
            key={item.id}
            item={item}
            editingId={editingId}
            editMode={editMode}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDeleteItem}
          />
        ))}
        
        <AddItemForm onAdd={handleAddItem} />
      </ul>
    </div>
  );
}

export default App;