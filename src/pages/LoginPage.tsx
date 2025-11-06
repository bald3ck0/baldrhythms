import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import CosmicBackground from '../components/CosmicBackground';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden flex items-center justify-center">
      <CosmicBackground scrollY={0} />

      <div className="relative z-10 w-full max-w-md px-6 py-20">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity inline-block mb-4">
            Baldrhythms Ad Labs.
          </Link>
          <p className="text-gray-300">Sign in to access your vaults</p>
        </div>

        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-md border border-purple-400/30 shadow-2xl"
              }
            }}
            redirectUrl="/"
          />
        </div>
      </div>
    </div>
  );
}
