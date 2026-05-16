import React from 'react';
import type { TextEntry } from '../types/post.types';

interface PostViewerProps {
  item: TextEntry;
  onEditContent: () => void;
  onEditTags: () => void;
  onDelete: () => void;
}

export function PostViewer({ item, onEditContent, onEditTags, onDelete }: PostViewerProps) {
  return (
    <div className="post-container">
      <div className="tags-container">
        {item.tags.split(',')
          .filter(t => t.trim() !== "")
          .map((tag, index) => (
            <span key={index} className="tag">#{tag.trim()}</span>
          ))
        }
      </div>

      <div className="content-area">
        <strong>{item.content}</strong>
      </div>

      <div className="item-footer">
        <div className="actions">
          <button onClick={onEditTags}>Tags</button>
          <button onClick={onEditContent}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}