import React from 'react';
import { Heart, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Sahayata</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering caretakers with the support, resources, and community they need to provide the best possible care for their loved ones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-rose-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To simplify the caretaking journey and provide comprehensive support for cancer caretakers worldwide.
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-rose-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Community</h3>
          <p className="text-gray-600">
            A supportive network of caretakers sharing experiences, knowledge, and emotional support.
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Globe className="h-12 w-12 text-rose-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
          <p className="text-gray-600">
            Reaching caretakers across the globe with resources and support in their time of need.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Sahayata was founded by a group of healthcare professionals and former caretakers who recognized the need for better support systems for cancer caretakers. Our platform combines practical tools with emotional support to address the complex challenges of caretaking.
        </p>
        <p className="text-gray-600">
          Today, we continue to grow and evolve based on the needs of our community, always staying true to our core mission of supporting caretakers in their journey.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-rose-600">Twitter</a>
          <a href="#" className="text-gray-600 hover:text-rose-600">Facebook</a>
          <a href="#" className="text-gray-600 hover:text-rose-600">Instagram</a>
          <a href="#" className="text-gray-600 hover:text-rose-600">LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default About;