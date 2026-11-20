export type TrackId = 'overview' | 'tenth' | 'intermediate' | 'graduate' | 'vault';

export type TenthTab = 'micro' | 'quiz' | 'papers' | 'solutions';
export type IntermediateTab = 'mastery' | 'mock' | 'papers' | 'doubts';
export type GraduateTab = 'skills' | 'resume' | 'papers' | 'interview';

export interface BookmarkItem {
  id: string;
  track: 'tenth' | 'intermediate' | 'graduate';
  kind: 'paper' | 'doubt' | 'solution' | 'module';
  title: string;
  subtitle: string;
  savedAt: string;
}

export interface MockTestResult {
  id: string;
  examTitle: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeTakenSec: number;
  completedAt: string;
}

export interface UserProgressState {
  completedMicroModules: string[];
  quizXp: number;
  quizBestStreak: number;
  quizzesCompleted: number;
  topicMastery: Record<string, 'unstarted' | 'practicing' | 'mastered'>;
  completedSkillMilestones: string[];
  bookmarks: BookmarkItem[];
  mockHistory: MockTestResult[];
  upvotedDoubts: string[];
}

export interface MicroModule {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
  chapter: string;
  title: string;
  durationMin: number;
  summary: string;
  keyFormula: string;
  conceptSteps: { heading: string; detail: string }[];
  simulationType?: 'ohms-law' | 'quadratic' | 'refraction';
  checkpoint: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  subject: 'Science' | 'Mathematics';
  topic: string;
  difficulty: 'Foundation' | 'Standard' | 'Challenge';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BoardPaper {
  id: string;
  board: 'CBSE' | 'State SSC' | 'ICSE';
  year: number;
  subject: 'Mathematics' | 'Physical Science' | 'Biology' | 'Social Studies';
  title: string;
  durationMin: number;
  maxMarks: number;
  sections: {
    sectionName: string;
    instructions: string;
    questions: {
      qNo: string;
      marks: number;
      prompt: string;
      markingScheme: string;
      modelAnswer: string;
    }[];
  }[];
}

export interface StepSolutionProblem {
  id: string;
  subject: 'Mathematics' | 'Physics' | 'Chemistry';
  chapter: string;
  title: string;
  problemStatement: string;
  hint: string;
  steps: {
    label: string;
    expression: string;
    explanation: string;
  }[];
  finalAnswer: string;
}

export interface IntermediateTopic {
  id: string;
  subject: 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology';
  unit: string;
  title: string;
  eamcetWeightage: number;
  coreConcepts: string[];
  formulas: string[];
}

export interface MockExamQuestion {
  id: string;
  subject: 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology';
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MockExam {
  id: string;
  examType: 'EAMCET Engineering (MPC)' | 'EAMCET Medical/Agri (BiPC)' | 'JEE Main Pattern';
  title: string;
  durationMin: number;
  marksPerCorrect: number;
  negativeMarks: number;
  questions: MockExamQuestion[];
}

export interface PreviousPaper {
  id: string;
  exam: 'TS/AP EAMCET' | 'JEE Main' | 'IPE Board';
  year: number;
  shift: string;
  stream: 'MPC' | 'BiPC';
  totalQuestions: number;
  difficulty: 'Moderate' | 'Moderate-Tough' | 'Balanced';
  subjectBreakdown: { subject: string; percentage: number; topChapters: string }[];
  sampleQuestions: {
    qNo: number;
    subject: string;
    topic: string;
    question: string;
    options: string[];
    correctIndex: number;
    solution: string;
  }[];
}

export interface DoubtReply {
  id: string;
  author: string;
  role: 'Subject Mentor' | 'Peer Scholar';
  createdAt: string;
  body: string;
  formulaBlock?: string;
}

export interface DoubtThread {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology';
  chapter: string;
  title: string;
  studentQuestion: string;
  askedBy: string;
  askedAt: string;
  upvotes: number;
  resolved: boolean;
  replies: DoubtReply[];
}

export interface SkillTrack {
  id: string;
  title: string;
  roleOutcome: string;
  durationWeeks: number;
  coreStack: string[];
  overview: string;
  milestones: {
    id: string;
    week: string;
    title: string;
    deliverable: string;
    skills: string[];
  }[];
  capstoneBrief: {
    title: string;
    requirements: string[];
  };
}

export interface ResumeData {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    gpa: string;
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  projects: {
    name: string;
    stack: string;
    bullets: string[];
  }[];
  skills: string;
}

export interface JobExamPaper {
  id: string;
  exam: 'GATE CS' | 'TCS NQT' | 'Infosys SP' | 'CAT Quant & DILR' | 'SSC CGL';
  year: number;
  title: string;
  durationMin: number;
  cutoffNote: string;
  questions: {
    id: string;
    section: string;
    question: string;
    options: string[];
    correctIndex: number;
    shortcutTip: string;
    solution: string;
  }[];
}

export interface InterviewQuestion {
  id: string;
  track: 'Frontend & Full-Stack' | 'Backend & System Design' | 'Data & Analytics' | 'HR & Behavioral';
  difficulty: 'Junior / Fresher' | 'Mid-Level' | 'High Impact';
  recommendedSec: number;
  prompt: string;
  isBehavioral: boolean;
  rubricCriteria: string[];
  followUps: string[];
  modelAnswer: string;
}
