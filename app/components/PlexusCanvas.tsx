"use client";

import React, { useRef, useEffect } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  particleColor: string;

  constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D,
    particleColor: string,
  ) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = Math.random() * 0.5 - 0.25;
    this.vy = Math.random() * 0.5 - 0.25;
    this.size = Math.random() * 2 + 1;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.particleColor = particleColor;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > this.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.height) this.vy *= -1;
  }

  draw() {
    this.ctx.fillStyle = this.particleColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

const PlexusCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = document.body.scrollHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.body.scrollHeight;
    });

    const particles: Particle[] = [];
    const numParticles = Math.floor((width * height) / 25000); // Adjust density based on screen size
    const particleColor = "rgba(123, 104, 238, 0.5)";
    const lineColor = "rgba(123, 104, 238, 0.1)";

    function init() {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(width, height, ctx, particleColor));
      }
    }

    function connect(ctx: CanvasRenderingContext2D, lineColor: string) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const connectDistance = 100;

          if (distance < connectDistance) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connect(ctx, lineColor);

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", () => {});
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="plexus-canvas" />;
};

export default PlexusCanvas;
