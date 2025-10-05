import React, { useState, useCallback } from 'react';
import { MessageSquare, ThumbsUp, Flag, Send } from 'lucide-react';
import { ForumPost } from '../types';
import { forumService } from '../services/forum';

const CommunityForum = () => {
  const [posts, setPosts] = useState<ForumPost[]>(() => forumService.getPosts());
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });
  const [replyContent, setReplyContent] = useState('');
  const [activePost, setActivePost] = useState<string | null>(null);

  const handleAddPost = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const post = forumService.addPost({
        title: newPost.title,
        content: newPost.content,
        author: 'Current User',
        date: new Date().toISOString().split('T')[0]
      });
      setPosts(prevPosts => [post, ...prevPosts]);
      setNewPost({ title: '', content: '' });
    }
  }, [newPost]);

  const handleAddReply = useCallback((postId: string) => {
    if (replyContent) {
      const reply = forumService.addReply(postId, {
        author: 'Current User',
        content: replyContent,
        date: new Date().toISOString().split('T')[0]
      });
      
      if (reply) {
        setPosts(prevPosts => prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              replies: [...post.replies, reply]
            };
          }
          return post;
        }));
      }
      setReplyContent('');
      setActivePost(null);
    }
  }, [replyContent]);

  const handleLikePost = useCallback((postId: string) => {
    if (forumService.likePost(postId)) {
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      }));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <MessageSquare className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        </div>

        <form onSubmit={handleAddPost} className="mb-8 bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <textarea
              placeholder="Share your thoughts..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Post
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium">{post.title}</h3>
                <button className="text-gray-400 hover:text-red-500">
                  <Flag className="h-4 w-4" />
                </button>
              </div>
              <p className="text-gray-600 mb-2">{post.content}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4">Posted by {post.author}</span>
                <span>{post.date}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center text-gray-500 hover:text-primary-600"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.likes}
                </button>
                <button
                  onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                  className="flex items-center text-gray-500 hover:text-primary-600"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post.replies.length} Replies
                </button>
              </div>

              {activePost === post.id && (
                <div className="ml-8 space-y-4">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                      <p className="text-gray-600">{reply.content}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="mr-4">{reply.author}</span>
                        <span>{reply.date}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={() => handleAddReply(post.id)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;