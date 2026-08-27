import { useState } from 'react';
import styles from './GrowthRadarChart.module.css';

export default function GrowthRadarChart({ data }) {
  const axes = data?.axes || [
    { name: 'English', key: 'english' },
    { name: 'Public Speaking', key: 'speaking' },
    { name: 'Body Language', key: 'body_language' },
    { name: 'Interview', key: 'interview' },
    { name: 'Learning', key: 'learning' },
    { name: 'Consistency', key: 'consistency' },
  ];

  const datasets = data?.datasets || {
    current: { english: 82, speaking: 86, body_language: 78, interview: 80, learning: 88, consistency: 89 },
    lastMonth: { english: 73, speaking: 74, body_language: 71, interview: 69, learning: 74, consistency: 82 },
    target: { english: 90, speaking: 92, body_language: 88, interview: 90, learning: 95, consistency: 95 },
  };

  const center = 140;
  const radius = 95;
  const numAxes = axes.length;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getPolygonPoints = (dataset) => {
    return axes
      .map((axis, i) => {
        const val = dataset[axis.key] || 50;
        const { x, y } = getCoordinates(i, val);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const gridLevels = [25, 50, 75, 100];

  return (
    <div className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 280 280">
        {/* Background Grid Rings */}
        {gridLevels.map((lvl) => {
          const points = axes
            .map((_, i) => {
              const { x, y } = getCoordinates(i, lvl);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={lvl}
              points={points}
              className={styles.gridRing}
              fill="none"
            />
          );
        })}

        {/* Axis Spokes */}
        {axes.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className={styles.axisSpoke}
            />
          );
        })}

        {/* Target Dataset (Dashed Green) */}
        <polygon
          points={getPolygonPoints(datasets.target)}
          className={styles.polyTarget}
        />

        {/* Last Month Dataset (Dashed Cyan/Blue) */}
        <polygon
          points={getPolygonPoints(datasets.lastMonth)}
          className={styles.polyLastMonth}
        />

        {/* Current Dataset (Solid Purple/Indigo with gradient) */}
        <polygon
          points={getPolygonPoints(datasets.current)}
          className={styles.polyCurrent}
        />

        {/* Data Point Dots for Current */}
        {axes.map((axis, i) => {
          const val = datasets.current[axis.key] || 50;
          const { x, y } = getCoordinates(i, val);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              className={styles.pointCurrent}
            />
          );
        })}

        {/* Labels */}
        {axes.map((axis, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const labelRadius = radius + 22;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={axis.key}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              className={styles.axisLabel}
            >
              {axis.name}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotCurrent}`} />
          <span>Current</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotLast}`} />
          <span>Last Month</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotTarget}`} />
          <span>Target</span>
        </div>
      </div>
    </div>
  );
}
