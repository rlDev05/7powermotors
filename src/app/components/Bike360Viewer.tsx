import React, { useState, useEffect, useRef } from 'react';

type SketchfabModel = {
  type: 'sketchfab';
  src: string;
};

interface Bike360ViewerProps {
  images?: string[] | SketchfabModel;
  onClose: () => void;
}

export const Bike360Viewer: React.FC<Bike360ViewerProps> = ({ images, onClose }) => {
  /* ---------------- Guard Clause ---------------- */
  if (!images) return null;

  /* ================== 3D MODEL MODE ================== */
  if (typeof images === 'object' && !Array.isArray(images)) {
    if (images.type === 'sketchfab') {
      
      // 1. Define the parameters for "Clean Mode"
      // ui_controls=0: Hides the bottom control bar
      // ui_infos=0: Hides title and author text
      // ui_inspector=0: Hides the option to inspect the model
      // ui_watermark=0: Hides logo (requires Pro, but good to have)
      // ui_ar=0, ui_vr=0, ui_help=0: Hides extra clutter
      const embedParams = '?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_animations=0';
      
      // 2. Combine the source URL with the parameters
      const viewerUrl = `${images.src}${embedParams}`;

      return (
        <div className="relative w-full h-full bg-white">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-accent hover:text-white text-black/60 rounded-full transition-all z-50"
          >
            x
          </button>

          <div className="w-full h-full flex flex-col">
  <iframe
    src={viewerUrl}
    title="3D Model Viewer"
    className="w-full flex-1 rounded-2xl"
    allow="autoplay; fullscreen; xr-spatial-tracking"
    allowFullScreen
  />

  {/* Attribution (required by Sketchfab license) */}
  <div className="mt-2 text-[11px] text-gray-500 text-center">
    3D model by{' '}
    <a
      href="https://sketchfab.com/INDG"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-accent"
    >
      INDG
    </a>{' '}
    on{' '}
    <a
      href="https://sketchfab.com"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-accent"
    >
      Sketchfab
    </a>
  </div>
</div>

        </div>
      );
    }

    return null;
  }

  /* ================== 360 IMAGE MODE ================== */
  // (The rest of your code remains exactly the same)
  const frames = images; 
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const startX = useRef(0);
  const startFrame = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const allLoaded = loadedCount === frames.length;
  const loadingProgress = Math.round((loadedCount / frames.length) * 100);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    startFrame.current = currentFrame;
    document.body.style.cursor = 'grabbing';
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;

    const deltaX = clientX - startX.current;
    const containerWidth = containerRef.current.clientWidth;
    const sensitivity = 5;

    const dragPercent = deltaX / (containerWidth / sensitivity);
    const frameShift = Math.floor(dragPercent * frames.length);

    let newFrame = (startFrame.current - frameShift) % frames.length;
    if (newFrame < 0) newFrame += frames.length;

    setCurrentFrame(newFrame);
  };

  const handleEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = 'auto';
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-white flex flex-col items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing">

      {/* Loading Overlay */}
      {!allLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl">
          <div className="w-12 h-12 border-4 border-black/10 border-t-accent rounded-full animate-spin mb-4" />
          <p className="font-rajdhani font-bold text-accent tracking-widest">
            LOADING 360 deg ({loadingProgress}%)
          </p>
        </div>
      )}

      {/* Instruction */}
      <div className="absolute top-6 inset-x-0 text-center z-40 pointer-events-none">
        <span className="bg-black/80 text-white text-xs px-4 py-1.5 rounded-full uppercase font-bold tracking-widest">
          {isDragging ? 'Rotating...' : 'Drag to Rotate'}
        </span>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-accent hover:text-white rounded-full z-50"
      >
        x
      </button>

      {/* Viewer */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center touch-none"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {frames.map((src, index) => (
          <img
            key={index}
            src={src}
            onLoad={() => setLoadedCount(v => v + 1)}
            className={`absolute w-full h-full object-contain ${
              index === currentFrame ? 'opacity-100 z-10' : 'opacity-0'
            }`}
            draggable={false}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-6 w-1/3 h-1 bg-gray-200 rounded-full overflow-hidden z-40">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${((currentFrame + 1) / frames.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
