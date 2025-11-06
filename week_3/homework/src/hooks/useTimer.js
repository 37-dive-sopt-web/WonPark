import { useEffect, useRef, useState } from "react";

/** requestAnimationFrame 기반 감소 타이머 */
export default function useTimer(initialSeconds, isRunning) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const animationFrameId = useRef();
  const startTime = useRef();

  useEffect(() => {
    setTimeRemaining(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }
    startTime.current = performance.now();
    const updateTimer = (currentTime) => {
      const elapsedSeconds = (currentTime - startTime.current) / 1000;
      const remaining = Math.max(0, initialSeconds - elapsedSeconds);
      setTimeRemaining(remaining);
      if (remaining > 0) {
        animationFrameId.current = requestAnimationFrame(updateTimer);
      }
    };
    animationFrameId.current = requestAnimationFrame(updateTimer);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [initialSeconds, isRunning]);

  const reset = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    setTimeRemaining(initialSeconds);
  };

  return { timeRemaining, isTimeUp: timeRemaining <= 0, reset };
}
