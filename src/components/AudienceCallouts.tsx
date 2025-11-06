import { Disc3, Megaphone, Music2, Check } from 'lucide-react';

export default function AudienceCallouts() {
  const audiences = [
    {
      icon: Disc3,
      title: 'For DJs',
      headline: 'Sculpt Visual Masterpieces',
      features: [
        'Ultra-HD Beat-Sync Technology',
        'Royalty-Free 4K Library',
        'Exclusive Vault Collections',
      ],
      gradient: 'from-indigo-900/60 to-violet-900/60',
    },
    {
      icon: Megaphone,
      title: 'For Promoters',
      headline: 'Orchestrate Hype with Timeless Flair',
      features: [
        'Campaign-Ready Premium Assets',
        'Instant Download Access',
        'No Attribution Required',
      ],
      gradient: 'from-violet-900/60 to-purple-900/60',
    },
    {
      icon: Music2,
      title: 'For Festivals',
      headline: 'Harmonize Crowds in Ethereal Rhythm',
      features: [
        'Multi-Screen Display Formats',
        'Unlimited Usage Rights',
        'Curated Festival Collections',
      ],
      gradient: 'from-purple-900/60 to-fuchsia-900/60',
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-6">
            Designed for Visionaries
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Whether you command the decks, orchestrate events, or curate festivals — the vault awaits.
          </p>
        </div>

        <div className="space-y-8">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className="group relative rounded-3xl overflow-hidden border-2 border-violet-400/20 hover:border-orange-400/50 transition-all duration-500 hover:scale-[1.02]"
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${audience.gradient} backdrop-blur-sm`} />

              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center shadow-2xl shadow-orange-500/50 group-hover:scale-110 transition-transform duration-300">
                    <audience.icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <p className="text-sm font-medium text-orange-300 mb-2">{audience.title}</p>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">
                    {audience.headline}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {audience.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-gray-200"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/30 to-orange-500/30 flex items-center justify-center">
                          <Check className="w-3 h-3 text-orange-300" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-400/10 to-orange-400/10 border border-violet-400/30 flex items-center justify-center">
                    <span className="text-5xl">✨</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
