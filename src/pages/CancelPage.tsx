import { useNavigate } from 'react-router-dom';
import CosmicBackground from '../components/CosmicBackground';
import { XCircle, Home } from 'lucide-react';

export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      <CosmicBackground scrollY={0} />

      <div className="relative z-10 text-center max-w-2xl px-6">
        <div className="mb-8">
          <XCircle className="w-24 h-24 mx-auto text-orange-400" />
        </div>

        <h1 className="text-5xl md:text-6xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-6">
          Payment Cancelled
        </h1>

        <p className="text-xl text-gray-300 mb-4">
          Your payment was not completed
        </p>

        <p className="text-gray-400 mb-8">
          No charges were made to your account. You can try again anytime you're ready to unlock exclusive content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/#pricing')}
            className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 text-white font-semibold text-lg rounded-full overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Try Again</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-12 py-5 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm border border-purple-400/30 text-white font-semibold text-lg rounded-full hover:border-orange-400/50 transition-all duration-300 flex items-center gap-3 justify-center"
          >
            <Home className="w-6 h-6" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
