import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import CosmicBackground from '../components/CosmicBackground';
import { Sparkles } from 'lucide-react';

export default function ImperialVault() {
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('A');

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login');
      return;
    }

    if (isSignedIn && user) {
      checkVaultAccess();
    }
  }, [isSignedIn, isLoaded, user, navigate]);

  const checkVaultAccess = async () => {
    try {
      setLoading(true);
      const token = await user?.getToken();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-vault-access`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vaultType: 'Imperial',
            userId: user?.id
          }),
        }
      );

      const data = await response.json();
      setHasAccess(data.hasAccess || false);
    } catch (error) {
      console.error('Error checking vault access:', error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseAccess = () => {
    navigate('/#pricing');
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <CosmicBackground scrollY={0} />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading vault...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <CosmicBackground scrollY={0} />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-5xl md:text-6xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-6">
            Imperial Vault
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            You don't have access to the Imperial Vault yet.
          </p>
          <button
            onClick={handlePurchaseAccess}
            className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 text-white font-semibold text-lg rounded-full overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Purchase Access
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white">
      <CosmicBackground scrollY={0} />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-4">
              Imperial Vault
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Premium exclusive stock footage collection for professional creators
            </p>

            <div className="inline-block">
              <label htmlFor="category" className="text-gray-300 mr-3 text-lg">
                Categories:
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-3 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm border border-purple-400/30 rounded-full text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div
                key={item}
                className="aspect-video bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-purple-400/20 rounded-2xl overflow-hidden hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 group cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-orange-300 transition-colors">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Upload footage here</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
