import React, { useState } from 'react';
import { Compass, Scale } from 'lucide-react';

export const BeamStructuralSimulator: React.FC = () => {
  const [spanLength, setSpanLength] = useState<number>(6); // meters (L)
  const [load, setLoad] = useState<number>(60); // kN (W)
  const [loadPos, setLoadPos] = useState<number>(3); // meters from left (a)

  // Ensure load position is clamped within beam span
  const safeLoadPos = Math.min(spanLength - 0.5, Math.max(0.5, loadPos));
  const b = spanLength - safeLoadPos;

  // Support Reactions (Static Equilibrium)
  const reactionA = (load * b) / spanLength; // kN
  const reactionB = (load * safeLoadPos) / spanLength; // kN

  // Maximum Bending Moment occurs at load position
  const maxBendingMoment = (load * safeLoadPos * b) / spanLength; // kNm

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-300">
            Simply Supported Beam: Shear Force (SFD) & Bending Moment (BMD)
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded">
          Euler-Bernoulli Elastic Flexure
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sliders Input Panel */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <span className="text-xs font-mono font-bold text-slate-400 border-b border-slate-800 pb-2 block">
            Beam Geometry & Loading
          </span>

          {/* Span Length */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Beam Span (L):</span>
              <span className="text-indigo-400 font-bold">{spanLength} m</span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={spanLength}
              onChange={e => setSpanLength(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Point Load W */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Point Load (W):</span>
              <span className="text-amber-400 font-bold">{load} kN</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={load}
              onChange={e => setLoad(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Load Position a */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Load Position from Left (a):</span>
              <span className="text-emerald-400 font-bold">{safeLoadPos.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min="0.5"
              max={spanLength - 0.5}
              step="0.5"
              value={safeLoadPos}
              onChange={e => setLoadPos(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Structural Reactions & Diagram */}
        <div className="lg:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
          {/* Reaction Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono block">Left Reaction R_A</span>
              <span className="text-base font-extrabold font-mono text-indigo-400">
                {reactionA.toFixed(1)} kN
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono block">Right Reaction R_B</span>
              <span className="text-base font-extrabold font-mono text-purple-400">
                {reactionB.toFixed(1)} kN
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-mono block">Max Moment M_max</span>
              <span className="text-base font-extrabold font-mono text-emerald-400">
                {maxBendingMoment.toFixed(1)} kN·m
              </span>
            </div>
          </div>

          {/* SVG Diagram: Beam with Load Arrow and SFD / BMD curves */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <svg viewBox="0 0 320 140" className="w-full h-auto">
              {/* Beam body */}
              <rect x="30" y="40" width="260" height="10" fill="#475569" stroke="#94a3b8" strokeWidth="1" rx="2" />

              {/* Support A (Pinned left) */}
              <polygon points="25,50 35,50 30,40" fill="#6366f1" />
              <text x="30" y="65" textAnchor="middle" fill="#818cf8" fontSize="9" fontFamily="monospace">A</text>

              {/* Support B (Roller right) */}
              <circle cx="290" cy="53" r="3" fill="#a855f7" />
              <line x1="285" y1="56" x2="295" y2="56" stroke="#a855f7" strokeWidth="1.5" />
              <text x="290" y="68" textAnchor="middle" fill="#c084fc" fontSize="9" fontFamily="monospace">B</text>

              {/* Load Arrow Position */}
              {(() => {
                const loadX = 30 + (safeLoadPos / spanLength) * 260;
                return (
                  <g>
                    <line x1={loadX} y1="12" x2={loadX} y2="38" stroke="#f59e0b" strokeWidth="2.5" />
                    <polygon points={`${loadX - 4},32 ${loadX + 4},32 ${loadX},38`} fill="#f59e0b" />
                    <text x={loadX} y="8" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      W = {load} kN
                    </text>
                  </g>
                );
              })()}

              {/* Bending Moment Qualitative Profile (Bottom half) */}
              {(() => {
                const loadX = 30 + (safeLoadPos / spanLength) * 260;
                return (
                  <g>
                    <path
                      d={`M 30,110 L ${loadX},85 L 290,110 Z`}
                      fill="rgba(16, 185, 129, 0.25)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <text x={loadX} y="80" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace">
                      BMD (M_max = {maxBendingMoment.toFixed(0)} kNm)
                    </text>
                    <line x1="20" y1="110" x2="300" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
