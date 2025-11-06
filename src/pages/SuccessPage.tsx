import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CosmicBackground from '../components/CosmicBackground';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vaultType = searchParams.get('vault');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (vaultType === 'royal') {
        navigate('/royal-vault');
      } else if (vaultType === 'imperial') {
        navigate('/imperial-vault');
      } else {
        navigate('/');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, vaultType]);

  const handleAccessVault = () => {
    if (vaultType === 'royal') {
      navigate('/royal-vault');
    } else if (vaultType === 'imperial') {
      navigate('/imperial-vault');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      <CosmicBackground scrollY={0} />

      <div className="relative z-10 text-center max-w-2xl px-6">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 mx-auto text-green-400 animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-6xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-6">
          Payment Successful!
        </h1>

        <p className="text-xl text-gray-300 mb-4">
          Welcome to the {vaultType === 'royal' ? 'Royal' : vaultType === 'imperial' ? 'Imperial' : ''} Vault
        </p>

        <p className="text-gray-400 mb-8">
          Your payment has been processed successfully. You now have access to exclusive stock footage.
        </p>

        <button
          onClick={handleAccessVault}
          className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 text-white font-semibold text-lg rounded-full overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            Access Your Vault
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Redirecting automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
}
