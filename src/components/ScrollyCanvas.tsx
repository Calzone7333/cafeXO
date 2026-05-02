"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

import Navbar from "./Navbar";

import Preloader from "./Preloader";

interface ScrollyCanvasProps {
  frameCount: number;
}

export default function ScrollyCanvas({ frameCount }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    const step = 3; // Optimization: Load every 3rd frame (approx 85 frames) for better mobile memory performance
    const totalToLoad = Math.ceil(frameCount / step);

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i += step) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `/sequence/frame_${i}.png`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / totalToLoad) * 100));
          if (loadedCount === totalToLoad) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalToLoad) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };
        loadedImages[i] = img;
      }
    };

    preloadImages();
  }, [frameCount]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70, // Slightly lighter stiffness
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  const renderFrame = (index: number) => {
    requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || images.length === 0) return;

      // Optimization: find the nearest loaded frame (every 3rd frame)
      const nearestIndex = Math.floor(Math.floor(index) / 3) * 3;
      const img = images[nearestIndex];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    });
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(frameIndex.get());
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images]);

  // Text transforms
  const opacityA = useTransform(smoothProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const yA = useTransform(smoothProgress, [0, 0.2], [0, -50]);

  const opacityB = useTransform(smoothProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const xB = useTransform(smoothProgress, [0.25, 0.35, 0.45], [-50, 0, 50]);

  const opacityC = useTransform(smoothProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const xC = useTransform(smoothProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

  const opacityD = useTransform(smoothProgress, [0.75, 0.85, 0.95], [0, 1, 1]);
  const yD = useTransform(smoothProgress, [0.75, 0.85], [50, 0]);

  const indicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
      <Navbar />

      <Preloader progress={loadingProgress} isLoaded={isLoaded} />


      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain pointer-events-none" />

        <div className="relative z-10 h-full w-full pointer-events-none">
          {/* Beat A: Intro */}
          <motion.div style={{ opacity: opacityA, y: yA }} className="absolute inset-0 px-8 md:px-24 py-32 md:py-48 flex flex-col justify-between pointer-events-none">
            {/* Top Left */}
            <div className="flex flex-col items-start text-left">
              <h1 className="text-5xl md:text-[7vw] font-black tracking-tight text-white uppercase leading-[0.8] drop-shadow-2xl font-playfair">
                THE<br />MASTERWORK
              </h1>
              <p className="mt-8 text-[10px] md:text-xs text-white/60 font-bold tracking-[0.5em] uppercase font-manrope">
                Artisanal Craft. Pure Flavor.
              </p>
            </div>

            {/* Right Bottom */}
            <div className="flex flex-col items-end text-right">
              <div className="h-[1px] w-12 bg-white/40 mb-6" />
              <p className="text-[10px] md:text-sm text-white/40 font-medium tracking-[0.4em] uppercase font-manrope leading-loose">
                Established 2024<br />
                <span className="text-white/80">Precision Layers</span>
              </p>
            </div>
          </motion.div>

          {/* Beat B: Left Content */}
          <motion.div style={{ opacity: opacityB, x: xB }} className="absolute inset-y-0 left-6 md:left-20 flex flex-col justify-center max-w-xs md:max-w-lg">
            <h2 className="text-4xl md:text-[4vw] font-bold tracking-tight text-white leading-[0.9] font-playfair">
              FLAVOR<br />SYMPHONY
            </h2>
            <div className="mt-6 h-[1px] w-12 bg-white/40" />
            <p className="mt-8 text-white/50 font-light leading-relaxed text-xs md:text-base font-manrope">
              A meticulously balanced composition of premium wagyu beef, aged cheddar, and our signature smoked aioli. Every bite is a calculated explosion of taste.
            </p>
            <div className="mt-8 flex gap-4 font-manrope">
              <div className="h-10 w-[1px] bg-white/20" />
              <p className="text-[10px] text-white/60 uppercase tracking-widest leading-tight font-bold">
                Aged 45 Days<br />Wagyu Prime
              </p>
            </div>
          </motion.div>

          {/* Beat C: Right Content */}
          <motion.div style={{ opacity: opacityC, x: xC }} className="absolute inset-y-0 right-6 md:right-20 flex flex-col justify-center items-end text-right max-w-xs md:max-w-lg">
            <h2 className="text-4xl md:text-[4vw] font-bold tracking-tight text-white leading-[0.9] font-playfair">
              ORGANIC<br />HERITAGE
            </h2>
            <div className="mt-6 h-[1px] w-12 bg-white/40" />
            <p className="mt-8 text-white/50 font-light leading-relaxed text-xs md:text-base font-manrope">
              Hand-picked vegetables from local artisanal farms and brioche buns baked fresh at dawn. We don't just source ingredients; we honor them.
            </p>
            <div className="mt-8 flex gap-4 justify-end font-manrope">
              <p className="text-[10px] text-white/60 uppercase tracking-widest leading-tight font-bold">
                Farm to Table<br />Baked Fresh
              </p>
              <div className="h-10 w-[1px] bg-white/20" />
            </div>
          </motion.div>

          {/* Beat D: Outro */}
          <motion.div style={{ opacity: opacityD, y: yD }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto">
            <h2 className="text-5xl md:text-[6vw] font-black tracking-tight text-white uppercase leading-[0.8] font-playfair">
              TASTE<br />BEYOND
            </h2>
            <p className="mt-8 mb-12 text-white/60 font-bold tracking-[0.4em] text-[9px] md:text-xs uppercase font-manrope">
              Join the elite circle of flavor.
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-fit px-12 py-5 bg-white text-black font-black rounded-full tracking-[0.2em] uppercase text-xs font-manrope transition-colors">
              Reserve Your Table
            </motion.button>
          </motion.div>

          <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <p className="mb-4 text-[9px] font-medium tracking-[0.4em] text-white/40 uppercase">Scroll to Discover</p>
            <div className="h-16 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
