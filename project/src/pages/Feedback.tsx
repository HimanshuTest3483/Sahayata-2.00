import React from 'react';
import FeedbackForm from '../components/feedback/FeedbackForm';
import { FeedbackForm as FeedbackFormType } from '../types';

const Feedback = () => {
  const handleSubmitFeedback = (feedback: FeedbackFormType) => {
    console.log('Feedback submitted:', feedback);
    // TODO: Implement feedback submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12"
         style={{
           backgroundImage: 'url("https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
          <p className="text-gray-600 mb-8">Help us improve your experience</p>
          <FeedbackForm onSubmit={handleSubmitFeedback} />
        </div>
      </div>
    </div>
  );
};

export default Feedback;