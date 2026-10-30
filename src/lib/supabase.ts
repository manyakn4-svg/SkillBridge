import { createClient } from '@supabase/supabase-js';
import {
  UserProfile,
  AssessmentResult,
  LabSubmission,
  StudyPlannerPreferences,
  StudyTask,
  CertificateRecord,
  HackathonPersonalRecord,
  LeaderboardEntry,
} from '../types';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://kanvpgzzjdrlrasdjpdw.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TLMnQeAf4o8ZlM8IlcN8PA_uAksq6lG';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseSyncResult {
  success: boolean;
  message: string;
  table?: string;
  details?: any;
}

/**
 * SQL Schema script that user can run in Supabase SQL editor to create all tables
 */
export const SUPABASE_SQL_SCHEMA = `-- SkillBridge Database Schema for Supabase
-- Run this in your Supabase Dashboard -> SQL Editor if not already created

-- 1. Students / Profiles Table
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    college_name TEXT,
    branch TEXT,
    academic_year TEXT,
    career_goal TEXT,
    bio TEXT,
    overall_progress INTEGER DEFAULT 0,
    technical_skills JSONB DEFAULT '[]'::jsonb,
    soft_skills JSONB DEFAULT '[]'::jsonb,
    last_login_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Student Logins Activity Log
CREATE TABLE IF NOT EXISTS public.student_logins (
    id BIGSERIAL PRIMARY KEY,
    student_email TEXT NOT NULL,
    student_name TEXT,
    branch TEXT,
    academic_year TEXT,
    college_name TEXT,
    login_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Assessment Results Table
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id TEXT PRIMARY KEY,
    student_email TEXT NOT NULL,
    test_type TEXT,
    category_or_subject TEXT,
    score INTEGER,
    total_questions INTEGER,
    percentage NUMERIC,
    time_spent_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Student Roadmap Progress Table
CREATE TABLE IF NOT EXISTS public.student_roadmap_progress (
    id TEXT PRIMARY KEY,
    student_email TEXT NOT NULL,
    branch TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    completed_task_ids JSONB DEFAULT '{}'::jsonb,
    completed_tasks_count INTEGER DEFAULT 0,
    total_tasks_count INTEGER DEFAULT 0,
    completion_percentage INTEGER DEFAULT 0,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Virtual Lab Submissions Table
CREATE TABLE IF NOT EXISTS public.student_lab_submissions (
    id TEXT PRIMARY KEY,
    student_email TEXT NOT NULL,
    lab_id TEXT NOT NULL,
    branch TEXT NOT NULL,
    experiment_title TEXT NOT NULL,
    mcq_score INTEGER DEFAULT 0,
    max_score INTEGER DEFAULT 0,
    observations TEXT,
    inputs_used JSONB DEFAULT '{}'::jsonb,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Personalized Study Planner Table
CREATE TABLE IF NOT EXISTS public.student_study_planner (
    id TEXT PRIMARY KEY,
    student_email TEXT UNIQUE NOT NULL,
    preferences JSONB DEFAULT '{}'::jsonb,
    tasks JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Student Uploaded Certificates Table
CREATE TABLE IF NOT EXISTS public.student_certificates (
    id TEXT PRIMARY KEY,
    student_email TEXT NOT NULL,
    title TEXT NOT NULL,
    issuing_organization TEXT NOT NULL,
    issue_date TEXT,
    category TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    file_name TEXT,
    credential_id TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Hackathon Records & Projects Table
CREATE TABLE IF NOT EXISTS public.student_hackathon_records (
    id TEXT PRIMARY KEY,
    student_email TEXT NOT NULL,
    hackathon_name TEXT NOT NULL,
    event_date TEXT,
    mode TEXT DEFAULT 'Online',
    team_name TEXT,
    team_members JSONB DEFAULT '[]'::jsonb,
    project_title TEXT,
    project_description TEXT,
    github_url TEXT,
    demo_url TEXT,
    ppt_url TEXT,
    achievement_award TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Leaderboard Table
CREATE TABLE IF NOT EXISTS public.student_leaderboard (
    id TEXT PRIMARY KEY,
    student_email TEXT UNIQUE NOT NULL,
    student_name TEXT NOT NULL,
    branch TEXT,
    academic_year TEXT,
    total_points INTEGER DEFAULT 0,
    rank INTEGER DEFAULT 1,
    badges_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_lab_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_study_planner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_hackathon_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anonymous & authenticated reads/writes for SkillBridge app
CREATE POLICY "Allow public all access on students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on student_logins" ON public.student_logins FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on assessment_results" ON public.assessment_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on student_roadmap_progress" ON public.student_roadmap_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on student_lab_submissions" ON public.student_lab_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on student_study_planner" ON public.student_study_planner FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on student_certificates" ON public.student_certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on student_hackathon_records" ON public.student_hackathon_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on student_leaderboard" ON public.student_leaderboard FOR ALL USING (true) WITH CHECK (true);
`;

