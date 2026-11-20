import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { TrackId, UserProgressState } from '../types';
import { ResilientImage } from './ResilientImage';

interface OverviewHubProps {
  progress: UserProgressState;
  onEnterTrack: (track: TrackId, subTab?: string) => void;
}

export const OverviewHub: React.FC<OverviewHubProps> = ({ progress, onEnterTrack }) => {
  const tracks = [
    {
      id: 'tenth' as TrackId,
      kicker: 'Class 10 · Board Foundations',
      title: '10th Grade Mastery',
      description:
        'Five-minute interactive science & math micro-lessons, streak-based quizzes, board paper archives, and step-by-step problem breakdowns.',
      image: '/src/assets/images/track_tenth_foundation_1795145960536.jpg',
      alt: 'Geometric prism refraction, trigonometric triangles, and electrical circuit illustration',
      ctaLabel: 'Open 10th Grade',
      quickLinks: [
        { label: 'Micro-Learning & Simulators', tab: 'micro' },
        { label: 'Gamified Quiz Sprint', tab: 'quiz' },
        { label: 'Past Board Papers', tab: 'papers' },
        { label: 'Step-by-Step Solutions', tab: 'solutions' },
      ],
    },
    {
      id: 'intermediate' as TrackId,
      kicker: 'Classes 11–12 · MPC & BiPC',
      title: 'Intermediate & EAMCET',
      description:
        'High-weightage syllabus mastery, full CBT mock tests for EAMCET and JEE, shift-wise previous papers, and structured mentor doubt clearing.',
      image: '/src/assets/images/track_intermediate_stem_1795145960423.jpg',
      alt: 'Wave interference optics, vector calculus planes, and molecular orbitals illustration',
      ctaLabel: 'Open Intermediate',
      quickLinks: [
        { label: 'Subject-Wise Mastery', tab: 'mastery' },
        { label: 'EAMCET Mock CBT', tab: 'mock' },
        { label: 'Previous Question Papers', tab: 'papers' },
        { label: 'Doubt-Clearing Desk', tab: 'doubts' },
      ],
    },
    {
      id: 'graduate' as TrackId,
      kicker: 'University & Placement Readiness',
      title: 'Graduate Career Studio',
      description:
        'Industry skill roadmaps, live ATS-checked resume builder with PDF export, job exam archives, and timed mock interview practice.',
      image: '/src/assets/images/track_graduate_career_1795145960364.jpg',
      alt: 'Modern engineering studio desk with technical blueprints and keyboard',
      ctaLabel: 'Open Graduate Track',
      quickLinks: [
        { label: 'Industry Skill Tracks', tab: 'skills' },
        { label: 'ATS Resume Builder', tab: 'resume' },
        { label: 'Job Exam Past Papers', tab: 'papers' },
        { label: 'Mock Interview Studio', tab: 'interview' },
      ],
    },
  ];

  const masteredCount = Object.values(progress.topicMastery).filter(
    (status) => status === 'mastered'
  ).length;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium text-sky-700 tracking-wide">
                Structured Academic to Career Continuum
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight text-balance">
                One workspace from 10th boards to EAMCET ranks and graduate placements.
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Select your current academic stage to unlock interactive concept simulators,
                timed competitive exam engines, step-by-step derivations, and career preparation tools.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onEnterTrack('tenth', 'micro')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                Start 10th Grade Prep
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onEnterTrack('intermediate', 'mock')}
                className="px-5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Launch EAMCET Mock
              </button>
              <button
                type="button"
                onClick={() => onEnterTrack('graduate', 'resume')}
                className="px-5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Build Graduate Resume
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-5">
            <div>
              <h2 className="font-display text-base font-semibold text-slate-900">
                Your Active Learning Snapshot
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Progress saves automatically in this browser across all three stages.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">10th Quiz XP</div>
                <div className="font-mono text-2xl font-semibold text-slate-900 tabular-nums mt-1">
                  {progress.quizXp}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Micro Modules</div>
                <div className="font-mono text-2xl font-semibold text-slate-900 tabular-nums mt-1">
                  {progress.completedMicroModules.length} / 6
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Topics Mastered</div>
                <div className="font-mono text-2xl font-semibold text-slate-900 tabular-nums mt-1">
                  {masteredCount} / 8
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Skill Milestones</div>
                <div className="font-mono text-2xl font-semibold text-slate-900 tabular-nums mt-1">
                  {progress.completedSkillMilestones.length} / 14
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
              <span>{progress.bookmarks.length} saved items in Study Vault</span>
              <button
                type="button"
                onClick={() => onEnterTrack('vault')}
                className="font-semibold text-sky-700 hover:text-sky-800 whitespace-nowrap"
              >
                View Study Vault →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Stage Workspace Cards */}
      <section aria-labelledby="stages-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 id="stages-heading" className="font-display text-2xl font-bold text-slate-900">
              01. Choose Your Educational Stage
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Each track includes dedicated tools tailored to board exams, entrance tests, or technical hiring.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {tracks.map((track) => (
            <article
              key={track.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-slate-100 border-b border-slate-200 overflow-hidden">
                  <ResilientImage
                    src={track.image}
                    alt={track.alt}
                    fallbackTitle={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-xs font-medium text-slate-500">{track.kicker}</div>
                    <h3 className="font-display text-xl font-bold text-slate-900">{track.title}</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{track.description}</p>

                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {track.quickLinks.map((link) => (
                      <li key={link.tab}>
                        <button
                          type="button"
                          onClick={() => onEnterTrack(track.id, link.tab)}
                          className="w-full flex items-center justify-between text-left text-sm text-slate-700 hover:text-sky-700 py-1 group transition-colors"
                        >
                          <span className="inline-flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                            <span>{link.label}</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-700 transition-colors shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onEnterTrack(track.id)}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>{track.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
