"use client";

import React, { useRef, useEffect } from "react";

const TracerCanvas = () => {
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

    const tracers: Tracer[] = [];
    const numTracers = 4;
    const tracerColor = "#7B68EE";

    class Tracer {
      state: "drawing" | "activating";
      path: {
        start: { x: number; y: number };
        end: { x: number; y: number };
        lastDirection: "horizontal" | "vertical";
      }[];
      currentPos: { x: number; y: number };
      speed: number;
      activationTimer: number;

      constructor() {
        this.state = "drawing";
        this.path = [];
        this.currentPos = {
          x: Math.random() * width,
          y: Math.random() * height,
        };
        this.speed = 6;
        this.activationTimer = 0;
        this.setNewTarget();
      }

      setNewTarget() {
        const lastSegment =
          this.path.length > 0
            ? this.path[this.path.length - 1]
            : {
                end: this.currentPos,
                lastDirection: Math.random() > 0.5 ? "horizontal" : "vertical",
              };

        const newDirection =
          lastSegment.lastDirection === "horizontal"
            ? "vertical"
            : "horizontal";
        const length = 75;
        const sign = Math.random() > 0.5 ? 1 : -1;

        const startPoint = { ...lastSegment.end };
        let endPoint;

        if (newDirection === "horizontal") {
          endPoint = { x: startPoint.x + length * sign, y: startPoint.y };
        } else {
          // Vertical
          endPoint = { x: startPoint.x, y: startPoint.y + length * sign };
        }

        this.path.push({
          start: startPoint,
          end: endPoint,
          lastDirection: newDirection,
        });
        if (this.path.length > 4) {
          this.path.shift();
        }
        this.currentPos = { ...startPoint };
      }

      update() {
        if (this.state === "drawing") {
          const currentSegment = this.path[this.path.length - 1];
          const dx = currentSegment.end.x - this.currentPos.x;
          const dy = currentSegment.end.y - this.currentPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.speed) {
            this.currentPos = { ...currentSegment.end };
            this.state = "activating";
            this.activationTimer = 10; // frames
          } else {
            this.currentPos.x += (dx / distance) * this.speed;
            this.currentPos.y += (dy / distance) * this.speed;
          }
        } else if (this.state === "activating") {
          this.activationTimer--;
          if (this.activationTimer <= 0) {
            this.state = "drawing";
            this.setNewTarget();
          }
        }
      }

      draw() {
        if (this.path.length === 0) return;

        // --- Glow Effect ---
        ctx.shadowColor = tracerColor;
        ctx.shadowBlur = 10;
        // ---

        // Draw all segments in the path
        for (let i = 0; i < this.path.length; i++) {
          const segment = this.path[i];
          ctx.beginPath();

          let drawStart = { ...segment.start };
          let drawEnd = { ...segment.end };

          // For the very last segment (the head), draw it growing
          if (i === this.path.length - 1) {
            drawEnd = { ...this.currentPos };
          }
          // For the very first segment (the tail), draw it shrinking
          if (i === 0 && this.path.length > 1) {
            const currentSegment = this.path[this.path.length - 1];
            const totalDistanceCurrent = Math.sqrt(
              Math.pow(currentSegment.end.x - currentSegment.start.x, 2) +
                Math.pow(currentSegment.end.y - currentSegment.start.y, 2),
            );
            const currentProgress = Math.sqrt(
              Math.pow(this.currentPos.x - currentSegment.start.x, 2) +
                Math.pow(this.currentPos.y - currentSegment.start.y, 2),
            );
            const progressRatio = currentProgress / totalDistanceCurrent;

            drawStart = {
              x:
                segment.start.x +
                (segment.end.x - segment.start.x) * progressRatio,
              y:
                segment.start.y +
                (segment.end.y - segment.start.y) * progressRatio,
            };
          }

          ctx.moveTo(drawStart.x, drawStart.y);
          ctx.lineTo(drawEnd.x, drawEnd.y);
          ctx.strokeStyle = tracerColor;
          ctx.lineWidth = i === this.path.length - 1 ? 2 : 1.5; // Thicker head
          ctx.stroke();
        }

        // --- Reset Glow ---
        ctx.shadowBlur = 0;
        // ---

        // Draw activation animation
        if (this.state === "activating") {
          const pulse = Math.abs(Math.sin(this.activationTimer * 0.1) * 5);
          ctx.beginPath();
          ctx.arc(this.currentPos.x, this.currentPos.y, pulse, 0, Math.PI * 2);
          ctx.fillStyle = tracerColor;
          ctx.shadowColor = tracerColor;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < numTracers; i++) {
      tracers.push(new Tracer());
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      tracers.forEach((tracer) => {
        tracer.update();
        tracer.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", () => {});
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="tracer-canvas" />;
};

export default TracerCanvas;
