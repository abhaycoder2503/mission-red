import { useEffect, useRef, useState } from 'react';

type Props = {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export default function CountUp({
  end,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        if (!isVisible || startedRef.current) return;
        startedRef.current = true;

        const start = performance.now();
        const from = 0;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const next = from + (end - from) * eased;
          setValue(next);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.45 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [duration, end]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}