import { Play } from 'lucide-react';

interface FloatingVideoCardProps {
  title: string;
  position: string;
  delay?: number;
  backgroundImage?: string;
}

export default function FloatingVideoCard({ title, position, delay = 0, backgroundImage }: FloatingVideoCardProps) {
  return (
    <div
      className={`absolute ${position} hidden lg:block`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="group relative w-48 aspect-video rounded-xl overflow-hidden border-2 border-violet-400/30 shadow-2xl shadow-indigo-600/30 backdrop-blur-sm bg-gradient-to-br from-indigo-900/50 to-purple-900/50 hover:border-violet-400 transition-all duration-300 hover:scale-110 hover:shadow-violet-500/50">
        {backgroundImage && (
          <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-400/40">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-xs font-medium text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}
