import React, { useState } from 'react';
import { BookOpen, Play, Award, CheckCircle, Pause } from 'lucide-react';

interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  completed?: boolean;
}

const Training = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos: TrainingVideo[] = [
    {
      id: '1',
      title: 'Understanding Patient Care Basics',
      description: 'Learn fundamental patient care techniques and best practices for daily caregiving.',
      duration: '15:30',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      title: 'Medication Management',
      description: 'Master the essentials of medication scheduling, dosage tracking, and safety protocols.',
      duration: '12:45',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80',
      completed: true
    },
    {
      id: '3',
      title: 'Emergency Response Training',
      description: 'Critical information on handling medical emergencies and crisis situations.',
      duration: '20:15',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80',
    }
  ];

  const handleVideoClick = (videoId: string) => {
    setActiveVideo(videoId);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <BookOpen className="h-8 w-8 text-rose-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Training Center</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-rose-50 rounded-lg p-4">
            <h3 className="font-semibold text-rose-900 mb-2">Available Videos</h3>
            <p className="text-4xl font-bold text-rose-600">{videos.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Completed</h3>
            <p className="text-4xl font-bold text-green-600">
              {videos.filter(video => video.completed).length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">In Progress</h3>
            <p className="text-4xl font-bold text-yellow-600">
              {videos.filter(video => !video.completed).length}
            </p>
          </div>
        </div>

        {activeVideo && (
          <div className="mb-8">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`${videos.find(v => v.id === activeVideo)?.videoUrl}${isPlaying ? '?autoplay=1' : ''}`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Training Video"
              />
              <button
                onClick={togglePlayPause}
                className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-rose-600" />
                ) : (
                  <Play className="h-6 w-6 text-rose-600" />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <div key={video.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="relative aspect-video bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  {video.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training;