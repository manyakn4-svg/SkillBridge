import React, { useState } from 'react';
import { Zap, Check, Lightbulb } from 'lucide-react';

type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

export const LogicGatesSimulator: React.FC = () => {
  const [gate, setGate] = useState<GateType>('AND');
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(1);

  // Compute logic gate output
  const computeOutput = (g: GateType, a: number, b: number): number => {
    switch (g) {
      case 'AND': return a & b;
      case 'OR': return a | b;
      case 'NOT': return a === 1 ? 0 : 1;
      case 'NAND': return (a & b) === 1 ? 0 : 1;
      case 'NOR': return (a | b) === 1 ? 0 : 1;
      case 'XOR': return a ^ b;
      case 'XNOR': return (a ^ b) === 1 ? 0 : 1;
      default: return 0;
    }
  };

  const outputY = computeOutput(gate, inputA, inputB);

  // Truth table definitions
  const truthTables: Record<GateType, { a: number; b?: number; y: number }[]> = {
    AND: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
    OR: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 1 },
    ],
    NOT: [
      { a: 0, y: 1 },
      { a: 1, y: 0 },
    ],
    NAND: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 0 },
    ],
    NOR: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 0 },
    ],
    XOR: [
      { a: 0, b: 0, y: 0 },
      { a: 0, b: 1, y: 1 },
      { a: 1, b: 0, y: 1 },
      { a: 1, b: 1, y: 0 },
    ],
    XNOR: [
      { a: 0, b: 0, y: 1 },
      { a: 0, b: 1, y: 0 },
      { a: 1, b: 0, y: 0 },
      { a: 1, b: 1, y: 1 },
    ],
  };

  const tableRows = truthTables[gate];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg space-y-5">
      {/* Gate Selector Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <span className="text-xs font-mono font-bold text-slate-400">Select Digital Gate:</span>
        <div className="flex flex-wrap gap-1.5">
          {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as GateType[]).map(g => (
            <button
              key={g}
              type="button"
              onClick={() => setGate(g)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                gate === g
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Circuit Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Schematic Circuit Area */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[220px]">
          <span className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 uppercase">
            Live Digital Circuit Simulation
          </span>

          <div className="flex items-center gap-6 w-full justify-center">
            {/* Input Switches */}
            <div className="flex flex-col gap-5 items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">Input A:</span>
                <button
                  type="button"
                  onClick={() => setInputA(prev => (prev === 1 ? 0 : 1))}
                  className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors cursor-pointer border ${
                    inputA === 1 ? 'bg-emerald-600 border-emerald-400 justify-end' : 'bg-slate-800 border-slate-700 justify-start'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-slate-900 shadow">
                    {inputA}
                  </span>
                </button>
              </div>

              {gate !== 'NOT' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">Input B:</span>
                  <button
                    type="button"
                    onClick={() => setInputB(prev => (prev === 1 ? 0 : 1))}
                    className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors cursor-pointer border ${
                      inputB === 1 ? 'bg-emerald-600 border-emerald-400 justify-end' : 'bg-slate-800 border-slate-700 justify-start'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-slate-900 shadow">
                      {inputB}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Gate Symbol Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-tr from-indigo-950 to-slate-900 border-2 border-indigo-500/80 shadow-lg text-center min-w-[90px]">
              <span className="text-sm font-extrabold font-mono text-indigo-300 block">{gate}</span>
              <span className="text-[9px] text-slate-400 font-mono">
                {gate === 'NOT' ? "Y = A'" : gate === 'AND' ? 'Y = A · B' : gate === 'OR' ? 'Y = A + B' : gate === 'NAND' ? "Y = (A·B)'" : gate === 'NOR' ? "Y = (A+B)'" : gate === 'XOR' ? 'Y = A ⊕ B' : "Y = (A⊕B)'"}
              </span>
            </div>

            {/* Output Indicator Bulb */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  outputY === 1
                    ? 'bg-amber-400 border-amber-300 text-slate-950 shadow-xl shadow-amber-400/60 ring-4 ring-amber-400/30'
                    : 'bg-slate-900 border-slate-700 text-slate-600'
                }`}
              >
                <Lightbulb className={`w-7 h-7 ${outputY === 1 ? 'animate-pulse text-amber-950' : 'text-slate-600'}`} />
              </div>
              <div className="text-center font-mono">
                <span className="text-[10px] text-slate-400 block">Output Y</span>
                <span className={`text-sm font-bold ${outputY === 1 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {outputY === 1 ? 'HIGH (1)' : 'LOW (0)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Truth Table */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-slate-300">
              {gate} Gate Truth Table
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
              Active Row Highlighted
            </span>
          </div>

          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-left">
                <th className="py-2 px-3">Input A</th>
                {gate !== 'NOT' && <th className="py-2 px-3">Input B</th>}
                <th className="py-2 px-3">Output Y</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, idx) => {
                const isActive = gate === 'NOT'
                  ? row.a === inputA
                  : row.a === inputA && row.b === inputB;

                return (
                  <tr
                    key={idx}
                    className={`border-b border-slate-800/60 transition-colors ${
                      isActive
                        ? 'bg-indigo-900/60 text-white font-bold border-l-4 border-l-indigo-400'
                        : 'text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <td className="py-2 px-3">{row.a}</td>
                    {gate !== 'NOT' && <td className="py-2 px-3">{row.b}</td>}
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        row.y === 1 ? 'bg-amber-950 text-amber-300 border border-amber-800/50' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {row.y}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[10px]">
                      {isActive ? '◀ CURRENT' : ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
