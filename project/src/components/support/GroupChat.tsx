import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

interface Message {
  _id: string;
  message: string;
  createdAt: string;
  userId: string;
}

interface GroupChatProps {
  groupId: string;
  groupName: string;
  onBack: () => void;
}

const GroupChat: React.FC<GroupChatProps> = ({ groupId, groupName, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // decode light-weight: we only need user id from /auth/me
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(me => setCurrentUser(me?.id || null))
      .catch(() => setCurrentUser(null));

    loadMessages();

    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [groupId]);

  const loadMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/chats/${groupId}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load messages');
      const data = await res.json();
      setMessages(data || []);
      setLoading(false);
      scrollToBottom();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/chats/${groupId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: newMessage.trim() })
      });
      if (!res.ok) throw new Error('Failed to send message');
      setNewMessage('');
      await loadMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getUserDisplayName = (message: Message) => {
    if (!message.profiles) return 'Unknown User';
    return message.profiles.full_name || message.profiles.email || 'Unknown User';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px] flex flex-col">
      <div className="bg-white border-b px-4 py-3 flex items-center">
        <button onClick={onBack} className="mr-3">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold">{groupName}</h2>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.userId === currentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.userId === currentUser 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-white border'
              }`}
            >
              <p className="break-words">{message.message}</p>
              <p className={`text-xs mt-1 ${message.userId === currentUser ? 'text-rose-100' : 'text-gray-500'}`}>
                {formatTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupChat;