import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Eye,
  Flame,
  HelpCircle,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import {
  TENTH_BOARD_PAPERS,
  TENTH_MICRO_MODULES,
  TENTH_QUIZ_QUESTIONS,
  TENTH_STEP_SOLUTIONS,
} from '../../data/tenthData';
import { BookmarkItem, TenthTab, UserProgressState } from '../../types';
import { ConceptSimulator } from './ConceptSimulator';

interface TenthWorkspaceProps {
  activeTab: TenthTab;
  onTabChange: (tab: TenthTab) => void;
  progress: UserProgressState;
  onCompleteMicroModule: (moduleId: string) => void;
  onRecordQuizResult: (xpEarned: number, bestStreak: number) => void;
  onToggleBookmark: (item: BookmarkItem) => void;
}

export const TenthWorkspace: React.FC<TenthWorkspaceProps> = ({
  activeTab,
  onTabChange,
  progress,
  onCompleteMicroModule,
  onRecordQuizResult,
  onToggleBookmark,
}) => {
  // Micro-learning state
  const [selectedModuleId, setSelectedModuleId] = useState(TENTH_MICRO_MODULES[0].id);
  const [checkpointChoice, setCheckpointChoice] = useState<number | null>(null);

  // Gamified Quiz state
  const [quizSubjectFilter, setQuizSubjectFilter] = useState<'All' | 'Science' | 'Mathematics'>('All');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [sessionBestStreak, setSessionBestStreak] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Past Board Papers state
  const [boardFilter, setBoardFilter] = useState<'All' | 'CBSE' | 'State SSC' | 'ICSE'>('All');
  const [selectedPaperId, setSelectedPaperId] = useState(TENTH_BOARD_PAPERS[0].id);
  const [revealedPaperQuestions, setRevealedPaperQuestions] = useState<Record<string, boolean>>({});

  // Step-by-Step Solutions state
  const [solutionSubjectFilter, setSolutionSubjectFilter] = useState<'All' | 'Mathematics' | 'Physics' | 'Chemistry'>('All');
  const [selectedProblemId, setSelectedProblemId] = useState(TENTH_STEP_SOLUTIONS[0].id);
  const [visibleStepsCount, setVisibleStepsCount] = useState(1);
  const [showHint, setShowHint] = useState(false);

  const selectedModule =
    TENTH_MICRO_MODULES.find((m) => m.id === selectedModuleId) ?? TENTH_MICRO_MODULES[0];

  const filteredQuiz =
    quizSubjectFilter === 'All'
      ? TENTH_QUIZ_QUESTIONS
      : TENTH_QUIZ_QUESTIONS.filter((q) => q.subject === quizSubjectFilter);
  const currentQuizQ = filteredQuiz[quizIndex] ?? filteredQuiz[0];

  const filteredPapers =
    boardFilter === 'All'
      ? TENTH_BOARD_PAPERS
      : TENTH_BOARD_PAPERS.filter((p) => p.board === boardFilter);
  const selectedPaper =
    filteredPapers.find((p) => p.id === selectedPaperId) ?? filteredPapers[0] ?? TENTH_BOARD_PAPERS[0];

  const filteredSolutions =
    solutionSubjectFilter === 'All'
      ? TENTH_STEP_SOLUTIONS
      : TENTH_STEP_SOLUTIONS.filter((s) => s.subject === solutionSubjectFilter);
  const selectedProblem =
    filteredSolutions.find((s) => s.id === selectedProblemId) ?? filteredSolutions[0] ?? TENTH_STEP_SOLUTIONS[0];

  const isBookmarked = (id: string) => progress.bookmarks.some((b) => b.id === id);

  const handleSelectQuizOption = (idx: number) => {
    if (selectedQuizOpt !== null) return;
    setSelectedQuizOpt(idx);
    const isCorrect = idx === currentQuizQ.correctIndex;
    if (isCorrect) {
      const nextStreak = streak + 1;
      const multiplier = nextStreak >= 3 ? 2 : 1;
      const gained = 25 * multiplier;
      setStreak(nextStreak);
      setSessionBestStreak((prev) => Math.max(prev, nextStreak));
      setSessionXp((prev) => prev + gained);
      setCorrectCount((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 >= filteredQuiz.length) {
      setQuizFinished(true);
      onRecordQuizResult(sessionXp, sessionBestStreak);
    } else {
      setQuizIndex((prev) => prev + 1);
      setSelectedQuizOpt(null);
    }
  };

  const resetQuiz = (newFilter?: 'All' | 'Science' | 'Mathematics') => {
    if (newFilter) setQuizSubjectFilter(newFilter);
    setQuizIndex(0);
    setSelectedQuizOpt(null);
    setStreak(0);
    setSessionBestStreak(0);
    setSessionXp(0);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  const tabs: { id: TenthTab; label: string }[] = [
    { id: 'micro', label: 'Micro-Learning Modules' },
    { id: 'quiz', label: 'Gamified Quizzes' },
    { id: 'papers', label: 'Past Board Papers' },
    { id: 'solutions', label: 'Step-by-Step Solutions' },
  ];

  return (
    <div className="space-y-8">
      {/* Stage Header & Sub-Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-sky-700">
              Class 10 · CBSE, State SSC & ICSE
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              10th Grade Board Mastery Hub
            </h1>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <div>
              Modules Completed:{' '}
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {progress.completedMicroModules.length}/{TENTH_MICRO_MODULES.length}
              </span>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              Total Quiz XP:{' '}
              <span className="font-mono font-semibold text-sky-700 tabular-nums">
                {progress.quizXp} XP
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

      {/* TAB 1: MICRO-LEARNING MODULES */}
      {activeTab === 'micro' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Module List */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="px-2 py-1 text-xs font-semibold text-slate-500">
              5-Minute Concept Bites
            </div>
            {TENTH_MICRO_MODULES.map((mod) => {
              const isSelected = mod.id === selectedModule.id;
              const isDone = progress.completedMicroModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => {
                    setSelectedModuleId(mod.id);
                    setCheckpointChoice(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-colors ${
                    isSelected
                      ? 'bg-sky-50 border-sky-200'
                      : 'bg-white border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                      {mod.subject} · {mod.durationMin} min
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Done
                      </span>
                    )}
                  </div>
                  <div className="font-semibold text-sm text-slate-900 mt-1">{mod.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{mod.chapter}</div>
                </button>
              );
            })}
          </aside>

          {/* Active Micro-Lesson Reader */}
          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1.5">
                <div className="text-xs text-slate-500">
                  {selectedModule.subject} · {selectedModule.chapter} · {selectedModule.durationMin} min read
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  {selectedModule.title}
                </h2>
                <p className="text-sm text-slate-600 max-w-2xl">{selectedModule.summary}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onToggleBookmark({
                    id: selectedModule.id,
                    track: 'tenth',
                    kind: 'module',
                    title: selectedModule.title,
                    subtitle: `${selectedModule.subject} · ${selectedModule.chapter}`,
                    savedAt: new Date().toLocaleDateString(),
                  })
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                  isBookmarked(selectedModule.id)
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {isBookmarked(selectedModule.id) ? 'Saved' : 'Save Module'}
              </button>
            </div>

            {/* Key Formula Strip */}
            <div className="bg-slate-900 text-slate-50 rounded-xl px-4 py-3 font-mono text-xs sm:text-sm overflow-x-auto">
              {selectedModule.keyFormula}
            </div>

            {/* Interactive Simulation if present */}
            <ConceptSimulator type={selectedModule.simulationType} />

            {/* Structured Concept Steps */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Core Concept Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedModule.conceptSteps.map((step, i) => (
                  <div
                    key={step.heading}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2"
                  >
                    <div className="text-xs font-mono text-sky-700 font-semibold">
                      0{i + 1}. {step.heading}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Checkpoint */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-slate-900">
                  Quick Mastery Checkpoint
                </h3>
                {progress.completedMicroModules.includes(selectedModule.id) && (
                  <span className="text-xs font-medium text-emerald-700 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Module Completed
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-800">
                {selectedModule.checkpoint.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedModule.checkpoint.options.map((opt, idx) => {
                  const answered = checkpointChoice !== null;
                  const isChosen = checkpointChoice === idx;
                  const isCorrect = idx === selectedModule.checkpoint.correctIndex;
                  let style = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';
                  if (answered && isCorrect) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                  } else if (answered && isChosen && !isCorrect) {
                    style = 'bg-rose-50 border-rose-500 text-rose-900';
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setCheckpointChoice(idx);
                        if (idx === selectedModule.checkpoint.correctIndex) {
                          onCompleteMicroModule(selectedModule.id);
                        }
                      }}
                      className={`text-left px-4 py-3 text-sm font-medium border rounded-xl transition-colors ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {checkpointChoice !== null && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="font-semibold text-slate-900">
                      {checkpointChoice === selectedModule.checkpoint.correctIndex
                        ? 'Correct: '
                        : 'Review Note: '}
                    </span>
                    {selectedModule.checkpoint.explanation}
                  </div>
                  {!progress.completedMicroModules.includes(selectedModule.id) && (
                    <button
                      type="button"
                      onClick={() => onCompleteMicroModule(selectedModule.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: GAMIFIED QUIZZES */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
              {(['All', 'Science', 'Mathematics'] as const).map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => resetQuiz(subj)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    quizSubjectFilter === subj
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 text-xs sm:text-sm">
              <div className="inline-flex items-center gap-1.5 font-mono font-semibold text-amber-700 tabular-nums">
                <Flame className="w-4 h-4" />
                Streak: {streak} {streak >= 3 ? '(2x XP)' : ''}
              </div>
              <div className="inline-flex items-center gap-1.5 font-mono font-semibold text-sky-700 tabular-nums">
                <Trophy className="w-4 h-4" />
                Session: +{sessionXp} XP
              </div>
            </div>
          </div>

          {quizFinished ? (
            <div className="max-w-xl mx-auto py-8 text-center space-y-5">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Quiz Sprint Complete
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs text-slate-500">Accuracy</div>
                  <div className="font-mono text-2xl font-bold text-slate-900 tabular-nums mt-1">
                    {correctCount}/{filteredQuiz.length}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs text-slate-500">XP Earned</div>
                  <div className="font-mono text-2xl font-bold text-sky-700 tabular-nums mt-1">
                    +{sessionXp}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs text-slate-500">Best Streak</div>
                  <div className="font-mono text-2xl font-bold text-amber-700 tabular-nums mt-1">
                    {sessionBestStreak}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => resetQuiz()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                Play Another Round
              </button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  Question {quizIndex + 1} of {filteredQuiz.length} · {currentQuizQ.subject} ·{' '}
                  {currentQuizQ.topic}
                </span>
                <span className="font-medium text-slate-700">{currentQuizQ.difficulty}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-600 transition-transform duration-200 origin-left"
                  style={{
                    transform: `scaleX(${(quizIndex + 1) / filteredQuiz.length})`,
                  }}
                />
              </div>

              <h3 className="font-display text-xl font-semibold text-slate-900 leading-snug">
                {currentQuizQ.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuizQ.options.map((opt, idx) => {
                  const answered = selectedQuizOpt !== null;
                  const isSelected = selectedQuizOpt === idx;
                  const isRight = idx === currentQuizQ.correctIndex;
                  let cls = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';
                  if (answered && isRight) {
                    cls = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                  } else if (answered && isSelected && !isRight) {
                    cls = 'bg-rose-50 border-rose-500 text-rose-900';
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectQuizOption(idx)}
                      className={`text-left px-4 py-3.5 text-sm font-medium border rounded-xl transition-colors ${cls}`}
                    >
                      <span className="font-mono text-xs text-slate-400 mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedQuizOpt !== null && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {selectedQuizOpt === currentQuizQ.correctIndex
                        ? 'Correct (+XP): '
                        : 'Explanation: '}
                    </span>
                    {currentQuizQ.explanation}
                  </div>
                  <button
                    type="button"
                    onClick={handleNextQuizQuestion}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg whitespace-nowrap shrink-0"
                  >
                    {quizIndex + 1 >= filteredQuiz.length ? 'Finish Quiz' : 'Next Question'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PAST BOARD PAPERS */}
      {activeTab === 'papers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'CBSE', 'State SSC', 'ICSE'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBoardFilter(b)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    boardFilter === b ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredPapers.map((paper) => {
                const active = paper.id === selectedPaper.id;
                return (
                  <button
                    key={paper.id}
                    type="button"
                    onClick={() => setSelectedPaperId(paper.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors ${
                      active
                        ? 'bg-sky-50 border-sky-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs text-slate-500">
                      {paper.board} · {paper.year} · {paper.maxMarks} Marks
                    </div>
                    <div className="font-semibold text-sm text-slate-900 mt-1">{paper.title}</div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="text-xs text-slate-500">
                  {selectedPaper.board} · {selectedPaper.subject} · {selectedPaper.durationMin} mins · Max{' '}
                  {selectedPaper.maxMarks} Marks
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
                  {selectedPaper.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  onToggleBookmark({
                    id: selectedPaper.id,
                    track: 'tenth',
                    kind: 'paper',
                    title: selectedPaper.title,
                    subtitle: `${selectedPaper.board} ${selectedPaper.year} · ${selectedPaper.subject}`,
                    savedAt: new Date().toLocaleDateString(),
                  })
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  isBookmarked(selectedPaper.id)
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {isBookmarked(selectedPaper.id) ? 'Bookmarked' : 'Bookmark Paper'}
              </button>
            </div>

            <div className="space-y-6">
              {selectedPaper.sections.map((sec) => (
                <div key={sec.sectionName} className="space-y-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-900">
                      {sec.sectionName}
                    </h3>
                    <p className="text-xs text-slate-500">{sec.instructions}</p>
                  </div>

                  <div className="space-y-4">
                    {sec.questions.map((q) => {
                      const key = `${selectedPaper.id}-${q.qNo}`;
                      const isOpen = !!revealedPaperQuestions[key];
                      return (
                        <div
                          key={key}
                          className="border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 bg-slate-50/50"
                        >
                          <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                            <span className="font-mono font-semibold text-slate-800">{q.qNo}</span>
                            <span className="font-mono">{q.marks} Marks</span>
                          </div>
                          <p className="text-sm font-medium text-slate-900 leading-relaxed">
                            {q.prompt}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <span className="text-xs text-slate-500">
                              Marking Split: {q.markingScheme}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedPaperQuestions((prev) => ({
                                  ...prev,
                                  [key]: !prev[key],
                                }))
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-white border border-slate-200 hover:bg-sky-50 rounded-lg"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              {isOpen ? 'Hide Model Solution' : 'View Model Solution'}
                            </button>
                          </div>
                          {isOpen && (
                            <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-sm text-slate-700 leading-relaxed">
                              <span className="font-semibold text-slate-900">Official Solution: </span>
                              {q.modelAnswer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: STEP-BY-STEP SCIENCE & MATH SOLUTIONS */}
      {activeTab === 'solutions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'Mathematics', 'Physics', 'Chemistry'] as const).map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setSolutionSubjectFilter(subj)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    solutionSubjectFilter === subj
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredSolutions.map((prob) => {
                const active = prob.id === selectedProblem.id;
                return (
                  <button
                    key={prob.id}
                    type="button"
                    onClick={() => {
                      setSelectedProblemId(prob.id);
                      setVisibleStepsCount(1);
                      setShowHint(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors ${
                      active
                        ? 'bg-sky-50 border-sky-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs text-slate-500">
                      {prob.subject} · {prob.chapter}
                    </div>
                    <div className="font-semibold text-sm text-slate-900 mt-1">{prob.title}</div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="text-xs text-slate-500">
                  {selectedProblem.subject} · {selectedProblem.chapter}
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  {selectedProblem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  onToggleBookmark({
                    id: selectedProblem.id,
                    track: 'tenth',
                    kind: 'solution',
                    title: selectedProblem.title,
                    subtitle: `${selectedProblem.subject} · ${selectedProblem.chapter}`,
                    savedAt: new Date().toLocaleDateString(),
                  })
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  isBookmarked(selectedProblem.id)
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {isBookmarked(selectedProblem.id) ? 'Saved' : 'Save Problem'}
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              {selectedProblem.problemStatement}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleStepsCount((prev) => Math.min(selectedProblem.steps.length, prev + 1))
                  }
                  disabled={visibleStepsCount >= selectedProblem.steps.length}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:bg-slate-300 rounded-lg transition-colors"
                >
                  Reveal Next Step ({visibleStepsCount}/{selectedProblem.steps.length})
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleStepsCount(selectedProblem.steps.length)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Reveal All Steps
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleStepsCount(1)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Reset
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-lg"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>

            {showHint && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-950">
                <span className="font-semibold">Approach Hint: </span>
                {selectedProblem.hint}
              </div>
            )}

            <div className="space-y-3">
              {selectedProblem.steps.slice(0, visibleStepsCount).map((step) => (
                <div
                  key={step.label}
                  className="border border-slate-200 rounded-xl p-4 space-y-2 bg-white"
                >
                  <div className="text-xs font-semibold text-sky-700">{step.label}</div>
                  <div className="font-mono text-sm bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 overflow-x-auto">
                    {step.expression}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">{step.explanation}</p>
                </div>
              ))}
            </div>

            {visibleStepsCount >= selectedProblem.steps.length && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-sm text-emerald-950">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-semibold">Final Verified Answer: </span>
                  <span className="font-mono">{selectedProblem.finalAnswer}</span>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};
