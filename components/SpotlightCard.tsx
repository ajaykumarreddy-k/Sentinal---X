import { useRef, MouseEvent, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SpotlightCardProps extends Omit<HTMLMotionProps<'div'>, 'onMouseMove' | 'onMouseEnter' | 'onMouseLeave'> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = 'rgba(0, 240, 255, 0.15)', // Updated to Electric Cyan (#00F0FF)
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isHovered = useRef(false);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Continuous animation loop
  const animate = () => {
    if (!overlayRef.current || !isHovered.current) return;

    // Create a subtle breathing effect using a sine wave based on time
    // Base radius 600px, fluctuating +/- 50px, speed factor 0.003
    const time = performance.now();
    const radius = 600 + Math.sin(time * 0.003) * 50;

    const { x, y } = mouseRef.current;

    // Apply the gradient
    overlayRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;

    // Keep loop running
    rafId.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    // Calculate relative coordinates only on move to save resources
    const rect = divRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '1';
    }
    // Start the animation loop if not already running
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0';
    }
    // Stop the loop
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-3xl transition-colors duration-500 hover:border-neon-cyan/30 hover:shadow-2xl hover:shadow-cyan-900/20',
        className
      )}
      {...props}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
        style={{
          // Initial state before JS takes over
          background: `radial-gradient(600px circle at 50% 50%, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full z-10 flex flex-col">{children}</div>
    </motion.div>
  );
};