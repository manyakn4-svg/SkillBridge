import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  X,
  Server,
  ShieldCheck,
  Activity,
  Code,
} from 'lucide-react';
import {
  SUPABASE_URL,
  SUPABASE_SQL_SCHEMA,
  testSupabaseConnection,
} from '../lib/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const { user, supabaseSyncStatus, supabaseLastSynced, supabaseSyncMessage, syncStudentNow, showToast } = useApp();

  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    connected: boolean;
    message: string;
    hasStudentsTable: boolean;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'status' | 'sql' | 'payload'>('status');

  const projectId = 'kanvpgzzjdrlrasdjpdw';

  useEffect(() => {
    if (isOpen) {
      handleTestConnection();
    }
  }, [isOpen]);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    showToast('SQL schema copied to clipboard! Paste in Supabase SQL Editor.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    try {
      const res = await testSupabaseConnection();
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        connected: false,
        message: err.message || 'Connection test failed',
        hasStudentsTable: false,
      });
    } finally {
      setTesting(false);
    }
  };

  const handleManualSync = async () => {
    await syncStudentNow();
    await handleTestConnection();
  };

  if (!isOpen) return null;

  const currentPayload = {
    id: user.id,
    full_name: user.fullName,
    email: user.email,
    college_name: user.collegeName,
    branch: user.branch,
    academic_year: user.academicYear,
    career_goal: user.careerGoal,
    overall_progress: user.overallProgress,
    technical_skills: user.technicalSkills,
    soft_skills: user.softSkills,
    last_login_at: new Date().toISOString(),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Supabase Cloud Database
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Project: <code className="text-emerald-600 dark:text-emerald-400 font-mono">{projectId}</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'status'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Status & Health
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'sql'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            SQL Table Setup Script
          </button>
          <button
            onClick={() => setActiveTab('payload')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'payload'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Synced Record Payload
          </button>
        </div>

        {/* Tab 1: Status */}
        {activeTab === 'status' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Project Endpoint</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200">{SUPABASE_URL}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Target Table</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">public.students</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Audit Log Table</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200">public.student_logins</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Last Synced Event</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {supabaseLastSynced || 'Synced just now'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Sync Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {supabaseSyncStatus === 'synced' ? 'Active & Auto-Saving' : supabaseSyncStatus}
                </span>
              </div>
            </div>

            {/* Test result box */}
            {testResult && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  testResult.connected
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  {testResult.connected ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{testResult.message}</p>
                    {!testResult.hasStudentsTable && testResult.connected && (
                      <p className="mt-1 text-[11px] opacity-90">
                        Tip: Open the <strong>SQL Table Setup Script</strong> tab above, copy the query and execute it in your Supabase SQL Editor.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={handleManualSync}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Save Current Student Data Now</span>
              </button>

              <button
                onClick={handleTestConnection}
                disabled={testing}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
              >
                <Activity className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>{testing ? 'Testing...' : 'Ping Supabase'}</span>
              </button>

              <a
                href={`https://supabase.com/dashboard/project/${projectId}/editor`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ml-auto"
              >
                <span>Supabase Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: SQL */}
        {activeTab === 'sql' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Run this SQL query in your Supabase SQL Editor to initialize the <code className="text-emerald-500 font-mono">students</code> table and RLS policies.
              </p>
              <button
                onClick={handleCopySql}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto border border-slate-800 select-all">
              {SUPABASE_SQL_SCHEMA}
            </pre>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs">
              <strong>Quick 20-second setup in Supabase:</strong>
              <ol className="list-decimal list-inside mt-1 space-y-0.5 text-[11px]">
                <li>Copy the SQL snippet above</li>
                <li>Go to your Supabase project dashboard: <code className="font-mono">kanvpgzzjdrlrasdjpdw</code></li>
                <li>Click <strong>SQL Editor</strong> on the left bar and click <strong>New Query</strong></li>
                <li>Paste the SQL and click <strong>Run</strong></li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 3: Synced Payload */}
        {activeTab === 'payload' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This exact payload is automatically upserted into the <code className="text-emerald-500 font-mono">public.students</code> table whenever the student logs in, signs up, or changes their branch/profile:
            </p>
            <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto border border-slate-800">
              {JSON.stringify(currentPayload, null, 2)}
            </pre>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Automatic sync enabled on student login and branch update.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
