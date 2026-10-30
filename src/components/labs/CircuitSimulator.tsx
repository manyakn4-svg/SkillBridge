import React, { useState } from 'react';
import { Gauge, Zap, Flame, Activity } from 'lucide-react';

export const CircuitSimulator: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(12); // Volts
  const [resistance, setResistance] = useState<number>(220); // Ohms

  // Ohm's law calculations
  const currentAmps = resistance > 0 ? voltage / resistance : 0;
  const currentMilliAmps = currentAmps * 1000;
  const powerWatts = voltage * currentAmps;

  // Max scale for visual meters
  const maxVoltage = 30;
  const maxResistance = 1000;
  const maxCurrentMA = (maxVoltage / 10) * 1000; // 3000 mA

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-slate-300">
            DC Ohm's Law & Circuit Analyzer (V = I · R)
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded">
          Linear Active State
        </span>
      </div>

      {/* Interactive Controls & Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sliders Area */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-5">
          <span className="text-xs font-mono font-bold text-slate-400 block border-b border-slate-800 pb-2">
            Independent Input Variables
          </span>

          {/* Voltage Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Source Voltage (V):
              </span>
              <span className="text-amber-400 font-bold">{voltage.toFixed(1)} V</span>
            </div>
            <input
              type="range"
              min="1"
              max={maxVoltage}
              step="0.5"
              value={voltage}
              onChange={e => setVoltage(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>1V</span>
              <span>15V</span>
              <span>30V</span>
            </div>
          </div>

          {/* Resistance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Resistor R (Ω):</span>
              <span className="text-indigo-400 font-bold">{resistance} Ω</span>
            </div>
            <input
              type="range"
              min="10"
              max={maxResistance}
              step="10"
              value={resistance}
              onChange={e => setResistance(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono">
              <span>10 Ω</span>
              <span>500 Ω</span>
              <span>1000 Ω</span>
            </div>
          </div>
        </div>

        {/* Calculated Meter Gauges */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 border-b border-slate-800 pb-2">
            Measured Circuit Telemetry
          </span>

          <div className="grid grid-cols-2 gap-3">
            {/* Ammeter Card */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Current (I)</span>
              <span className="text-xl font-extrabold font-mono text-emerald-400 my-1">
                {currentMilliAmps.toFixed(1)} <span className="text-xs">mA</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">({currentAmps.toFixed(4)} A)</span>
            </div>

            {/* Wattmeter Card */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Dissipated Power (P)</span>
              <span className="text-xl font-extrabold font-mono text-rose-400 my-1">
                {powerWatts < 1 ? (powerWatts * 1000).toFixed(0) : powerWatts.toFixed(2)}
                <span className="text-xs">{powerWatts < 1 ? ' mW' : ' W'}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">P = V · I</span>
            </div>
          </div>

          {/* Current Bar Visualization */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Circuit Current Load %</span>
              <span>{Math.min(100, Math.round((currentMilliAmps / 1000) * 100))}%</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-200"
                style={{ width: `${Math.min(100, (currentMilliAmps / 1000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live Circuit Schematic Diagram */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative">
          <span className="text-[10px] font-mono text-slate-500 uppercase absolute top-2 left-3">
            Closed Loop DC Circuit
          </span>

          <svg viewBox="0 0 200 130" className="w-full max-w-[200px] h-auto my-2">
            {/* Circuit Wire Loop */}
            <rect x="25" y="20" width="150" height="90" fill="none" stroke="#6366f1" strokeWidth="2.5" rx="6" />

            {/* DC Voltage Source (Left branch) */}
            <circle cx="25" cy="65" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="25" y="69" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
              {voltage}V
            </text>

            {/* Resistor (Top branch) */}
            <rect x="80" y="14" width="40" height="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" rx="2" />
            <text x="100" y="23" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold" fontFamily="monospace">
              {resistance}Ω
            </text>

            {/* Ammeter (Right branch) */}
            <circle cx="175" cy="65" r="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="175" y="69" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">
              A
            </text>
          </svg>

          <span className="text-[11px] font-mono text-slate-400 text-center">
            Electron Drift Rate: {currentMilliAmps > 100 ? '⚡ Rapid' : currentMilliAmps > 20 ? 'Moderate' : 'Slow'}
          </span>
        </div>
      </div>
    </div>
  );
};
