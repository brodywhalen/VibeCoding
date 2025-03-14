import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { BlogPost } from '../../types/blog';

interface BlogEditorProps {
  onSubmit: (post: BlogPost) => void;
}

export const BlogEditor = ({ onSubmit }: BlogEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date(),
      comments: [],
      slug,
    };

    onSubmit(newPost);
    
    // Clear form
    setTitle('');
    setContent('');
  };

  return (
    <div className="blog-editor">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="blog-title-input"
        />
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={content}
          onEditorChange={(newContent) => setContent(newContent)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px; }',
          }}
        />
        <button type="submit" className="submit-blog">Publish Blog</button>
      </form>
    </div>
  );
}; 