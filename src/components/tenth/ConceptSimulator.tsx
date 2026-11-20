import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface ConceptSimulatorProps {
  type?: 'ohms-law' | 'quadratic' | 'refraction';
}

export const ConceptSimulator: React.FC<ConceptSimulatorProps> = ({ type }) => {
  // Ohm's Law state
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(6);

  // Quadratic state
  const [coefA, setCoefA] = useState(1);
  const [coefB, setCoefB] = useState(-2);
  const [coefC, setCoefC] = useState(-3);

  // Refraction state
  const [angleI, setAngleI] = useState(35);
  const [n2, setN2] = useState(1.52);

  if (!type) return null;

  if (type === 'ohms-law') {
    const current = voltage / resistance;
    const power = voltage * current;

    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="font-display text-base font-semibold text-slate-900">
              Interactive Ohm’s Law Circuit Lab
            </h4>
            <p className="text-xs text-slate-600">
              Adjust Voltage (V) and Resistance (R) to observe real-time Current (I) and V–I slope.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setVoltage(12);
              setResistance(6);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive SVG V-I Graph + Circuit */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4">
            <svg viewBox="0 0 360 200" className="w-full h-48" aria-label="Voltage versus Current curve">
              {/* Grid lines */}
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="45" y1={y} x2="340" y2={y} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              {[95, 155, 215, 275, 335].map((x) => (
                <line key={x} x1={x} y1="20" x2={x} y2="165" stroke="#f1f5f9" strokeWidth="1" />
              ))}
              {/* Axes */}
              <line x1="45" y1="20" x2="45" y2="165" stroke="#64748b" strokeWidth="1.5" />
              <line x1="45" y1="165" x2="340" y2="165" stroke="#64748b" strokeWidth="1.5" />

              {/* Axis Labels */}
              <text x="190" y="190" textAnchor="middle" className="fill-slate-600 text-[11px] font-mono">
                Voltage V (0 – 24 V)
              </text>
              <text
                x="16"
                y="95"
                textAnchor="middle"
                transform="rotate(-90 16 95)"
                className="fill-slate-600 text-[11px] font-mono"
              >
                Current I (A)
              </text>

              {/* V-I Line up to 24V (Max I plotted = 12A -> scale y: 165 - (I/12)*135) */}
              {(() => {
                const maxV = 24;
                const iAtMax = maxV / resistance;
                const clampedI = Math.min(iAtMax, 12);
                const endX = 45 + (clampedI * resistance / 24) * 285;
                const endY = 165 - (clampedI / 12) * 135;

                const ptX = 45 + (voltage / 24) * 285;
                const ptY = Math.max(22, 165 - (current / 12) * 135);

                return (
                  <>
                    <line
                      x1="45"
                      y1="165"
                      x2={endX}
                      y2={endY}
                      stroke="#0284c7"
                      strokeWidth="2.5"
                    />
                    <line
                      x1={ptX}
                      y1="165"
                      x2={ptX}
                      y2={ptY}
                      stroke="#94a3b8"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1="45"
                      y1={ptY}
                      x2={ptX}
                      y2={ptY}
                      stroke="#94a3b8"
                      strokeDasharray="3 3"
                    />
                    <circle cx={ptX} cy={ptY} r="5.5" fill="#0369a1" stroke="#ffffff" strokeWidth="2" />
                    <text
                      x={Math.min(ptX + 8, 250)}
                      y={Math.max(ptY - 8, 32)}
                      className="fill-slate-900 text-[11px] font-mono font-semibold"
                    >
                      ({voltage}V, {current.toFixed(2)}A)
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Sliders & Live Readouts */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <label htmlFor="ohm-v" className="text-slate-700">
                  Battery Voltage (V)
                </label>
                <span className="font-mono text-slate-900 tabular-nums">{voltage} V</span>
              </div>
              <input
                id="ohm-v"
                type="range"
                min={2}
                max={24}
                step={1}
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <label htmlFor="ohm-r" className="text-slate-700">
                  Circuit Resistance (R)
                </label>
                <span className="font-mono text-slate-900 tabular-nums">{resistance} Ω</span>
              </div>
              <input
                id="ohm-r"
                type="range"
                min={2}
                max={20}
                step={1}
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="text-[11px] text-slate-500">Current (I = V/R)</div>
                <div className="font-mono text-lg font-semibold text-sky-700 tabular-nums">
                  {current.toFixed(2)} A
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="text-[11px] text-slate-500">Power (P = V·I)</div>
                <div className="font-mono text-lg font-semibold text-slate-900 tabular-nums">
                  {power.toFixed(1)} W
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'quadratic') {
    const delta = coefB * coefB - 4 * coefA * coefC;
    const vertexX = -coefB / (2 * coefA);
    const vertexY = coefA * vertexX * vertexX + coefB * vertexX + coefC;

    // Map x in [-6, 6] -> [20, 340], y in [-10, 10] -> [180, 20]
    const toSvgX = (x: number) => 180 + (x / 6) * 150;
    const toSvgY = (y: number) => 100 - (y / 10) * 80;

    const points: string[] = [];
    for (let x = -6; x <= 6; x += 0.2) {
      const y = coefA * x * x + coefB * x + coefC;
      const sx = toSvgX(x);
      const sy = Math.max(10, Math.min(190, toSvgY(y)));
      points.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }

    const roots =
      delta >= 0
        ? [
            (-coefB - Math.sqrt(delta)) / (2 * coefA),
            (-coefB + Math.sqrt(delta)) / (2 * coefA),
          ]
        : [];

    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="font-display text-base font-semibold text-slate-900">
              Interactive Parabola & Root Explorer
            </h4>
            <p className="text-xs text-slate-600">
              Vary coefficients a, b, and c to watch the discriminant Δ = b² − 4ac shift real roots.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCoefA(1);
              setCoefB(-2);
              setCoefC(-3);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4">
            <svg viewBox="0 0 360 200" className="w-full h-48" aria-label="Quadratic parabola plot">
              {/* Coordinate Axes */}
              <line x1="20" y1="100" x2="340" y2="100" stroke="#94a3b8" strokeWidth="1.2" />
              <line x1="180" y1="15" x2="180" y2="185" stroke="#94a3b8" strokeWidth="1.2" />
              <polyline
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                points={points.join(' ')}
              />
              {roots.map((r, idx) => {
                if (r < -6 || r > 6) return null;
                return (
                  <circle
                    key={idx}
                    cx={toSvgX(r)}
                    cy={100}
                    r="5"
                    fill="#059669"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}
              {vertexX >= -6 && vertexX <= 6 && vertexY >= -10 && vertexY <= 10 && (
                <circle cx={toSvgX(vertexX)} cy={toSvgY(vertexY)} r="4" fill="#0f172a" />
              )}
            </svg>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <label htmlFor="quad-a">Coefficient a (non-zero)</label>
                <span className="font-mono tabular-nums">{coefA}</span>
              </div>
              <input
                id="quad-a"
                type="range"
                min={-3}
                max={3}
                step={0.5}
                value={coefA}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCoefA(val === 0 ? 0.5 : val);
                }}
                className="w-full accent-sky-700"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <label htmlFor="quad-b">Coefficient b</label>
                <span className="font-mono tabular-nums">{coefB}</span>
              </div>
              <input
                id="quad-b"
                type="range"
                min={-6}
                max={6}
                step={1}
                value={coefB}
                onChange={(e) => setCoefB(Number(e.target.value))}
                className="w-full accent-sky-700"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <label htmlFor="quad-c">Constant c</label>
                <span className="font-mono tabular-nums">{coefC}</span>
              </div>
              <input
                id="quad-c"
                type="range"
                min={-6}
                max={6}
                step={1}
                value={coefC}
                onChange={(e) => setCoefC(Number(e.target.value))}
                className="w-full accent-sky-700"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Discriminant (Δ)</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {delta.toFixed(1)}
                </span>
              </div>
              <div className="font-medium text-sky-800">
                {delta > 0
                  ? `Two Distinct Real Roots: ${roots[0].toFixed(2)}, ${roots[1].toFixed(2)}`
                  : delta === 0
                  ? `Two Equal Real Roots: ${vertexX.toFixed(2)}`
                  : 'No Real Roots (Parabola does not cross x-axis)'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Refraction simulator
  const radI = (angleI * Math.PI) / 180;
  const sinR = Math.sin(radI) / n2;
  const radR = Math.asin(Math.min(1, sinR));
  const angleR = (radR * 180) / Math.PI;

  const incX = 180 - 85 * Math.sin(radI);
  const incY = 100 - 85 * Math.cos(radI);
  const refX = 180 + 85 * Math.sin(radR);
  const refY = 100 + 85 * Math.cos(radR);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
      <div>
        <h4 className="font-display text-base font-semibold text-slate-900">
          Interactive Snell’s Law Refraction Lab
        </h4>
        <p className="text-xs text-slate-600">
          Light enters from Air (n₁ = 1.00) into a denser optical medium (n₂).
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4">
          <svg viewBox="0 0 360 200" className="w-full h-48" aria-label="Snell law ray bending diagram">
            <rect x="0" y="100" width="360" height="100" fill="#e0f2fe" opacity="0.65" />
            <line x1="0" y1="100" x2="360" y2="100" stroke="#64748b" strokeWidth="1.5" />
            <line x1="180" y1="15" x2="180" y2="185" stroke="#94a3b8" strokeDasharray="4 4" />
            <line x1={incX} y1={incY} x2="180" y2="100" stroke="#0369a1" strokeWidth="2.5" />
            <line x1="180" y1="100" x2={refX} y2={refY} stroke="#059669" strokeWidth="2.5" />
            <circle cx="180" cy="100" r="3.5" fill="#0f172a" />
            <text x="14" y="24" className="fill-slate-600 text-[11px] font-mono">
              Air (n₁ = 1.00)
            </text>
            <text x="14" y="184" className="fill-sky-900 text-[11px] font-mono">
              Medium (n₂ = {n2.toFixed(2)})
            </text>
          </svg>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <label htmlFor="angle-i">Angle of Incidence (i)</label>
              <span className="font-mono tabular-nums">{angleI}°</span>
            </div>
            <input
              id="angle-i"
              type="range"
              min={5}
              max={80}
              value={angleI}
              onChange={(e) => setAngleI(Number(e.target.value))}
              className="w-full accent-sky-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">Refracting Medium</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Water (1.33)', val: 1.33 },
                { label: 'Glass (1.52)', val: 1.52 },
                { label: 'Diamond (2.42)', val: 2.42 },
              ].map((m) => (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => setN2(m.val)}
                  className={`px-2 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    n2 === m.val
                      ? 'bg-sky-700 text-white border-sky-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center text-xs">
            <span className="text-slate-600">Angle of Refraction (r)</span>
            <span className="font-mono text-base font-semibold text-emerald-700 tabular-nums">
              {angleR.toFixed(1)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
