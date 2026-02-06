import React, { useEffect, useRef } from 'react';

const PixelBlast: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    // New Palette: Electric Cyan, Razor Red, Slate 800, and a touch of white for contrast
    const colors = ['#00F0FF', '#161b22', '#0d1117', '#FF003C', '#ffffff']; 

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5; // Slightly finer particles
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        // Draw a square for the pixel look
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      update() {
        // Basic floating movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check - wrap around
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;

        // Mouse Interaction (Blast Effect)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Simpler, punchier blast physics
        const maxDistance = 120;
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            this.x -= directionX * force * 8; // Stronger blast
            this.y -= directionY * force * 8;
        }
      }
    }

    const init = () => {
      particles = [];
      const densityDivisor = 10000; // Lower number = more particles
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / densityDivisor); 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(0, 0));
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          init();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX/clientY for standard DOM compatibility
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Initialize
    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen"
    />
  );
};

export default PixelBlast;