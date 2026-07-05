"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const videoSrc = `${basePath}/video/intro.mp4`;

export default function FloatingVideoPlayer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [showControls, setShowControls] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update drag constraints based on size and window bounds
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const handleResize = () => {
      const widthMap = { sm: 180, md: 320, lg: 480 };
      const heightMap = { sm: 137, md: 216, lg: 306 };
      
      const width = widthMap[size];
      const height = heightMap[size];
      const margin = 24;

      // The video player is fixed at bottom-[120px] right-6.
      // We calculate constraints relative to this starting position.
      setDragConstraints({
        left: -window.innerWidth + width + margin * 2,
        right: margin,
        top: -window.innerHeight + height + 140,
        bottom: 100,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size, isMounted]);

  // Handle Play/Pause toggling
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay/Play was blocked:", err);
      });
    }
  };

  // Handle Mute/Unmute toggling
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Format time in seconds to mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle manual scrub/seek on the progress bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  // Cycle sizes: sm -> md -> lg -> sm
  const cycleSize = () => {
    setSize((prev) => (prev === "sm" ? "md" : prev === "md" ? "lg" : "sm"));
  };

  if (!isMounted) return null;

  const widthClasses = {
    sm: "w-[180px]",
    md: "w-[320px]",
    lg: "w-[480px]",
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={containerRef}
            drag
            dragMomentum={false}
            dragConstraints={dragConstraints}
            dragElastic={0.05}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-[120px] right-6 z-40 bg-zinc-950/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden select-none touch-none ${widthClasses[size]}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Title Bar / Drag Handle */}
            <div className="h-9 bg-zinc-900/60 border-b border-white/5 px-3 flex items-center justify-between cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-2">
                {/* Custom Grip SVG */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-zinc-500"
                >
                  <circle cx="2" cy="2" r="1" fill="currentColor" />
                  <circle cx="6" cy="2" r="1" fill="currentColor" />
                  <circle cx="10" cy="2" r="1" fill="currentColor" />
                  <circle cx="2" cy="6" r="1" fill="currentColor" />
                  <circle cx="6" cy="6" r="1" fill="currentColor" />
                  <circle cx="10" cy="6" r="1" fill="currentColor" />
                  <circle cx="2" cy="10" r="1" fill="currentColor" />
                  <circle cx="6" cy="10" r="1" fill="currentColor" />
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </svg>
                <span className="text-[11px] font-sans font-medium text-zinc-300 tracking-wide uppercase">
                  Intro Video
                </span>
              </div>
              
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                {/* Size toggle button */}
                <button
                  onClick={cycleSize}
                  className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors"
                  title={`Resize (Current: ${size.toUpperCase()})`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-red-500/20 rounded text-zinc-400 hover:text-red-400 transition-colors"
                  title="Close Video"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted={isMuted}
                playsInline
                autoPlay
                className="w-full h-full object-cover"
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onClick={togglePlay}
              />

              {/* Centered Play Overlay (only when paused) */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity"
                >
                  <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 active:scale-95 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white ml-0.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Bottom Custom Overlay Controls (fade in/out on hover or if paused) */}
              <AnimatePresence>
                {(showControls || !isPlaying) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2.5 flex flex-col gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Scrub/Progress bar */}
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/25 accent-white rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all outline-none"
                      />
                    </div>

                    {/* Buttons & Time */}
                    <div className="flex items-center justify-between mt-0.5">
                      <div className="flex items-center gap-2">
                        {/* Play/Pause Button */}
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-zinc-300 transition-colors"
                        >
                          {isPlaying ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          )}
                        </button>

                        {/* Mute/Unmute Button */}
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-zinc-300 transition-colors"
                        >
                          {isMuted ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <line x1="23" y1="9" x2="17" y2="15"></line>
                              <line x1="17" y1="9" x2="23" y2="15"></line>
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                          )}
                        </button>

                        {/* Duration Text */}
                        <span className="text-[10px] font-sans text-zinc-300">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small Floating reopen button if closed */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={() => setIsVisible(true)}
            className="fixed bottom-[120px] right-6 z-40 p-4 bg-zinc-950 border border-white/10 hover:border-white/30 text-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
            title="Open Intro Video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-zinc-300">
              Intro Video
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
