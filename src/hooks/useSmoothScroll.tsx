import { useCallback } from 'react';

interface UseScrollToSectionOptions {
  duration?: number;
  offset?: number;
}

export const useScrollToSection = (options: UseScrollToSectionOptions = {}) => {
  const { duration = 1000, offset = 80 } = options;

  return useCallback((selector: string) => {
    const target = document.querySelector(selector);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }, [duration, offset]);
};
