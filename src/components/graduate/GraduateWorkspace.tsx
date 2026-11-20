import React, { useState } from 'react';
import { Bookmark, CheckCircle2, CheckSquare, Eye, Square } from 'lucide-react';
import { GRADUATE_SKILL_TRACKS, JOB_EXAM_PAPERS } from '../../data/graduateData';
import { BookmarkItem, GraduateTab, UserProgressState } from '../../types';
import { MockInterviewView } from './MockInterviewView';
import { ResumeBuilderView } from './ResumeBuilderView';

interface GraduateWorkspaceProps {
  activeTab: GraduateTab;
  onTabChange: (tab: GraduateTab) => void;
  progress: UserProgressState;
  onToggleSkillMilestone: (milestoneId: string) => void;
  onToggleBookmark: (item: BookmarkItem) => void;
}

export const GraduateWorkspace: React.FC<GraduateWorkspaceProps> = ({
  activeTab,
  onTabChange,
  progress,
  onToggleSkillMilestone,
  onToggleBookmark,
}) => {
  const [selectedSkillId, setSelectedSkillId] = useState(GRADUATE_SKILL_TRACKS[0].id);

  // Job Exam Papers state
  const [examFilter, setExamFilter] = useState<
    'All' | 'GATE CS' | 'TCS NQT' | 'Infosys SP' | 'CAT Quant & DILR'
  >('All');
  const [selectedJobPaperId, setSelectedJobPaperId] = useState(JOB_EXAM_PAPERS[0].id);
  const [jobAnswers, setJobAnswers] = useState<Record<string, number>>({});
  const [jobRevealed, setJobRevealed] = useState<Record<string, boolean>>({});

  const selectedTrack =
    GRADUATE_SKILL_TRACKS.find((t) => t.id === selectedSkillId) ?? GRADUATE_SKILL_TRACKS[0];

  const filteredJobPapers =
    examFilter === 'All'
      ? JOB_EXAM_PAPERS
      : JOB_EXAM_PAPERS.filter((p) => p.exam === examFilter);
  const selectedJobPaper =
    filteredJobPapers.find((p) => p.id === selectedJobPaperId) ??
    filteredJobPapers[0] ??
    JOB_EXAM_PAPERS[0];

  const isBookmarked = (id: string) => progress.bookmarks.some((b) => b.id === id);

  const totalMilestones = GRADUATE_SKILL_TRACKS.reduce(
    (acc, t) => acc + t.milestones.length,
    0
  );

  const tabs: { id: GraduateTab; label: string }[] = [
    { id: 'skills', label: 'Industry Skill Tracks' },
    { id: 'resume', label: 'Resume Builder' },
    { id: 'papers', label: 'Job Exam Past Papers' },
    { id: 'interview', label: 'Mock Interview Studio' },
  ];

  return (
    <div className="space-y-8">
      {/* Stage Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-sky-700">
              Graduates · Industry Readiness, Placements & Higher Studies
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Graduate Career & Placement Studio
            </h1>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <div>
              Milestones Completed:{' '}
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {progress.completedSkillMilestones.length}/{totalMilestones}
              </span>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              Job Archives:{' '}
              <span className="font-mono font-semibold text-sky-700 tabular-nums">
                {JOB_EXAM_PAPERS.length} Exams
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl w-fit" role="tablist">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: INDUSTRY-RELEVANT SKILL TRACKS */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 space-y-3">
            {GRADUATE_SKILL_TRACKS.map((track) => {
              const active = track.id === selectedTrack.id;
              const done = track.milestones.filter((m) =>
                progress.completedSkillMilestones.includes(m.id)
              ).length;
              const pct = Math.round((done / track.milestones.length) * 100);

              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setSelectedSkillId(track.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-colors space-y-2.5 ${
                    active
                      ? 'bg-sky-50 border-sky-200'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{track.durationWeeks} Weeks</span>
                    <span className="font-mono font-semibold text-slate-800 tabular-nums">
                      {pct}%
                    </span>
                  </div>
                  <div className="font-display font-bold text-base text-slate-900">
                    {track.title}
                  </div>
                  <div className="text-xs text-slate-600">{track.roleOutcome}</div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-700" style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </aside>

          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="text-xs text-slate-500">
                Target Role: {selectedTrack.roleOutcome} · {selectedTrack.durationWeeks}-Week Sprint
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                {selectedTrack.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedTrack.overview}</p>
              <div className="text-xs font-mono text-sky-800 pt-1">
                Core Stack: {selectedTrack.coreStack.join(' · ')}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-slate-900">
                Weekly Hands-On Deliverables
              </h3>
              {selectedTrack.milestones.map((ms) => {
                const isDone = progress.completedSkillMilestones.includes(ms.id);
                return (
                  <div
                    key={ms.id}
                    className={`border rounded-xl p-4 transition-colors ${
                      isDone ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono text-slate-500">
                          {ms.week} · {ms.skills.join(' / ')}
                        </div>
                        <div className="font-semibold text-sm text-slate-900">{ms.title}</div>
                        <p className="text-xs sm:text-sm text-slate-600">{ms.deliverable}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onToggleSkillMilestone(ms.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border shrink-0 transition-colors ${
                          isDone
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {isDone ? (
                          <CheckSquare className="w-3.5 h-3.5" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                        {isDone ? 'Completed' : 'Mark Done'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Capstone Project Brief */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="text-xs font-semibold text-sky-700">Portfolio Capstone Brief</div>
              <h4 className="font-display text-base font-bold text-slate-900">
                {selectedTrack.capstoneBrief.title}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {selectedTrack.capstoneBrief.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: RESUME BUILDER */}
      {activeTab === 'resume' && <ResumeBuilderView />}

      {/* TAB 3: JOB EXAM PAST PAPERS */}
      {activeTab === 'papers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'GATE CS', 'TCS NQT', 'Infosys SP', 'CAT Quant & DILR'] as const).map(
                (ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setExamFilter(ex)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      examFilter === ex ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    {ex}
                  </button>
                )
              )}
            </div>

            <div className="space-y-2">
              {filteredJobPapers.map((p) => {
                const active = p.id === selectedJobPaper.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedJobPaperId(p.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors ${
                      active
                        ? 'bg-sky-50 border-sky-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs text-slate-500">
                      {p.exam} · {p.year} · {p.questions.length} Solved Sets
                    </div>
                    <div className="font-semibold text-sm text-slate-900 mt-1">{p.title}</div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="text-xs text-slate-500">
                  {selectedJobPaper.exam} {selectedJobPaper.year} · {selectedJobPaper.durationMin}{' '}
                  mins practice
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  {selectedJobPaper.title}
                </h2>
                <p className="text-xs font-medium text-sky-800">{selectedJobPaper.cutoffNote}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onToggleBookmark({
                    id: selectedJobPaper.id,
                    track: 'graduate',
                    kind: 'paper',
                    title: selectedJobPaper.title,
                    subtitle: `${selectedJobPaper.exam} ${selectedJobPaper.year}`,
                    savedAt: new Date().toLocaleDateString(),
                  })
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  isBookmarked(selectedJobPaper.id)
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {isBookmarked(selectedJobPaper.id) ? 'Bookmarked' : 'Bookmark Set'}
              </button>
            </div>

            <div className="space-y-4">
              {selectedJobPaper.questions.map((q, idx) => {
                const chosen = jobAnswers[q.id];
                const revealed = !!jobRevealed[q.id];

                return (
                  <div key={q.id} className="border border-slate-200 rounded-xl p-5 space-y-4">
                    <div className="text-xs font-mono text-slate-500">
                      Q{idx + 1} · {q.section}
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-relaxed">
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isPicked = chosen === oIdx;
                        const isRight = oIdx === q.correctIndex;
                        let style = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';
                        if (chosen !== undefined && isRight) {
                          style = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                        } else if (chosen !== undefined && isPicked && !isRight) {
                          style = 'bg-rose-50 border-rose-500 text-rose-900';
                        }
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setJobAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                            className={`text-left px-3.5 py-2.5 text-xs sm:text-sm font-medium border rounded-lg transition-colors ${style}`}
                          >
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setJobRevealed((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {revealed ? 'Hide Shortcut & Solution' : 'View Shortcut & Solution'}
                      </button>
                    </div>

                    {(revealed || chosen !== undefined) && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs sm:text-sm text-slate-700">
                        <div>
                          <span className="font-semibold text-sky-800">Speed Shortcut: </span>
                          {q.shortcutTip}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">Full Explanation: </span>
                          {q.solution}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: MOCK INTERVIEWS */}
      {activeTab === 'interview' && <MockInterviewView />}
    </div>
  );
};
