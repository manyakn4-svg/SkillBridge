import React, { useState } from 'react';
import { Play, RotateCcw, TrendingUp } from 'lucide-react';

export const LinearRegressionSim: React.FC = () => {
  // Synthetic data points (X, Y)
  const defaultPoints = [
    { x: 10, y: 25 },
    { x: 20, y: 35 },
    { x: 30, y: 55 },
    { x: 40, y: 50 },
    { x: 50, y: 75 },
    { x: 60, y: 70 },
    { x: 70, y: 92 },
    { x: 80, y: 95 },
  ];

  const [slope, setSlope] = useState<number>(0.8); // w
  const [intercept, setIntercept] = useState<number>(18); // b
  const [iteration, setIteration] = useState<number>(0);

  // Compute Mean Squared Error (MSE)
  const computeMSE = (w: number, b: number) => {
    let sumSqErr = 0;
    defaultPoints.forEach(p => {
      const pred = w * p.x + b;
      sumSqErr += Math.pow(pred - p.y, 2);
    });
    return sumSqErr / defaultPoints.length;
  };

  const currentMSE = computeMSE(slope, intercept);

  // Gradient Descent Step (Analytical learning step)
  const handleGradientStep = () => {
    const lr = 0.0001; // Learning rate
    let gradW = 0;
    let gradB = 0;
    const n = defaultPoints.length;

    defaultPoints.forEach(p => {
      const pred = slope * p.x + intercept;
      const diff = pred - p.y;
      gradW += (2 / n) * diff * p.x;
      gradB += (2 / n) * diff;
    });

    const newSlope = Math.max(0.1, Math.min(2.5, slope - lr * gradW));
    const newIntercept = Math.max(0, Math.min(50, intercept - lr * 10 * gradB));

    setSlope(newSlope);
    setIntercept(newIntercept);
    setIteration(prev => prev + 1);
  };

  const handleReset = () => {
    setSlope(0.5);
    setIntercept(10);
    setIteration(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono font-bold text-slate-300">
            Linear Regression Model: ŷ = w · x + b
          </span>
        </div>
        <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/70 border border-indigo-800/60 px-2 py-0.5 rounded">
          Epoch: {iteration}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Interactive 2D Coordinate Plane */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
          <svg viewBox="0 0 240 180" className="w-full max-w-[260px] h-auto">
            {/* Grid Lines */}
            <line x1="20" y1="160" x2="220" y2="160" stroke="#334155" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="20" y2="160" stroke="#334155" strokeWidth="1.5" />

            {/* Regression Line: ŷ = w * x + b */}
            {/* At x=10: y1 = slope * 10 + intercept. In SVG coords: ySVG = 160 - (yVal * 1.3) */}
            {(() => {
              const x1 = 10;
              const yVal1 = slope * x1 + intercept;
              const ySVG1 = Math.max(20, Math.min(160, 160 - yVal1 * 1.3));

              const x2 = 85;
              const yVal2 = slope * x2 + intercept;
              const ySVG2 = Math.max(20, Math.min(160, 160 - yVal2 * 1.3));

              const svgX1 = 20 + (x1 * 2);
              const svgX2 = 20 + (x2 * 2);

              return (
                <line
                  x1={svgX1}
                  y1={ySVG1}
                  x2={svgX2}
                  y2={ySVG2}
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />
              );
            })()}

            {/* Data Points */}
            {defaultPoints.map((p, idx) => {
              const svgX = 20 + (p.x * 2);
              const svgY = 160 - (p.y * 1.3);
              const predY = slope * p.x + intercept;
              const predSvgY = 160 - (predY * 1.3);

              return (
                <g key={idx}>
                  {/* Residual line */}
                  <line
                    x1={svgX}
                    y1={svgY}
                    x2={svgX}
                    y2={predSvgY}
                    stroke="#f43f5e"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <circle cx={svgX} cy={svgY} r="3.5" fill="#38bdf8" />
                </g>
              );
            })}
          </svg>

          <div className="flex items-center justify-between w-full text-[10px] font-mono text-slate-400 mt-2 px-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> Training Samples
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-indigo-500 inline-block" /> Regression Line
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-rose-500 border border-dashed inline-block" /> Residuals
            </span>
          </div>
        </div>

        {/* Sliders and Metrics */}
        <div className="space-y-4">
          {/* MSE Score Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Mean Squared Error (MSE Loss)
              </span>
              <span className="text-2xl font-extrabold font-mono text-rose-400">
                {currentMSE.toFixed(2)}
              </span>
            </div>
            <div className="text-right text-[11px] font-mono text-slate-400">
              <div>w (Weight) = <span className="text-indigo-400 font-bold">{slope.toFixed(2)}</span></div>
              <div>b (Bias) = <span className="text-purple-400 font-bold">{intercept.toFixed(1)}</span></div>
            </div>
          </div>

          {/* Weight Slope Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Weight (Slope w):</span>
              <span className="text-indigo-400 font-bold">{slope.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={slope}
              onChange={e => setSlope(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Bias Intercept Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Bias (Intercept b):</span>
              <span className="text-purple-400 font-bold">{intercept.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={intercept}
              onChange={e => setIntercept(parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleGradientStep}
              className="flex-1 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> 1 Gradient Step
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
