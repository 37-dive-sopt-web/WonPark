import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const PINK_COLORS = ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FF1493", "#FF69B4"];

// 성공 시 confetti 효과
export function fireMatchConfetti() {
  const count = 50;
  const defaults = {
    origin: { y: 0.6 },
    colors: PINK_COLORS,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

// 클리어 시 큰 confetti 효과
export function fireWinConfetti(duration = 3000) {
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: PINK_COLORS,
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: PINK_COLORS,
    });
  }, 250);

  return interval;
}

// 매칭 성공 시 자동으로 confetti
export function useMatchConfetti(matchedSize) {
  const prevMatchedSize = useRef(0);

  useEffect(() => {
    if (matchedSize > prevMatchedSize.current && matchedSize > 0) {
      fireMatchConfetti();
    }
    prevMatchedSize.current = matchedSize;
  }, [matchedSize]);
}
