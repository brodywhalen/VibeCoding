import { useState } from 'react';
import { BlogEditor } from '../../components/BlogEditor/BlogEditor';
import { BlogList } from '../../components/BlogList/BlogList';
import { BlogPost } from '../../types/blog';
import './Blogs.css';

export const Blogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    // Initialize posts from localStorage
    return JSON.parse(localStorage.getItem('blogPosts') || '[]');
  });

  const handleNewPost = (post: BlogPost) => {
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const handleDelete = (postId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };

  return (
    <div className="blogs-container">
      <h2>Create New Blog</h2>
      <BlogEditor onSubmit={handleNewPost} />
      <BlogList posts={posts} onDelete={handleDelete} />
    </div>
  );
}; 