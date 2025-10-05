import { ForumPost, ForumReply } from '../types';

class ForumService {
  private posts: ForumPost[] = [
    {
      id: '1',
      author: 'Sarah M.',
      title: 'Tips for managing medication schedules',
      content: 'I have been struggling with keeping track of multiple medications. What systems have worked for you?',
      date: '2024-03-15',
      likes: 5,
      replies: [
        {
          id: '1-1',
          author: 'John D.',
          content: 'I use a pill organizer with multiple daily compartments. It has been a lifesaver!',
          date: '2024-03-15',
          likes: 3
        }
      ]
    }
  ];

  getPosts(): ForumPost[] {
    return this.posts;
  }

  addPost(post: Omit<ForumPost, 'id' | 'likes' | 'replies'>): ForumPost {
    const newPost: ForumPost = {
      ...post,
      id: Date.now().toString(),
      likes: 0,
      replies: []
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  addReply(postId: string, reply: Omit<ForumReply, 'id' | 'likes'>): ForumReply | null {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const newReply: ForumReply = {
      ...reply,
      id: Date.now().toString(),
      likes: 0
    };
    post.replies.push(newReply);
    return newReply;
  }

  likePost(postId: string): boolean {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return false;
    post.likes += 1;
    return true;
  }

  likeReply(postId: string, replyId: string): boolean {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return false;
    
    const reply = post.replies.find(r => r.id === replyId);
    if (!reply) return false;
    
    reply.likes += 1;
    return true;
  }
}

export const forumService = new ForumService();