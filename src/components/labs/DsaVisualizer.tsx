import React, { useState } from 'react';
import { Play, RotateCcw, Plus, Trash2, ArrowRight, Layers, ListOrdered } from 'lucide-react';

interface DsaVisualizerProps {
  initialType?: 'stack' | 'queue' | 'sort';
}

export const DsaVisualizer: React.FC<DsaVisualizerProps> = ({ initialType = 'stack' }) => {
  const [mode, setMode] = useState<'stack' | 'queue' | 'sort'>(initialType);
  
  // Stack & Queue State
  const [items, setItems] = useState<number[]>([15, 32, 48]);
  const [inputVal, setInputVal] = useState<string>('60');
  const [message, setMessage] = useState<string>('Ready. Click an operation to manipulate data structure.');
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const maxSize = 6;

  // Sorting State
  const [sortArray, setSortArray] = useState<number[]>([45, 12, 85, 32, 8, 64, 21]);
  const [sortStep, setSortStep] = useState<number>(0);
  const [activeIndices, setActiveIndices] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [sortLog, setSortLog] = useState<string>('Click "Step Bubble Sort" to execute comparisons one by one.');

  // Stack operations
  const handlePush = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    if (items.length >= maxSize) {
      setMessage('⚠️ Stack Overflow! Max capacity reached (' + maxSize + ').');
      return;
    }
    const next = [...items, val];
    setItems(next);
    setAnimatingIndex(next.length - 1);
    setMessage(`✅ Pushed ${val} onto top of Stack. Top index = ${next.length - 1}`);
    setInputVal((val + 10).toString());
    setTimeout(() => setAnimatingIndex(null), 400);
  };

  const handlePop = () => {
    if (items.length === 0) {
      setMessage('⚠️ Stack Underflow! Stack is completely empty.');
      return;
    }
    const popped = items[items.length - 1];
    setAnimatingIndex(items.length - 1);
    setTimeout(() => {
      setItems(items.slice(0, -1));
      setAnimatingIndex(null);
      setMessage(`🗑️ Popped ${popped} from top of Stack.`);
    }, 250);
  };

  // Queue operations
  const handleEnqueue = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    if (items.length >= maxSize) {
      setMessage('⚠️ Queue Overflow! Max capacity reached (' + maxSize + ').');
      return;
    }
    const next = [...items, val];
    setItems(next);
    setAnimatingIndex(next.length - 1);
    setMessage(`✅ Enqueued ${val} at Rear pointer.`);
    setInputVal((val + 10).toString());
    setTimeout(() => setAnimatingIndex(null), 400);
  };

  const handleDequeue = () => {
    if (items.length === 0) {
      setMessage('⚠️ Queue Underflow! Queue is empty.');
      return;
    }
    const dequeued = items[0];
    setAnimatingIndex(0);
    setTimeout(() => {
      setItems(items.slice(1));
      setAnimatingIndex(null);
      setMessage(`🗑️ Dequeued ${dequeued} from Front pointer.`);
    }, 250);
  };

  // Sorting operations
  const handleResetSort = () => {
    setSortArray([45, 12, 85, 32, 8, 64, 21]);
    setSortStep(0);
    setActiveIndices(null);
    setSortedIndices([]);
    setSortLog('Array reset. Ready to sort.');
  };

  const handleStepBubbleSort = () => {
    const arr = [...sortArray];
    const n = arr.length;
    let swapped = false;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setActiveIndices([j, j + 1]);
          setSortArray(arr);
          setSortStep(prev => prev + 1);
          setSortLog(`Step ${sortStep + 1}: Swapped ${temp} and ${arr[j]} at indices [${j}, ${j + 1}].`);
          swapped = true;
          return;
        }
      }
    }

    if (!swapped) {
      setActiveIndices(null);
      setSortedIndices(Array.from({ length: n }, (_, i) => i));
      setSortLog('🎉 Array is fully sorted in ascending order!');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg space-y-4">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setMode('stack'); setMessage('Switched to Stack (LIFO).'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mode === 'stack' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Stack (LIFO)
          </button>
          <button
            type="button"
            onClick={() => { setMode('queue'); setMessage('Switched to Queue (FIFO).'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mode === 'queue' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Queue (FIFO)
          </button>
          <button
            type="button"
            onClick={() => setMode('sort')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              mode === 'sort' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Sorting Visualizer
          </button>
        </div>

        <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/70 border border-indigo-800/60 px-2 py-0.5 rounded">
          Interactive DSA Engine
        </span>
      </div>

      {/* STACK / QUEUE VIEW */}
      {mode !== 'sort' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-800 rounded-lg p-1 border border-slate-700">
              <span className="text-xs font-mono text-slate-400 pl-2">Value:</span>
              <input
                type="number"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none"
              />
            </div>

            {mode === 'stack' ? (
              <>
                <button
                  type="button"
                  onClick={handlePush}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Push
                </button>
                <button
                  type="button"
                  onClick={handlePop}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Pop
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEnqueue}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Enqueue (Rear)
                </button>
                <button
                  type="button"
                  onClick={handleDequeue}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Dequeue (Front)
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => { setItems([]); setMessage('Data structure cleared.'); }}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          </div>

          {/* Interactive Memory Visual Canvas */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[180px] flex flex-col justify-end">
            <div className="text-[11px] font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>Memory Allocation: {items.length} / {maxSize} Slots</span>
              <span>
                {mode === 'stack'
                  ? `Top Pointer: ${items.length > 0 ? items.length - 1 : -1}`
                  : `Front: 0 | Rear: ${items.length > 0 ? items.length - 1 : -1}`}
              </span>
            </div>

            {/* Elements container */}
            {mode === 'stack' ? (
              // Vertical Stack
              <div className="flex flex-col-reverse items-center gap-1.5 max-w-xs mx-auto w-full border-b-4 border-indigo-500/80 pb-1">
                {Array.from({ length: maxSize }).map((_, idx) => {
                  const val = items[idx];
                  const isTop = idx === items.length - 1;
                  const isFilled = val !== undefined;
                  const isAnimating = animatingIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`w-full h-10 rounded-lg flex items-center justify-between px-4 font-mono text-xs transition-all duration-300 ${
                        isFilled
                          ? isTop
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md border border-indigo-400'
                            : 'bg-slate-800 text-slate-200 border border-slate-700'
                          : 'border border-dashed border-slate-800 text-slate-600 bg-slate-900/40'
                      } ${isAnimating ? 'scale-105 ring-2 ring-emerald-400' : ''}`}
                    >
                      <span className="text-[10px] text-slate-400">Idx [{idx}]</span>
                      <span className="font-bold text-sm">{isFilled ? val : '—'}</span>
                      <span className="text-[10px] font-bold">
                        {isTop ? 'TOP ◀' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Horizontal Queue
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-4">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider shrink-0">
                  FRONT ➡
                </span>
                {items.length === 0 ? (
                  <div className="text-xs text-slate-500 italic py-3">Queue is currently empty.</div>
                ) : (
                  items.map((val, idx) => {
                    const isFront = idx === 0;
                    const isRear = idx === items.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono border transition-all ${
                          isFront
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                            : isRear
                            ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-md'
                            : 'bg-slate-800 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="font-extrabold text-sm">{val}</span>
                        <span className="text-[9px] text-slate-400">
                          {isFront && isRear ? 'F & R' : isFront ? 'Front' : isRear ? 'Rear' : `[${idx}]`}
                        </span>
                      </div>
                    );
                  })
                )}
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider shrink-0">
                  ➡ REAR
                </span>
              </div>
            )}
          </div>

          {/* Feedback status log */}
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300">
            {message}
          </div>
        </div>
      )}

      {/* SORTING VISUALIZER VIEW */}
      {mode === 'sort' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleStepBubbleSort}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> Step Bubble Sort (Pass)
            </button>
            <button
              type="button"
              onClick={handleResetSort}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" /> Reset Array
            </button>
          </div>

          {/* Bar Chart Visualization */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-end justify-center gap-3 h-52">
            {sortArray.map((val, idx) => {
              const isActive = activeIndices && (activeIndices[0] === idx || activeIndices[1] === idx);
              const isSorted = sortedIndices.includes(idx);
              const heightPct = Math.min(100, Math.max(15, (val / 100) * 100));

              return (
                <div key={idx} className="flex flex-col items-center gap-1 flex-1 max-w-[48px]">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{val}</span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500 shadow-lg shadow-amber-500/50'
                        : isSorted
                        ? 'bg-emerald-500 shadow-sm'
                        : 'bg-indigo-600 hover:bg-indigo-500'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-slate-500">[{idx}]</span>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300 flex items-center justify-between">
            <span>{sortLog}</span>
            <span className="text-slate-400">Total Steps: {sortStep}</span>
          </div>
        </div>
      )}
    </div>
  );
};
