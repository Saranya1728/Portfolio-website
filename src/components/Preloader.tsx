import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .to(logoRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      }, "+=0.6")
      .to(preloaderRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          onComplete();
        }
      }, "+=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        <div ref={logoRef}>
          <h1 className="text-3xl md:text-4xl font-light text-foreground text-glow">
            Saranya
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default Preloader;