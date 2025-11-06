import { Instagram, Youtube, Music } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Music, label: 'TikTok', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="relative py-16 px-6 border-t border-violet-400/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border-2 border-violet-400/30 flex items-center justify-center hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-6 h-6 text-orange-300 group-hover:text-orange-400 transition-colors" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/0 to-orange-500/0 group-hover:from-purple-400/20 group-hover:to-orange-500/20 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-orange-300 transition-colors">
              Copyright © 2025
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="hover:text-orange-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="#" className="hover:text-orange-300 transition-colors">
              Request Vault Access
            </a>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 font-serif">
              Baldrhythms Ad Labs — Where Vision Meets Infinity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