/**
 * Automatically sync student profile to Supabase database.
 * Attempts to upsert into 'students', with fallback to 'profiles'.
 */
export async function syncStudentToSupabase(
  user: UserProfile,
  eventType: 'login' | 'signup' | 'profile_update' | 'branch_change' = 'login'
): Promise<SupabaseSyncResult> {
  const timestamp = new Date().toISOString();

  const studentPayload = {
    id: user.id || `usr-${Date.now()}`,
    full_name: user.fullName || 'Engineering Student',
    email: user.email.toLowerCase().trim(),
    college_name: user.collegeName || '',
    branch: user.branch || 'CSE',
    academic_year: user.academicYear || '3rd Year',
    career_goal: user.careerGoal || 'Software Engineer',
    bio: user.bio || '',
    overall_progress: Number(user.overallProgress || 0),
    technical_skills: user.technicalSkills || [],
    soft_skills: user.softSkills || [],
    last_login_at: timestamp,
    updated_at: timestamp,
  };

  try {
    // 1. Try upserting to 'students' table
    const { data, error } = await supabase
      .from('students')
      .upsert(studentPayload, { onConflict: 'email' })
      .select();

    if (error) {
      // If table doesn't exist or RLS issue, try secondary table name 'profiles'
      console.warn('Supabase sync to "students" returned error:', error.message);
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .upsert(
          {
            id: studentPayload.id,
            full_name: studentPayload.full_name,
            email: studentPayload.email,
            college_name: studentPayload.college_name,
            branch: studentPayload.branch,
            academic_year: studentPayload.academic_year,
            updated_at: timestamp,
          },
          { onConflict: 'email' }
        )
        .select();

      if (profileError) {
        console.warn('Supabase sync to "profiles" also returned error:', profileError.message);
        return {
          success: false,
          message: `Supabase table not found or restricted. Please create table with SQL snippet: ${error.message}`,
          details: error,
        };
      }

      // Record login activity if available
      try {
        await supabase.from('student_logins').insert({
          student_email: studentPayload.email,
          student_name: studentPayload.full_name,
          branch: studentPayload.branch,
          academic_year: studentPayload.academic_year,
          college_name: studentPayload.college_name,
          login_at: timestamp,
        });
      } catch (logErr) {
        // non-blocking
      }

      return {
        success: true,
        table: 'profiles',
        message: 'Successfully saved to Supabase (profiles table)',
        details: profileData,
      };
    }

    // Record login activity in 'student_logins' table for audit trail
    if (eventType === 'login' || eventType === 'signup') {
      try {
        await supabase.from('student_logins').insert({
          student_email: studentPayload.email,
          student_name: studentPayload.full_name,
          branch: studentPayload.branch,
          academic_year: studentPayload.academic_year,
          college_name: studentPayload.college_name,
          login_at: timestamp,
        });
      } catch (err) {
        // Optional table, don't fail main sync
      }
    }

    return {
      success: true,
      table: 'students',
      message: `Student data successfully saved to Supabase (students table)!`,
      details: data,
    };
  } catch (err: any) {
    console.error('Network or client error during Supabase sync:', err);
    return {
      success: false,
      message: err.message || 'Unknown network error connecting to Supabase',
      details: err,
    };
  }
}

/**
 * Fetch student profile from Supabase by email
 */
