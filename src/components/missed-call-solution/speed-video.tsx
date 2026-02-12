// Step 1: Create a new file at: src/components/missed-call-solution/speed-video.tsx

'use client';

interface SpeedVideoProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  speed?: number;
}

export function SpeedVideo({ 
  src, 
  className, 
  width, 
  height, 
  speed = 1.5 
}: SpeedVideoProps) {
  return (
    <video 
      src={src}
      width={width}
      height={height}
      className={className}
      autoPlay 
      loop 
      muted 
      playsInline
      ref={(video) => {
        if (video) {
          video.playbackRate = speed;
        }
      }}
    />
  );
}

// Step 2: In your page.tsx file, add this import at the top:
// import { SpeedVideo } from "@/components/missed-call-solution/speed-video";

// Step 3: Replace the video element in the "How It Works" section with:

/*<div className="md:mt-16 mt-12 flex justify-center">
  <SpeedVideo
    src="/missed-call-solution/how-it-works.mp4"
    width={800}
    height={400}
    className="aspect-[2/1] w-[480px] xl:w-[600px] h-[320px] xl:h-[413px] object-cover rounded-2xl shadow-md"
    speed={1.5}
  />
</div>*/