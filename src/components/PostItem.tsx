import type { TextEntry, EditMode } from '../types/post.types';
import { PostEditor } from './PostEditor';
import { PostViewer } from './PostViewer';

interface PostItemProps {
  item: TextEntry;
  editingId: number | null;
  editMode: EditMode;
  onSaveEdit: (id: number, newValue: string) => void;
  onCancelEdit: () => void;
}

export function PostItem({ 
  item, editingId, editMode, onSaveEdit, onCancelEdit 
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
        <PostViewer item={item} />
      )}
    </li>
  );
}