import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import './BlogList.css';

interface BlogListProps {
  posts: BlogPost[];
  onDelete: (postId: string, title: string) => void;
}

export const BlogList = ({ posts, onDelete }: BlogListProps) => {
  return (
    <div className="blog-list">
      <h3>Published Blogs</h3>
      {posts.map((post) => (
        <div key={post.id} className="blog-item-container">
          <Link 
            to={`/blogs/${post.slug}`}
            className="blog-item"
          >
            <h4>{post.title}</h4>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </Link>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onDelete(post.id, post.title);
            }}
            className="delete-button"
            title="Delete blog"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}; 