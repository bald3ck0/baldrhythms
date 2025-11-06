import { useState } from 'react';
import { Play, Lock } from 'lucide-react';

export default function VaultPreview() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Collections' },
  ];

  const videos = [
    { id: 1, title: 'Ethereal Crowd Waves', category: 'crowd', curator: 'DJ Aurora', locked: false },
    { id: 2, title: 'Golden Hour Stage', category: 'festival', curator: 'VJ Nexus', locked: true },
    { id: 3, title: 'Cosmic Light Trails', category: 'cosmic', curator: 'DJ Aurora', locked: false },
    { id: 4, title: 'Festival Energy Pulse', category: 'festival', curator: 'Visual Maven', locked: true },
    { id: 5, title: 'Harmonious Motion', category: 'crowd', curator: 'DJ Aurora', locked: false },
    { id: 6, title: 'Celestial Rhythm', category: 'cosmic', curator: 'VJ Nexus', locked: true },
    { id: 7, title: 'Neon Dreams', category: 'cosmic', curator: 'Visual Maven', locked: false },
    { id: 8, title: 'Crowd Symphony', category: 'crowd', curator: 'DJ Aurora', locked: true },
    { id: 9, title: 'Stage Majesty', category: 'festival', curator: 'VJ Nexus', locked: false },
  ];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return null;
}

function VideoCard({ video, index }: { video: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative aspect-[1.618/1] rounded-2xl overflow-hidden border-2 border-violet-400/20 shadow-xl shadow-indigo-600/30 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-500 hover:scale-105"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        transform: isHovered ? 'rotateY(5deg) rotateX(5deg)' : 'rotateY(0) rotateX(0)',
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-violet-900/60 to-purple-900/60" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-400/40 transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}>
          {video.locked ? (
            <Lock className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
        <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
        {video.locked && (
          <p className="text-xs text-orange-300 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Members Only Preview
          </p>
        )}
      </div>
    </div>
  );
}
