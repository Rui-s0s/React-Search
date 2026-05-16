import React from 'react';
import type { TextEntry, EditMode } from '../types/post.types';
import { PostEditor } from './PostEditor';
import { PostViewer } from './PostViewer';

interface PostItemProps {
  item: TextEntry;
  editingId: number | null;
  editMode: EditMode;
  onStartEdit: (id: number, mode: EditMode, initialValue: string) => void;
  onSaveEdit: (id: number, newValue: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

export function PostItem({ 
  item, editingId, editMode, onStartEdit, onSaveEdit, onCancelEdit, onDelete 
}: PostItemProps) {
  const isEditing = editingId === item.id;

  return (
    <li className="list-item">
      {isEditing ? (
        <PostEditor 
          initialValue={editMode === 'CONTENT' ? item.content : item.tags}
          onSave={(newValue) => onSaveEdit(item.id, newValue)}
          onCancel={onCancelEdit}
        />
      ) : (
        <PostViewer 
          item={item}
          onEditContent={() => onStartEdit(item.id, 'CONTENT', item.content)}
          onEditTags={() => onStartEdit(item.id, 'TAGS', item.tags)}
          onDelete={() => onDelete(item.id)}
        />
      )}
    </li>
  );
}