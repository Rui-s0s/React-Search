import React, { useState } from 'react';

interface PostEditorProps {
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function PostEditor({ initialValue, onSave, onCancel }: PostEditorProps) {
  const [editValue, setEditValue] = useState(initialValue);

  return (
    <div className="item-wrapper" style={{ width: '100%' }}>
      <input 
        className="edit-input"
        value={editValue} 
        onChange={(e) => setEditValue(e.target.value)} 
        autoFocus 
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSave(editValue);
          if (e.key === 'Escape') onCancel();
        }}
      />
    </div>
  );
}