import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EngineeringBranch, AcademicYear } from '../types';
import {
  UserCircle,
  GraduationCap,
  Mail,
  School,
  Target,
  FileCheck2,
  Milestone,
  Edit3,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Award,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { t, user, updateProfile, assessmentHistory } = useApp();

  const [isEditing, setIsEditing] = useState(false);

  // Editable Form fields
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [collegeName, setCollegeName] = useState(user.collegeName);
  const [branch, setBranch] = useState<EngineeringBranch>(user.branch);
  const [academicYear, setAcademicYear] = useState<AcademicYear>(user.academicYear);
  const [careerGoal, setCareerGoal] = useState(user.careerGoal);
  const [bio, setBio] = useState(user.bio);

  // New Skill add state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newSkillRating, setNewSkillRating] = useState(75);

  const [newSoftSkill, setNewSoftSkill] = useState('');

  const branches: EngineeringBranch[] = [
    'CSE',
    'ISE',
    'AI & DS',
    'ECE',
    'EEE',
    'Mechanical',
    'Civil',
  ];
  const years: AcademicYear[] = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      collegeName,
      branch,
      academicYear,
      careerGoal,
      bio,
    });
    setIsEditing(false);
  };

  const handleAddTechnicalSkill = () => {
    if (!newSkillName.trim()) return;
    const updated = [
      ...user.technicalSkills,
      { name: newSkillName.trim(), level: newSkillLevel, rating: Number(newSkillRating) },
    ];
    updateProfile({ technicalSkills: updated });
    setNewSkillName('');
  };

  const handleRemoveTechnicalSkill = (name: string) => {
    const updated = user.technicalSkills.filter(s => s.name !== name);
    updateProfile({ technicalSkills: updated });
  };

  const handleAddSoftSkill = () => {
    if (!newSoftSkill.trim()) return;
    const updated = [...user.softSkills, newSoftSkill.trim()];
    updateProfile({ softSkills: updated });
    setNewSoftSkill('');
  };

  const handleRemoveSoftSkill = (skill: string) => {
    const updated = user.softSkills.filter(s => s !== skill);
    updateProfile({ softSkills: updated });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg border border-indigo-400/30">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-indigo-900/60 border border-indigo-700/50 text-[10px] font-mono font-semibold text-indigo-300 mb-1">
                {user.branch} · {user.academicYear}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-heading">
                {user.fullName}
              </h1>
              <p className="text-xs text-slate-300">
                {user.email} · {user.collegeName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : t.editProfile}</span>
          </button>
        </div>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <form
          onSubmit={handleSaveProfile}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-lg space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.editProfile} Details
            </h2>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{t.saveChanges}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                College / University
              </label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={e => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value as EngineeringBranch)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  {branches.map(b => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Academic Year
                </label>
                <select
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value as AcademicYear)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  {years.map(y => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Target Career Goal
              </label>
              <input
                type="text"
                required
                value={careerGoal}
                onChange={e => setCareerGoal(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Student Biography / Professional Summary
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </form>
      )}

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic Summary & Career Goal */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Academic Information
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-mono text-[11px]">
                  College / Institute
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {user.collegeName}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-mono text-[11px]">
                    Discipline
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {user.branch}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-mono text-[11px]">
                    Current Year
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {user.academicYear}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-mono text-[11px]">
                  Target Career Role
                </span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {user.careerGoal}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block font-mono text-[11px]">
                  Biography
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                  {user.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Soft Skills & Leadership
              </h2>
            </div>

            <div className="space-y-2">
              {user.softSkills.map(skill => (
                <div
                  key={skill}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs"
                >
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSoftSkill(skill)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add soft skill */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                value={newSoftSkill}
                onChange={e => setNewSoftSkill(e.target.value)}
                placeholder="Add soft skill..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddSoftSkill}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Technical Skills & Assessment History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Technical Skills Manager */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Technical Skills & Verified Ratings
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Scores calculated from assessment performance and project implementations
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {user.technicalSkills.map(skill => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        · {skill.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        {skill.rating}%
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnicalSkill(skill.name)}
                        className="text-slate-400 hover:text-rose-500"
                        title="Remove skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${skill.rating}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add new technical skill */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                placeholder="Skill name (e.g. Kotlin)"
                className="sm:col-span-2 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as any)}
                className="px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="button"
                onClick={handleAddTechnicalSkill}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>

          {/* Assessment History Timeline */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-500" />
              <span>Assessment & Test History</span>
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {assessmentHistory.map(res => (
                <div key={res.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {res.categoryOrSubject}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {res.type}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {res.date} · Score: {res.score}/{res.totalQuestions}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                      {res.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
