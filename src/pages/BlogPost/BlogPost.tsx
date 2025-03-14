import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Comment } from '../../types/blog';
import './BlogPost.css';

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');

  // Get the blog posts from localStorage
  const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
  const post = posts.find((p: any) => p.slug === slug);

  if (!post) {
    return <div>Blog post not found</div>;
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText || !authorName) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentText,
      author: authorName,
      date: new Date(),
    };

    // Add comment to the post and update localStorage
    post.comments.push(newComment);
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // Reset form
    setCommentText('');
    setAuthorName('');
  };

  return (
    <div className="blog-post">
      <button onClick={() => navigate('/blogs')} className="back-button">
        ← Back to Blogs
      </button>
      <h2>{post.title}</h2>
      <div className="post-meta">
        Posted on {new Date(post.date).toLocaleDateString()}
      </div>
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleAddComment} className="comment-form">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
            required
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>

        <div className="comments-list">
          {post.comments.map((comment: Comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{comment.author}</strong>
                <span>{new Date(comment.date).toLocaleDateString()}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 