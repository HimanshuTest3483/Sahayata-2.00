import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, BookOpen, Calendar } from 'lucide-react';
import { FeatureCardProps } from '../types';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[600px]" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Empowering Caretakers for a Better Tomorrow
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Join our community of caretakers and access resources, support, and tools to help you provide the best care possible.
            </p>
            <div className="space-x-4">
              <Link 
                to="/auth" 
                className="bg-rose-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-rose-700 transition duration-300"
              >
                Get Started
              </Link>
              <Link 
                to="/resources" 
                className="bg-white text-gray-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How We Support You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Heart className="h-12 w-12 text-rose-600" />}
              title="Emotional Support"
              description="Connect with others who understand your journey and share experiences."
            />
            <FeatureCard 
              icon={<Users className="h-12 w-12 text-rose-600" />}
              title="Support Groups"
              description="Join virtual support groups led by experienced facilitators."
            />
            <FeatureCard 
              icon={<BookOpen className="h-12 w-12 text-rose-600" />}
              title="Resource Library"
              description="Access comprehensive guides, articles, and educational materials."
            />
            <FeatureCard 
              icon={<Calendar className="h-12 w-12 text-rose-600" />}
              title="Care Planning"
              description="Organize appointments, medications, and daily care activities."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-white text-xl mb-8">
            Sign up today and get access to all our features and support resources.
          </p>
          <Link 
            to="/auth" 
            className="bg-white text-rose-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition duration-300">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;