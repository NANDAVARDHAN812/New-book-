import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export const ProjectileLab: React.FC = () => {
  const [speed, setSpeed] = useState(28);
  const [angle, setAngle] = useState(35);
  const [showComplement, setShowComplement] = useState(true);

  const g = 9.8;
  const rad = (angle * Math.PI) / 180;
  const range = (speed * speed * Math.sin(2 * rad)) / g;
  const maxHeight = (speed * speed * Math.sin(rad) * Math.sin(rad)) / (2 * g);
  const flightTime = (2 * speed * Math.sin(rad)) / g;

  const compAngle = 90 - angle;
  const compRad = (compAngle * Math.PI) / 180;
  const compHeight = (speed * speed * Math.sin(compRad) * Math.sin(compRad)) / (2 * g);

  // Scale world coordinates: X in [0, 165m] -> [35, 345], Y in [0, 85m] -> [175, 20]
  const toX = (x: number) => 35 + (x / 165) * 310;
  const toY = (y: number) => 175 - (y / 85) * 155;

  const buildPath = (angRad: number) => {
    const pts: string[] = [];
    const tTotal = (2 * speed * Math.sin(angRad)) / g;
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * tTotal;
      const x = speed * Math.cos(angRad) * t;
      const y = speed * Math.sin(angRad) * t - 0.5 * g * t * t;
      pts.push(`${toX(x).toFixed(1)},${Math.max(12, toY(Math.max(0, y))).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-display text-base font-semibold text-slate-900">
            Projectile Motion & Complementary Range Simulator (g = 9.8 m/s²)
          </h4>
          <p className="text-xs text-slate-600">
            Observe how θ and (90° − θ) yield identical horizontal range R = u² sin(2θ)/g with different peak heights.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSpeed(28);
            setAngle(35);
            setShowComplement(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4">
          <svg viewBox="0 0 360 200" className="w-full h-48" aria-label="Projectile trajectory curve">
            {[50, 90, 130].map((y) => (
              <line key={y} x1="35" y1={y} x2="345" y2={y} stroke="#f1f5f9" strokeWidth="1" />
            ))}
            <line x1="35" y1="20" x2="35" y2="175" stroke="#64748b" strokeWidth="1.5" />
            <line x1="35" y1="175" x2="345" y2="175" stroke="#64748b" strokeWidth="1.5" />

            {showComplement && (
              <polyline
                fill="none"
                stroke="#94a3b8"
                strokeDasharray="4 4"
                strokeWidth="2"
                points={buildPath(compRad)}
              />
            )}
            <polyline
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              points={buildPath(rad)}
            />
            <circle cx={toX(range)} cy={175} r="4.5" fill="#059669" />

            <text x="42" y="28" className="fill-sky-700 text-[10px] font-mono">
              Solid: θ = {angle}° (H = {maxHeight.toFixed(1)}m)
            </text>
            {showComplement && (
              <text x="42" y="42" className="fill-slate-500 text-[10px] font-mono">
                Dashed: 90°−θ = {compAngle}° (H = {compHeight.toFixed(1)}m)
              </text>
            )}
            <text x="190" y="193" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono">
              Horizontal Distance (m) · Scale max 165 m
            </text>
          </svg>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <label htmlFor="proj-u">Initial Speed (u)</label>
              <span className="font-mono tabular-nums">{speed} m/s</span>
            </div>
            <input
              id="proj-u"
              type="range"
              min={15}
              max={40}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-sky-700"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <label htmlFor="proj-theta">Launch Angle (θ)</label>
              <span className="font-mono tabular-nums">{angle}°</span>
            </div>
            <input
              id="proj-theta"
              type="range"
              min={10}
              max={80}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-sky-700"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showComplement}
              onChange={(e) => setShowComplement(e.target.checked)}
              className="rounded accent-sky-700"
            />
            Overlay complementary angle ({compAngle}°) trajectory
          </label>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border border-slate-200 rounded-lg p-2.5">
              <div className="text-[11px] text-slate-500">Range (R)</div>
              <div className="font-mono text-sm font-semibold text-emerald-700 tabular-nums">
                {range.toFixed(1)} m
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5">
              <div className="text-[11px] text-slate-500">Max H</div>
              <div className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {maxHeight.toFixed(1)} m
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5">
              <div className="text-[11px] text-slate-500">Time (T)</div>
              <div className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {flightTime.toFixed(2)} s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
