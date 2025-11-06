import { useState } from 'react';
import { Check, Star, Crown, Sparkles, Mail } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '../lib/checkout';

export default function Pricing() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const tiers = [
    {
      name: 'Royal Vault',
      subtitle: 'Lifetime Access',
      price: '$188',
      priceDetail: 'One-Time Payment',
      description: 'Bestowed upon you, a limited compendium of imperial visions',
      features: [
        'Premium 4K Clips',
        '9x16 Footage',
        'Beat-Synced Collections',
        'Unlimited Downloads',
        'New Content Monthly',
        'Commercial License',
        'Priority Support',
      ],
      icon: Crown,
      gradient: 'from-purple-600 to-orange-500',
      borderGlow: 'purple-400',
      popular: true,
      priceId: 'price_1SOYX5E0ZufYavwtxrwp7X0K',
      vaultTier: 'Royal' as const,
    },
    {
      name: 'Imperial Vault',
      subtitle: 'Lifetime Premium Access',
      price: '$388',
      priceDetail: 'One-Time Premium',
      description: 'Bestowed upon you, a limited compendium of imperial visions',
      features: [
        'Everything in Royal Vault',
        'Exclusive Festival Collections',
        '9x16 and 16x9 Footage',
        'Custom Request Credits',
        'VIP Curator Access',
        'Extended Commercial License',
        'White-Glove Support',
      ],
      icon: Sparkles,
      gradient: 'from-violet-600 to-fuchsia-600',
      borderGlow: 'violet-400',
      popular: false,
      priceId: 'price_1SOYZ4E0ZufYavwtSWQE30c6',
      vaultTier: 'Imperial' as const,
    },
  ];

  const testimonials = [
    { quote: 'Instantly elevated my visuals — worth every frame.', author: 'DJ Aether' },
    { quote: 'The vault transformed our festival experience completely.', author: 'Luna Events' },
    { quote: 'Unmatched quality. A game-changer for my performances.', author: 'VJ Cosmos' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <section id="pricing" className="relative pt-0 pb-8 px-6">
      {showNotification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl shadow-2xl shadow-purple-500/50 animate-[slideDown_0.3s_ease-out] border-2 border-orange-400/50">
          <p className="text-lg font-semibold text-center">
            Thank You for joining the Royal Register
          </p>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-6">
            Vault Access
          </h2>
          <p className="text-2xl text-orange-200 mb-4">
            No Subscriptions. Lifetime Access.
          </p>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Swear your vow once, and shape the realm forever. Enter the inner sanctum of creators who kneel before no standard but their own
          </p>
          <div className="mt-6 inline-block px-6 py-2 bg-red-500/20 border border-red-400/30 rounded-full">
            <p className="text-base text-red-300 font-medium">
              ⏳This Noble Offer Fades with the ⏳
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                tier.popular ? 'shadow-2xl shadow-amber-500/50' : ''
              }`}
              style={{
                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-center">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Most Popular
                  </p>
                </div>
              )}

              <div className={`h-full border-2 border-${tier.borderGlow}/30 hover:border-${tier.borderGlow} rounded-3xl backdrop-blur-sm p-8 ${
                tier.popular
                  ? 'pt-12 bg-gradient-to-br from-indigo-950/50 to-violet-950/50'
                  : 'bg-gradient-to-br from-indigo-950/70 to-purple-950/70'
              }`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-6 shadow-lg mx-auto`}>
                  <tier.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-serif text-white mb-1 text-center">{tier.name}</h3>
                <p className="text-sm text-orange-300 mb-4 text-center">{tier.subtitle}</p>

                <div className="mb-6 text-center">
                  <div className="flex items-baseline gap-2 mb-1 justify-center">
                    <span className="text-5xl font-bold bg-gradient-to-r from-orange-300 to-purple-300 bg-clip-text text-transparent">{tier.price}</span>
                  </div>
                  {tier.priceDetail && (
                    <p className="text-sm text-gray-400">{tier.priceDetail}</p>
                  )}
                </div>

                <p className="text-gray-300 mb-8 text-center">
                  {tier.name === 'Imperial Vault'
                    ? 'Open the gates of eternity and claim the vault\'s full majesty'
                    : tier.description}
                </p>

                <button
                  onClick={async () => {
                    if (!isSignedIn) {
                      navigate('/signup');
                      return;
                    }

                    try {
                      setLoading(true);
                      const token = await user?.getToken();
                      if (!token || !user?.id) throw new Error('No auth token or user ID');

                      const productType = tier.name === 'Royal Vault' ? 'royal' : 'imperial';
                      const checkoutUrl = await createCheckoutSession(
                        token,
                        tier.priceId,
                        productType,
                        user.id
                      );

                      window.location.href = checkoutUrl;
                    } catch (error) {
                      console.error('Checkout error:', error);
                      alert('Failed to create checkout session. Please try again.');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 mb-8 disabled:opacity-50 disabled:cursor-not-allowed ${
                    tier.popular
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/50'
                      : 'bg-indigo-900/40 text-orange-300 border-2 border-violet-400/30 hover:border-orange-400/50'
                  }`}
                >
                  {loading ? 'Processing...' : !isSignedIn ? 'Sign Up to Purchase' : 'Unlock Now'}
                </button>

                <div className="space-y-4">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/30 to-orange-500/30 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-orange-300" />
                      </div>
                      <span className="text-sm text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-900/50 to-violet-900/50 backdrop-blur-sm border-2 border-purple-400/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/30">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif bg-gradient-to-r from-orange-300 to-purple-300 bg-clip-text text-transparent mb-4">
              Join the Royal Registry
            </h3>
            <p className="text-gray-200">
              One act of devotion grants eternal dominion over creation. Join the illustrious house of those who bow to none.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-violet-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 whitespace-nowrap"
            >
              Join the Vault
            </button>
          </form>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative max-w-xs p-6 bg-gradient-to-br from-indigo-900/40 to-violet-900/40 backdrop-blur-sm border border-purple-400/20 rounded-2xl shadow-lg hover:border-purple-400/50 hover:shadow-purple-500/30 transition-all duration-300"
              style={{
                animation: `float 6s ease-in-out infinite ${index * 0.5}s`,
              }}
            >
              <p className="text-gray-200 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-orange-300 text-sm font-medium">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
