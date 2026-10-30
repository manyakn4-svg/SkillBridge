import React, { useState } from 'react';
import { Layers, HardHat, Droplets } from 'lucide-react';

export const ConcreteMixCalculator: React.FC = () => {
  const [grade, setGrade] = useState<'M20' | 'M25' | 'M30'>('M25');
  const [volume, setVolume] = useState<number>(1); // m^3
  const [wcRatio, setWcRatio] = useState<number>(0.45);

  // Proportions per grade (approximate standard volumetric/mass ratio)
  // M20 = 1 : 1.5 : 3 (Cement : Fine : Coarse)
  // M25 = 1 : 1 : 2
  // M30 = 1 : 0.8 : 1.6 (High performance)
  const proportions = {
    M20: { cementKg: 380, sandKg: 680, aggKg: 1250, targetStrength: 26.5 },
    M25: { cementKg: 420, sandKg: 620, aggKg: 1200, targetStrength: 31.6 },
    M30: { cementKg: 480, sandKg: 580, aggKg: 1150, targetStrength: 38.2 },
  }[grade];

  // Scale by batch volume
  const totalCementKg = Math.round(proportions.cementKg * volume);
  const cementBags = (totalCementKg / 50).toFixed(1);
  const totalSandKg = Math.round(proportions.sandKg * volume);
  const totalAggKg = Math.round(proportions.aggKg * volume);
  const waterLiters = Math.round(totalCementKg * wcRatio);

  // Abram's law compressive strength estimate at 28 days
  const estimatedStrength = (proportions.targetStrength * (0.45 / wcRatio)).toFixed(1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <HardHat className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-slate-300">
            Concrete Mix Design Calculator (IS 10262 Standard)
          </span>
        </div>
        <div className="flex gap-1.5">
          {(['M20', 'M25', 'M30'] as const).map(g => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                grade === g
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {g} Grade
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Sliders Input */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <span className="text-xs font-mono font-bold text-slate-400 border-b border-slate-800 pb-2 block">
            Batch Parameters
          </span>

          {/* Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Batch Volume (m³):</span>
              <span className="text-amber-400 font-bold">{volume} m³</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Water Cement Ratio */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" /> Water-Cement Ratio (w/c):
              </span>
              <span className="text-sky-400 font-bold">{wcRatio.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.38"
              max="0.55"
              step="0.01"
              value={wcRatio}
              onChange={e => setWcRatio(parseFloat(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">28-Day Est. Strength:</span>
            <span className="text-base font-extrabold font-mono text-emerald-400">
              {estimatedStrength} MPa (N/mm²)
            </span>
          </div>
        </div>

        {/* Quantities Required Output */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 border-b border-slate-800 pb-2 block">
            Material Mass Requirements
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Portland Cement</span>
              <span className="text-sm font-bold text-amber-400">{totalCementKg} kg</span>
              <span className="text-[10px] text-slate-500 block">({cementBags} Bags)</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Fine Aggregate (Sand)</span>
              <span className="text-sm font-bold text-amber-200">{totalSandKg} kg</span>
              <span className="text-[10px] text-slate-500 block">Zone II river sand</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Coarse Aggregate (20mm)</span>
              <span className="text-sm font-bold text-slate-300">{totalAggKg} kg</span>
              <span className="text-[10px] text-slate-500 block">Crushed granite</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Mixing Water</span>
              <span className="text-sm font-bold text-sky-400">{waterLiters} Liters</span>
              <span className="text-[10px] text-slate-500 block">Potable water</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
