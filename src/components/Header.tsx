import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0a0a0f] to-transparent backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          Baldrhythms Ad Labs.
        </Link>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="px-6 py-2 text-gray-200 hover:text-white transition-colors font-medium">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
