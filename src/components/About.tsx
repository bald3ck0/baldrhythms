import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'DJ Symphonies',
      subtitle: 'Refine Your Sets with Opulent Visuals',
      description: 'Elevate every performance with beat-synced 4K footage designed for the stage.',
    },
    {
      title: 'Festival Elegance',
      subtitle: 'Captivate Massive Crowds',
      description: 'Transform festivals into immersive visual experiences that resonate for a lifetime.',
    },
    {
      title: 'Promotional Power',
      subtitle: 'Orchestrate Hype with Timeless Flair',
      description: 'Create campaigns that stand out with exclusive, royalty-free cinematic content.',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif bg-gradient-to-r from-purple-300 via-orange-300 to-purple-300 bg-clip-text text-transparent mb-6">
            One Vault. Infinite Possibilities.
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Baldrhythms Ad Labs offers royalty-free, beat-synced 4K footage curated for elite performances — one vault, lifetime access, no recurring fees.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[1.618/1] rounded-3xl overflow-hidden border-2 border-violet-400/30 shadow-2xl shadow-purple-600/40">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 to-violet-900/60 backdrop-blur-sm" />

            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <div
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                }}
              >
                <h3 className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-orange-300 to-purple-300 bg-clip-text text-transparent mb-4">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-2xl text-orange-200 mb-6">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="text-lg text-gray-200 max-w-2xl">
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-purple-500/20 backdrop-blur-sm border border-violet-400/30 flex items-center justify-center hover:bg-purple-500/40 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-orange-300" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-purple-500/20 backdrop-blur-sm border border-violet-400/30 flex items-center justify-center hover:bg-purple-500/40 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-orange-300" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-purple-500 to-orange-400 w-8'
                    : 'bg-violet-400/30 hover:bg-violet-400/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
