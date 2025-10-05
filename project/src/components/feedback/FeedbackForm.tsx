import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { FeedbackForm as FeedbackFormType } from '../../types';

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackFormType) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState<FeedbackFormType>({
    rating: 0,
    comment: '',
    category: 'general',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(feedback);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFeedback({ ...feedback, rating: star })}
              className={`p-1 ${feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <Star className="h-8 w-8 fill-current" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={feedback.category}
          onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
        >
          <option value="general">General Feedback</option>
          <option value="bug">Report a Bug</option>
          <option value="feature">Feature Request</option>
          <option value="content">Content Feedback</option>
        </select>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Your Feedback
        </label>
        <textarea
          id="comment"
          rows={4}
          value={feedback.comment}
          onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          placeholder="Tell us what you think..."
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          value={feedback.email}
          onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          placeholder="your@email.com"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;