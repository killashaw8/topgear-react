import { useMemo } from "react";

const STAR_FIELD_SIZE = 3000;

const buildStars = (count: number, seed: number, color: string) => {
  let value = "";
  let rng = seed;

  const next = () => {
    rng |= 0;
    rng = (rng + 0x6d2b79f5) | 0;
    let t = Math.imul(rng ^ (rng >>> 15), 1 | rng);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = 0; i < count; i += 1) {
    const x = Math.floor(next() * STAR_FIELD_SIZE);
    const y = Math.floor(next() * STAR_FIELD_SIZE);
    value += `${x}px ${y}px ${color}`;
    if (i < count - 1) value += ", ";
  }

  return value;
};

export default function StarsBackground() {
  const dotColor = "#3B82F6";
  const starsSmall = useMemo(() => buildStars(700, 1, dotColor), []);
  const starsMedium = useMemo(() => buildStars(200, 2, dotColor), []);
  const starsLarge = useMemo(() => buildStars(100, 3, dotColor), []);

  return (
    <div className="stars-bg" aria-hidden="true">
      <div className="stars-layer stars-layer--small" style={{ boxShadow: starsSmall }} />
      <div className="stars-layer stars-layer--small stars-layer--clone" style={{ boxShadow: starsSmall }} />
      <div className="stars-layer stars-layer--medium" style={{ boxShadow: starsMedium }} />
      <div className="stars-layer stars-layer--medium stars-layer--clone" style={{ boxShadow: starsMedium }} />
      <div className="stars-layer stars-layer--large" style={{ boxShadow: starsLarge }} />
      <div className="stars-layer stars-layer--large stars-layer--clone" style={{ boxShadow: starsLarge }} />
    </div>
  );
}

