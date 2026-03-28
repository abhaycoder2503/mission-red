import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  const idsKey = ids.join(',');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-15% 0px -40% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}