import React, { useState, useRef } from 'react';
import { FlowchartNode, RoadmapFlowchart } from '../data/flowchartData';
import {
  Play,
  Code2,
  Database,
  Cpu,
  Layers,
  Cloud,
  Shield,
  Wrench,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Clock,
  ExternalLink,
  Video,
  X,
  FileCheck2,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckSquare,
  Square,
  HelpCircle,
} from 'lucide-react';

interface FlowchartCanvasProps {
  flowchart: RoadmapFlowchart;
  completedNodeIds: Record<string, boolean>;
  onToggleNode: (nodeId: string, nodeTitle: string) => void;
  onWatchVideos?: (courseId: string) => void;
  language?: string;
}

export const FlowchartCanvas: React.FC<FlowchartCanvasProps> = ({
  flowchart,
  completedNodeIds,
  onToggleNode,
  onWatchVideos,
  language = 'en',
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<FlowchartNode | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  // Calculate metrics
  const totalNodes = flowchart.nodes.length;
  const completedCount = flowchart.nodes.filter(n => !!completedNodeIds[n.id]).length;
  const progressPct = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;

  // Determine node status
  const getNodeStatus = (node: FlowchartNode, index: number): 'completed' | 'in-progress' | 'pending' => {
    if (completedNodeIds[node.id]) return 'completed';
    // If previous node is completed or this is the first node, mark as in-progress
    if (index === 0 || completedNodeIds[flowchart.nodes[index - 1].id]) {
      return 'in-progress';
    }
    return 'pending';
  };

  const renderIcon = (type: string, isCompleted: boolean) => {
    const className = `w-5 h-5 ${isCompleted ? 'text-emerald-400' : 'text-indigo-400'}`;
    switch (type) {
      case 'play':
        return <Play className={className} />;
      case 'code':
        return <Code2 className={className} />;
      case 'database':
        return <Database className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'layers':
        return <Layers className={className} />;
      case 'cloud':
        return <Cloud className={className} />;
      case 'shield':
        return <Shield className={className} />;
      case 'tool':
        return <Wrench className={className} />;
      case 'award':
        return <Award className={className} />;
      case 'check':
        return <CheckCircle2 className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div
      className={`relative rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 overflow-y-auto' : ''
      }`}
    >
      {/* 1. Header & Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
              Interactive Learning Flowchart
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Est: {flowchart.totalEstimatedWeeks}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-white font-heading">
            {flowchart.title}
          </h2>
          <p className="text-xs text-slate-400 line-clamp-1">{flowchart.description}</p>
        </div>

        {/* Progress & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Progress pill */}
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-2.5">
            <div className="text-right">
              <div className="flex items-center gap-1 font-mono text-xs">
                <span className="font-extrabold text-indigo-400">{progressPct}%</span>
                <span className="text-slate-400 text-[10px]">
                  ({completedCount}/{totalNodes} Stages)
                </span>
              </div>
            </div>
            <div className="w-16 bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer font-mono text-xs"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(prev => !prev)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title={isExpanded ? 'Collapse' : 'Expand Fullscreen'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Flowchart Canvas Container */}
      <div
        ref={containerRef}
        className="p-6 sm:p-10 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 min-h-[520px] flex justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"
      >
        <div
          className="transition-transform duration-200 origin-top flex flex-col items-center py-4"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {flowchart.nodes.map((node, idx) => {
            const status = getNodeStatus(node, idx);
            const isCompleted = status === 'completed';
            const isInProgress = status === 'in-progress';
            const isLast = idx === flowchart.nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`group relative w-[320px] sm:w-[420px] p-5 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl select-none ${
                    isCompleted
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-emerald-950/50 hover:border-emerald-400'
                      : isInProgress
                      ? 'bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-indigo-950/60 hover:border-indigo-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-90'
                  }`}
                >
                  {/* Status Indicator Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center font-mono text-[11px] font-bold text-slate-300">
                        {node.stepNumber}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-400">
                        {node.stageName}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <Check className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>In Progress</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-500 bg-slate-800/60">
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Node Title & Subtitle */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-xl border mt-0.5 shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-900/50 border-emerald-700'
                          : 'bg-indigo-950/60 border-indigo-800/60'
                      }`}
                    >
                      {renderIcon(node.iconType, isCompleted)}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isCompleted
                            ? 'text-emerald-200'
                            : 'text-white group-hover:text-indigo-300'
                        }`}
                      >
                        {node.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{node.subtitle}</p>
                    </div>
                  </div>

                  {/* Subtopics Preview */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
                    {node.subtopics.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {sub}
                      </span>
                    ))}
                    {node.subtopics.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-500 px-1">
                        +{node.subtopics.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action row */}
                  <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{node.estimatedDuration}</span>
                    </span>

                    <span className="text-indigo-400 group-hover:text-indigo-300 font-semibold flex items-center gap-1 text-[11px]">
                      <span>View Stage Details</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Connecting Arrow */}
                {!isLast && (
                  <div className="my-2 flex flex-col items-center">
                    <div
                      className={`w-0.5 h-6 transition-colors ${
                        isCompleted ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                    />
                    <ArrowDown
                      className={`w-4 h-4 -mt-1 transition-colors ${
                        isCompleted ? 'text-emerald-500' : 'text-slate-600'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive Node Details Modal / Drawer */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40">
                    Stage {selectedNode.stepNumber}: {selectedNode.stageName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedNode.estimatedDuration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-indigo-300 font-medium">{selectedNode.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 scrollbar-thin scrollbar-thumb-slate-800">
              {/* Concept Overview */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Stage Overview & Learning Objectives
                </span>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {selectedNode.description}
                </p>
              </div>

              {/* Subtopics Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Key Topics & Technical Competencies to Master:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedNode.subtopics.map((topic, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="text-xs">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverable if available */}
              {selectedNode.deliverable && (
                <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-900/60 space-y-1">
                  <span className="text-[11px] font-mono text-indigo-300 uppercase font-bold tracking-wider block">
                    Practical Deliverable:
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {selectedNode.deliverable}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Watch Teaching Videos Action */}
              {selectedNode.linkedCourseId && onWatchVideos && (
                <button
                  type="button"
                  onClick={() => {
                    const cId = selectedNode.linkedCourseId!;
                    setSelectedNode(null);
                    onWatchVideos(cId);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Video className="w-4 h-4 text-white" />
                  <span>Watch Teaching Videos</span>
                </button>
              )}

              {/* Toggle Completed Status */}
              <button
                type="button"
                onClick={() => {
                  onToggleNode(selectedNode.id, selectedNode.title);
                  setSelectedNode(null);
                }}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  completedNodeIds[selectedNode.id]
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                }`}
              >
                {completedNodeIds[selectedNode.id] ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Mark as Incomplete</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Stage as Completed</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