export async function fetchStudentFromSupabase(email: string): Promise<UserProfile | null> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (error || !data) {
      // Try fallback to profiles table
      const { data: profData } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (profData) {
        return {
          id: profData.id || `usr-${Date.now()}`,
          fullName: profData.full_name || profData.name || 'Student',
          email: profData.email,
          collegeName: profData.college_name || '',
          branch: profData.branch || 'CSE',
          academicYear: profData.academic_year || '3rd Year',
          careerGoal: profData.career_goal || 'Software Engineer',
          bio: profData.bio || '',
          overallProgress: Number(profData.overall_progress || 60),
          technicalSkills: profData.technical_skills || [],
          softSkills: profData.soft_skills || [],
        };
      }
      return null;
    }

    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      collegeName: data.college_name || '',
      branch: data.branch || 'CSE',
      academicYear: data.academic_year || '3rd Year',
      careerGoal: data.career_goal || 'Software Engineer',
      bio: data.bio || '',
      overallProgress: Number(data.overall_progress || 60),
      technicalSkills: Array.isArray(data.technical_skills) ? data.technical_skills : [],
      softSkills: Array.isArray(data.soft_skills) ? data.soft_skills : [],
    };
  } catch (err) {
    console.error('Failed to fetch student from Supabase:', err);
    return null;
  }
}

/**
 * Save assessment results directly to Supabase
 */
export async function syncAssessmentToSupabase(
  email: string,
  result: AssessmentResult
): Promise<void> {
  try {
    await supabase.from('assessment_results').insert({
      id: result.id,
      student_email: email.toLowerCase().trim(),
      test_type: result.type,
      category_or_subject: result.categoryOrSubject,
      score: result.score,
      total_questions: result.totalQuestions,
      percentage: result.percentage,
      time_spent_seconds: result.timeSpentSeconds,
    });
  } catch (err) {
    console.warn('Could not save assessment result to Supabase:', err);
  }
}

/**
 * Test connectivity to user's Supabase project
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  hasStudentsTable: boolean;
}> {
  try {
    // Ping with a fast lightweight query
    const { data, error } = await supabase.from('students').select('id').limit(1);

    if (error) {
      if (error.code === '42P01' || error.message.includes('relation "public.students" does not exist')) {
        return {
          connected: true,
          message: 'Connected to Supabase project, but "students" table has not been created yet.',
          hasStudentsTable: false,
        };
      }
      return {
        connected: false,
        message: `Supabase connection response: ${error.message}`,
        hasStudentsTable: false,
      };
    }

    return {
      connected: true,
      message: `Connected successfully to Supabase (kanvpgzzjdrlrasdjpdw.supabase.co)! Table "students" is ready.`,
      hasStudentsTable: true,
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Connection failed: ${err.message || 'Unknown error'}`,
      hasStudentsTable: false,
    };
  }
}

/**
 * Save student roadmap task progress separately in Supabase
 */
export async function syncRoadmapProgressToSupabase(
  email: string,
  branch: string,
  year: string,
  completedTaskIds: Record<string, boolean>,
  percentage: number
): Promise<SupabaseSyncResult> {
  const timestamp = new Date().toISOString();
  const cleanEmail = email.toLowerCase().trim();
  const recordId = `rm-${cleanEmail.replace(/[^a-z0-9]/g, '_')}-${branch.toLowerCase().replace(/[^a-z0-9]/g, '_')}-${year.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  const completedCount = Object.values(completedTaskIds).filter(Boolean).length;

  const payload = {
    id: recordId,
    student_email: cleanEmail,
    branch,
    academic_year: year,
    completed_task_ids: completedTaskIds,
    completed_tasks_count: completedCount,
    completion_percentage: percentage,
    last_updated_at: timestamp,
  };

  try {
    const { data, error } = await supabase
      .from('student_roadmap_progress')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      // Fallback: Also try updating overall_progress in students table so it's always captured
      try {
        await supabase
          .from('students')
          .update({
            overall_progress: percentage,
            updated_at: timestamp,
          })
          .eq('email', cleanEmail);
      } catch (fallbackErr) {
        // silent
      }

      return {
        success: false,
        message: `Roadmap table not available or restricted: ${error.message}. Progress cached locally.`,
        details: error,
      };
    }

    // Also update student's overall_progress in students table
    try {
      await supabase
        .from('students')
        .update({
          overall_progress: percentage,
          updated_at: timestamp,
        })
        .eq('email', cleanEmail);
    } catch (e) {
      // silent
    }

    return {
      success: true,
      table: 'student_roadmap_progress',
      message: `Roadmap progress successfully saved to Supabase!`,
      details: data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Failed to save roadmap progress to Supabase',
      details: err,
    };
  }
}

/**
 * Fetch student roadmap progress from Supabase
 */
export async function fetchRoadmapProgressFromSupabase(
  email: string,
  branch?: string,
  year?: string
): Promise<Record<string, boolean> | null> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    let query = supabase
      .from('student_roadmap_progress')
      .select('completed_task_ids')
      .eq('student_email', cleanEmail);

    if (branch && year) {
      const recordId = `rm-${cleanEmail.replace(/[^a-z0-9]/g, '_')}-${branch.toLowerCase().replace(/[^a-z0-9]/g, '_')}-${year.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      query = query.eq('id', recordId);
    }

    const { data, error } = await query.maybeSingle();

    if (error || !data || !data.completed_task_ids) {
      return null;
    }

    return data.completed_task_ids as Record<string, boolean>;
  } catch (err) {
    return null;
  }
}

