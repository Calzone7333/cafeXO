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
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = new Array(frameCount);
      
      // Function to load a single image
      const loadImage = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `/sequence/frame_${index + 1}.png`;
          img.onload = () => {
            loadedImages[index] = img;
            resolve(img);
          };
          img.onerror = reject;
        });
      };

      try {
        // Phase 1: Load essential frames (Keyframes - every 5th frame)
        // This allows user to scroll immediately with a slightly jumpy but working animation
        const keyframeIndices = [];
        for (let i = 0; i < frameCount; i += 5) {
          keyframeIndices.push(i);
        }
        if (!keyframeIndices.includes(frameCount - 1)) keyframeIndices.push(frameCount - 1);

        let keyframesLoaded = 0;
        await Promise.all(keyframeIndices.map(async (idx) => {
          await loadImage(idx);
          keyframesLoaded++;
          setLoadingProgress((keyframesLoaded / frameCount) * 100); 
        }));

        // Phase 2: Load the rest in chunks to not choke the browser
        const remainingIndices = [];
        for (let i = 0; i < frameCount; i++) {
          if (!keyframeIndices.includes(i)) remainingIndices.push(i);
        }

        // Load in chunks of 10 to maintain performance
        const chunkSize = 10;
        for (let i = 0; i < remainingIndices.length; i += chunkSize) {
          const chunk = remainingIndices.slice(i, i + chunkSize);
          await Promise.all(chunk.map(idx => loadImage(idx)));
          
          const totalLoaded = keyframeIndices.length + i + chunk.length;
          setLoadingProgress((totalLoaded / frameCount) * 100);
          
          // Update images state every chunk to fill the gaps
          if (i % 30 === 0 || i + chunkSize >= remainingIndices.length) {
            setImages([...loadedImages]);
          }
        }

        // ONLY NOW set isLoaded to true (after all images are done)
        setIsLoaded(true);
        setTimeout(() => renderFrame(0), 100);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Fallback: set loaded anyway if we have some images
        setIsLoaded(true);
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
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: disable alpha if not needed
    if (!ctx) return;

    const frameIdx = Math.floor(index);
    
    // Nearest neighbor search for loaded frames if current frame isn't loaded yet
    let img = images[frameIdx];
    if (!img) {
      // Find the closest loaded image
      for (let offset = 1; offset < frameCount; offset++) {
        if (frameIdx + offset < frameCount && images[frameIdx + offset]) {
          img = images[frameIdx + offset];
          break;
        }
        if (frameIdx - offset >= 0 && images[frameIdx - offset]) {
          img = images[frameIdx - offset];
          break;
        }
      }
    }
    
    if (!img) return;

    const isMobile = window.innerWidth < 768;
    const scaleBase = Math.min(canvas.width / img.width, canvas.height / img.height);
    const scale = isMobile ? scaleBase * 0.9 : scaleBase * 1.1;

    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.fillStyle = "#050505"; // Match background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  useEffect(() => {
    if (isLoaded && images.length > 0) {
      renderFrame(0);
    }
  }, [isLoaded, images]);

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
