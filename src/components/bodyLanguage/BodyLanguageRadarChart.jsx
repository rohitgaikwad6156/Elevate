import styles from './BodyLanguageRadarChart.module.css';

export default function BodyLanguageRadarChart({ data, size = 300 }) {
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = data.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Grid levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (value, index, maxVal = 100) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Points strings
  const currentPoints = data
    .map((item, i) => {
      const { x, y } = getCoordinates(item.current, i);
      return `${x},${y}`;
    })
    .join(' ');

  const previousPoints = data
    .map((item, i) => {
      const { x, y } = getCoordinates(item.previous, i);
      return `${x},${y}`;
    })
    .join(' ');

  const targetPoints = data
    .map((item, i) => {
      const { x, y } = getCoordinates(item.target || 90, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={styles.container}>
      <svg width={size} height={size} className={styles.svg}>
        {/* Background polygon webs */}
        {levels.map((level, lvlIdx) => {
          const points = data
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = level * radius;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <polygon
              key={`grid-${lvlIdx}`}
              points={points}
              className={styles.gridPolygon}
            />
          );
        })}

        {/* Radial Axis Lines */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className={styles.axisLine}
            />
          );
        })}

        {/* Target Polygon (Subtle Dotted) */}
        <polygon points={targetPoints} className={styles.targetPolygon} />

        {/* Previous Month Polygon */}
        <polygon points={previousPoints} className={styles.previousPolygon} />

        {/* Current Month Polygon */}
        <polygon points={currentPoints} className={styles.currentPolygon} />

        {/* Current Data Dots */}
        {data.map((item, i) => {
          const { x, y } = getCoordinates(item.current, i);
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r={4}
              className={styles.currentDot}
            />
          );
        })}

        {/* Axis Labels */}
        {data.map((item, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 22;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);

          return (
            <text
              key={`label-${i}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              className={styles.axisLabel}
            >
              {item.skill}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotCurrent}`} />
          <span>Current ({data.reduce((acc, d) => acc + d.current, 0) / data.length | 0}%)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotPrev}`} />
          <span>Previous Month</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotTarget}`} />
          <span>Target (85%+)</span>
        </div>
      </div>
    </div>
  );
}