/**
 * 5. Virtual Lab Submissions Sync
 */
export async function syncLabSubmissionToSupabase(
  sub: LabSubmission
): Promise<SupabaseSyncResult> {
  try {
    const { data, error } = await supabase
      .from('student_lab_submissions')
      .upsert(
        {
          id: sub.id,
          student_email: sub.studentEmail.toLowerCase().trim(),
          lab_id: sub.labId,
          branch: sub.branch,
          experiment_title: sub.experimentTitle,
          mcq_score: sub.mcqScore,
          max_score: sub.maxScore,
          observations: sub.observations,
          inputs_used: sub.inputsUsed || {},
          submitted_at: sub.submittedAt,
        },
        { onConflict: 'id' }
      )
      .select();

    if (error) {
      return { success: false, message: error.message, details: error };
    }
    return { success: true, message: 'Lab submission saved to Supabase!', details: data };
  } catch (err: any) {
    return { success: false, message: err.message, details: err };
  }
}

export async function fetchLabSubmissionsFromSupabase(
  email: string
): Promise<LabSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('student_lab_submissions')
      .select('*')
      .eq('student_email', email.toLowerCase().trim())
      .order('submitted_at', { ascending: false });

    if (error || !data) return [];
    return data.map((d: any) => ({
      id: d.id,
      labId: d.lab_id,
      experimentTitle: d.experiment_title,
      branch: d.branch,
      studentEmail: d.student_email,
      submittedAt: d.submitted_at,
      mcqScore: d.mcq_score,
      maxScore: d.max_score,
      observations: d.observations || '',
      inputsUsed: d.inputs_used || {},
    }));
  } catch {
    return [];
  }
}

/**
 * 6. Personalized Study Planner Sync
 */
export async function syncStudyPlannerToSupabase(
  email: string,
  preferences: StudyPlannerPreferences,
  tasks: StudyTask[]
): Promise<SupabaseSyncResult> {
  const cleanEmail = email.toLowerCase().trim();
  const id = `sp-${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;

  try {
    const { data, error } = await supabase
      .from('student_study_planner')
      .upsert(
        {
          id,
          student_email: cleanEmail,
          preferences,
          tasks,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select();

    if (error) {
      return { success: false, message: error.message, details: error };
    }
    return { success: true, message: 'Study timetable saved to Supabase!', details: data };
  } catch (err: any) {
    return { success: false, message: err.message, details: err };
  }
}

export async function fetchStudyPlannerFromSupabase(
  email: string
): Promise<{ preferences: StudyPlannerPreferences | null; tasks: StudyTask[] | null }> {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const id = `sp-${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;
    const { data, error } = await supabase
      .from('student_study_planner')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) return { preferences: null, tasks: null };
    return {
      preferences: data.preferences as StudyPlannerPreferences,
      tasks: (data.tasks || []) as StudyTask[],
    };
  } catch {
    return { preferences: null, tasks: null };
  }
}

/**
 * 7. Student Certificates Sync
 */
export async function syncCertificateToSupabase(
  cert: CertificateRecord
): Promise<SupabaseSyncResult> {
  try {
    const { data, error } = await supabase
      .from('student_certificates')
      .upsert(
        {
          id: cert.id,
          student_email: cert.studentEmail.toLowerCase().trim(),
          title: cert.title,
          issuing_organization: cert.issuingOrganization,
          issue_date: cert.issueDate,
          category: cert.category,
          description: cert.description || '',
          file_url: cert.fileUrl || '',
          file_name: cert.fileName || '',
          credential_id: cert.credentialId || '',
          uploaded_at: cert.uploadedAt,
        },
        { onConflict: 'id' }
      )
      .select();

    if (error) {
      return { success: false, message: error.message, details: error };
    }
    return { success: true, message: 'Certificate saved to Supabase!', details: data };
  } catch (err: any) {
    return { success: false, message: err.message, details: err };
  }
}

