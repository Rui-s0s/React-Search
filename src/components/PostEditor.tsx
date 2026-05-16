import React, { useState } from 'react';

interface PostEditorProps {
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

export function PostEditor({ initialValue, onSave, onCancel }: PostEditorProps) {
  const [editValue, setEditValue] = useState(initialValue);

  // A helper function that handles the height calculation math
  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  /* 
    This is the Callback Ref. 
    React calls this function automatically when the element mounts.
    'el' is the raw textarea DOM element.
  */
  const textareaCallbackRef = (el: HTMLTextAreaElement | null) => {
    if (el) {
      resizeTextarea(el); // Resizes immediately on mount before the user sees it
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
    resizeTextarea(e.target); // Resizes on every single keystroke
  };

  return (
    <div className="item-wrapper-edit">
      <textarea 
        ref={textareaCallbackRef} /* Attaching the callback ref function here */
        className="edit-textarea"
        value={editValue} 
        onChange={handleChange} 
        autoFocus 
        placeholder="Edit your text... (Press Shift+Enter to save)"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.shiftKey || e.ctrlKey)) {
            e.preventDefault();
            onSave(editValue);
          } else if (e.key === 'Escape') {
            onCancel();
          }
        }}
      />
      
      <div className="edit-help-text">
        Press <span>Shift + Enter</span> to save • <span>Esc</span> to cancel
      </div>
    </div>
  );
}