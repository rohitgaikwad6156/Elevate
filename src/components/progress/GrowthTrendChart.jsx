import { useState } from 'react';
import { growthTrendTimeRanges } from '../../data/progressData';
import styles from './GrowthTrendChart.module.css';

export default function GrowthTrendChart({ selectedRange, onSelectRange }) {
  const currentRange = selectedRange || '30D';
  const data = growthTrendTimeRanges[currentRange] || growthTrendTimeRanges['30D'];

  const width = 500;
  const height = 180;
  const padLeft = 32;
  const padRight = 36;
  const padTop = 20;
  const padBottom = 26;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const getX = (idx) => padLeft + (idx / (data.length - 1)) * chartW;
  const getY = (val) => padTop + chartH - (val / 100) * chartH;

  const currentPoints = data.map((d, i) => `${getX(i)},${getY(d.current)}`).join(' ');
  const lastPoints = data.map((d, i) => `${getX(i)},${getY(d.lastPeriod)}`).join(' ');
  const targetPoints = data.map((d, i) => `${getX(i)},${getY(d.target)}`).join(' ');

  const areaPoints = `${getX(0)},${getY(0)} ` + currentPoints + ` ${getX(data.length - 1)},${getY(0)}`;

  const ranges = ['7D', '30D', '90D', '6M', '1Y', 'All'];
  const lastDataPoint = data[data.length - 1];

  return (
    <div className={styles.container}>
      {/* Range Filter Controls */}
      <div className={styles.rangeTabs}>
        {ranges.map((r) => (
          <button
            key={r}
            type="button"
            className={`${styles.rangeBtn} ${currentRange === r ? styles.rangeActive : ''}`}
            onClick={() => onSelectRange && onSelectRange(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* SVG Chart Area */}
      <div className={styles.svgWrapper}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  className={styles.gridLine}
                />
                <text
                  x={padLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className={styles.yAxisLabel}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill for Current */}
          <polygon points={areaPoints} fill="url(#trendGradient)" />

          {/* Target Line (Dashed Green) */}
          <polyline
            points={targetPoints}
            fill="none"
            className={styles.lineTarget}
          />

          {/* Last Period Line (Dashed Cyan) */}
          <polyline
            points={lastPoints}
            fill="none"
            className={styles.lineLast}
          />

          {/* Current Score Line (Solid Purple) */}
          <polyline
            points={currentPoints}
            fill="none"
            className={styles.lineCurrent}
          />

          {/* Current Score Dots */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.current);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="3.5"
                className={styles.dotCurrent}
              />
            );
          })}

          {/* Latest Score Badge (e.g. 84) */}
          <g
            transform={`translate(${getX(data.length - 1) - 10}, ${
              getY(lastDataPoint.current) - 16
            })`}
          >
            <rect
              width="24"
              height="16"
              rx="4"
              className={styles.badgeRect}
            />
            <text
              x="12"
              y="11"
              textAnchor="middle"
              className={styles.badgeText}
            >
              {lastDataPoint.current}
            </text>
          </g>

          {/* X Axis Labels */}
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <text
                key={i}
                x={x}
                y={height - 6}
                textAnchor="middle"
                className={styles.xAxisLabel}
              >
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendLine} ${styles.lineCurrentSample}`} />
          <span>Current Score</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendLine} ${styles.lineLastSample}`} />
          <span>Last Period</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendLine} ${styles.lineTargetSample}`} />
          <span>Target</span>
        </div>
      </div>
    </div>
  );
}
