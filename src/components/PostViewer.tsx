import type { TextEntry } from '../types/post.types';

interface PostViewerProps {
  item: TextEntry;
}

export function PostViewer({ item }: PostViewerProps) {
  return (
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

      {/* 2. MIDDLE: Content Area */}
      <div className="content-area">
        <strong>{item.content}</strong>
      </div>
      
      {/* 3. BOTTOM: The footer row is now empty or omitted in list view */}
    </div>
  );
}