export async function deleteCertificateFromSupabase(
  certId: string
): Promise<SupabaseSyncResult> {
  try {
    const { error } = await supabase
      .from('student_certificates')
      .delete()
      .eq('id', certId);

    if (error) return { success: false, message: error.message };
    return { success: true, message: 'Certificate removed from Supabase.' };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function fetchCertificatesFromSupabase(
  email: string
): Promise<CertificateRecord[]> {
  try {
    const { data, error } = await supabase
      .from('student_certificates')
      .select('*')
      .eq('student_email', email.toLowerCase().trim())
      .order('uploaded_at', { ascending: false });

    if (error || !data) return [];
    return data.map((d: any) => ({
      id: d.id,
      studentEmail: d.student_email,
      title: d.title,
      issuingOrganization: d.issuing_organization,
      issueDate: d.issue_date,
      category: d.category,
      description: d.description || '',
      fileUrl: d.file_url || '',
      fileName: d.file_name || '',
      credentialId: d.credential_id || '',
      uploadedAt: d.uploaded_at,
    }));
  } catch {
    return [];
  }
}

/**
 * 8. Hackathon Records Sync
 */
export async function syncHackathonRecordToSupabase(
  record: HackathonPersonalRecord
): Promise<SupabaseSyncResult> {
  try {
    const { data, error } = await supabase
      .from('student_hackathon_records')
      .upsert(
        {
          id: record.id,
          student_email: record.studentEmail.toLowerCase().trim(),
          hackathon_name: record.hackathonName,
          event_date: record.eventDate,
          mode: record.mode,
          team_name: record.teamName,
          team_members: record.teamMembers,
          project_title: record.projectTitle,
          project_description: record.projectDescription,
          github_url: record.githubUrl || '',
          demo_url: record.demoUrl || '',
          ppt_url: record.pptUrl || '',
          achievement_award: record.achievementAward || 'Participant',
          created_at: record.createdAt,
        },
        { onConflict: 'id' }
      )
      .select();

    if (error) return { success: false, message: error.message };
    return { success: true, message: 'Hackathon record saved to Supabase!', details: data };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function fetchHackathonRecordsFromSupabase(
  email: string
): Promise<HackathonPersonalRecord[]> {
  try {
    const { data, error } = await supabase
      .from('student_hackathon_records')
      .select('*')
      .eq('student_email', email.toLowerCase().trim())
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map((d: any) => ({
      id: d.id,
      studentEmail: d.student_email,
      hackathonName: d.hackathon_name,
      eventDate: d.event_date,
      mode: d.mode,
      teamName: d.team_name,
      teamMembers: d.team_members || [],
      projectTitle: d.project_title,
      projectDescription: d.project_description,
      githubUrl: d.github_url,
      demoUrl: d.demo_url,
      pptUrl: d.ppt_url,
      achievementAward: d.achievement_award,
      createdAt: d.created_at,
    }));
  } catch {
    return [];
  }
}

/**
 * 9. Leaderboard Sync & Fetch
 */
export async function syncLeaderboardEntryToSupabase(
  entry: LeaderboardEntry
): Promise<void> {
  try {
    await supabase.from('student_leaderboard').upsert(
      {
        id: entry.id,
        student_email: entry.studentEmail?.toLowerCase().trim() || entry.id,
        student_name: entry.studentName,
        branch: entry.branch,
        academic_year: entry.academicYear,
        total_points: entry.totalPoints,
        rank: entry.rank,
        badges_count: entry.badgesCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );
  } catch {
    // Non-blocking
  }
}

export async function fetchLeaderboardFromSupabase(): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase
      .from('student_leaderboard')
      .select('*')
      .order('total_points', { ascending: false });

    if (error || !data || data.length === 0) return [];
    return data.map((d: any, index: number) => ({
      id: d.id,
      studentName: d.student_name,
      studentEmail: d.student_email,
      branch: d.branch,
      academicYear: d.academic_year,
      totalPoints: d.total_points,
      rank: index + 1,
      badgesCount: d.badges_count || 0,
      weeklyPoints: Math.round(d.total_points * 0.2),
      monthlyPoints: Math.round(d.total_points * 0.45),
    }));
  } catch {
    return [];
  }
}


