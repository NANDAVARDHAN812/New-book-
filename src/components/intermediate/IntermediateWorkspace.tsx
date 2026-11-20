import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  Eye,
  MessageSquarePlus,
  Send,
  ThumbsUp,
} from 'lucide-react';
import {
  INITIAL_DOUBT_THREADS,
  INTERMEDIATE_PREV_PAPERS,
  INTERMEDIATE_TOPICS,
} from '../../data/intermediateData';
import {
  BookmarkItem,
  DoubtThread,
  IntermediateTab,
  MockTestResult,
  UserProgressState,
} from '../../types';
import { MockTestCBTView } from './MockTestCBTView';
import { ProjectileLab } from './ProjectileLab';

interface IntermediateWorkspaceProps {
  activeTab: IntermediateTab;
  onTabChange: (tab: IntermediateTab) => void;
  progress: UserProgressState;
  onUpdateTopicMastery: (
    topicId: string,
    status: 'unstarted' | 'practicing' | 'mastered'
  ) => void;
  onSaveMockResult: (result: MockTestResult) => void;
  onToggleBookmark: (item: BookmarkItem) => void;
  onUpvoteDoubt: (doubtId: string) => void;
}

const DOUBT_CONCEPT_MATCHERS: {
  keywords: string[];
  guideTitle: string;
  body: string;
  formula: string;
}[] = [
  {
    keywords: ['capacitor', 'dielectric', 'charge', 'voltage', 'electrostatic'],
    guideTitle: 'Electrostatics Concept Match · Dielectric Insertion',
    body: 'Identify whether the battery remains connected (V constant, Q scales by K) or disconnected (Q constant, V drops by 1/K). Always verify energy using U = ½CV² for constant V and U = Q²/(2C) for constant Q.',
    formula: 'C′ = K·C₀  |  Battery Disconnected: U′ = U₀/K  |  Connected: U′ = K·U₀',
  },
  {
    keywords: ['integral', 'integration', 'king', 'limit', 'definite', 'calculus'],
    guideTitle: 'Calculus Concept Match · Definite Integral Properties',
    body: 'Check symmetry first: for [−a, a], test f(−x) vs f(x). For [0, a] or [a, b] with trig fractions, apply King’s rule x → a + b − x and add the original and transformed integrals.',
    formula: '∫[a,b] f(x) dx = ∫[a,b] f(a + b − x) dx',
  },
  {
    keywords: ['sn1', 'sn2', 'carbocation', 'organic', 'shift', 'hydride'],
    guideTitle: 'Organic Mechanism Match · Substitution Regimes',
    body: 'Compare substrate steric hindrance vs carbocation stability. Primary substrates with strong nucleophiles in polar aprotic solvents favor concerted SN2 inversion; tertiary substrates in polar protic solvents undergo SN1 with possible 1,2-hydride/methyl shifts.',
    formula: 'SN2: 1° > 2° > 3° (Inversion)  |  SN1: 3° > 2° > 1° (Racemization)',
  },
  {
    keywords: ['matrix', 'determinant', 'adjoint', 'eigen', 'inverse'],
    guideTitle: 'Algebra Concept Match · Matrix Determinant Identities',
    body: 'For any square invertible matrix A of order n, avoid computing adj(A) entry-by-entry when only its determinant is requested.',
    formula: '|adj(A)| = |A|^(n−1)  |  |kA| = k^n |A|',
  },
];

export const IntermediateWorkspace: React.FC<IntermediateWorkspaceProps> = ({
  activeTab,
  onTabChange,
  progress,
  onUpdateTopicMastery,
  onSaveMockResult,
  onToggleBookmark,
  onUpvoteDoubt,
}) => {
  // Subject Mastery state
  const [subjectFilter, setSubjectFilter] = useState<
    'All' | 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology'
  >('All');

  // Previous Papers state
  const [streamFilter, setStreamFilter] = useState<'All' | 'MPC' | 'BiPC'>('All');
  const [selectedPrevPaperId, setSelectedPrevPaperId] = useState(
    INTERMEDIATE_PREV_PAPERS[0].id
  );
  const [paperAnswers, setPaperAnswers] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Doubt Clearing state
  const [doubts, setDoubts] = useState<DoubtThread[]>(INITIAL_DOUBT_THREADS);
  const [doubtSubjectFilter, setDoubtSubjectFilter] = useState<
    'All' | 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'
  >('All');
  const [doubtSearch, setDoubtSearch] = useState('');
  const [showAskModal, setShowAskModal] = useState(false);
  const [newDoubtSubject, setNewDoubtSubject] = useState<
    'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'
  >('Physics');
  const [newDoubtChapter, setNewDoubtChapter] = useState('');
  const [newDoubtTitle, setNewDoubtTitle] = useState('');
  const [newDoubtBody, setNewDoubtBody] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const filteredTopics =
    subjectFilter === 'All'
      ? INTERMEDIATE_TOPICS
      : INTERMEDIATE_TOPICS.filter((t) => t.subject === subjectFilter);

  const filteredPrevPapers =
    streamFilter === 'All'
      ? INTERMEDIATE_PREV_PAPERS
      : INTERMEDIATE_PREV_PAPERS.filter((p) => p.stream === streamFilter);
  const selectedPrevPaper =
    filteredPrevPapers.find((p) => p.id === selectedPrevPaperId) ??
    filteredPrevPapers[0] ??
    INTERMEDIATE_PREV_PAPERS[0];

  const filteredDoubts = doubts.filter((d) => {
    const matchesSubj = doubtSubjectFilter === 'All' || d.subject === doubtSubjectFilter;
    const q = doubtSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.chapter.toLowerCase().includes(q) ||
      d.studentQuestion.toLowerCase().includes(q);
    return matchesSubj && matchesQuery;
  });

  const isBookmarked = (id: string) => progress.bookmarks.some((b) => b.id === id);

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubtTitle.trim() || !newDoubtBody.trim()) return;

    const combinedText = `${newDoubtTitle} ${newDoubtChapter} ${newDoubtBody}`.toLowerCase();
    const matchedGuide = DOUBT_CONCEPT_MATCHERS.find((m) =>
      m.keywords.some((kw) => combinedText.includes(kw))
    );

    const newThread: DoubtThread = {
      id: `doubt-${Date.now()}`,
      subject: newDoubtSubject,
      chapter: newDoubtChapter.trim() || 'General Concept',
      title: newDoubtTitle.trim(),
      studentQuestion: newDoubtBody.trim(),
      askedBy: 'You · Student Scholar',
      askedAt: 'Just now',
      upvotes: 1,
      resolved: !!matchedGuide,
      replies: matchedGuide
        ? [
            {
              id: `rep-${Date.now()}`,
              author: matchedGuide.guideTitle,
              role: 'Subject Mentor',
              createdAt: 'Instant Concept Match',
              body: matchedGuide.body,
              formulaBlock: matchedGuide.formula,
            },
          ]
        : [],
    };

    setDoubts((prev) => [newThread, ...prev]);
    setNewDoubtChapter('');
    setNewDoubtTitle('');
    setNewDoubtBody('');
    setShowAskModal(false);
  };

  const handleAddReply = (doubtId: string) => {
    const text = (replyDrafts[doubtId] || '').trim();
    if (!text) return;
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === doubtId
          ? {
              ...d,
              resolved: true,
              replies: [
                ...d.replies,
                {
                  id: `rep-${Date.now()}`,
                  author: 'You · Peer Scholar',
                  role: 'Peer Scholar',
                  createdAt: 'Just now',
                  body: text,
                },
              ],
            }
          : d
      )
    );
    setReplyDrafts((prev) => ({ ...prev, [doubtId]: '' }));
  };

  const masteredCount = INTERMEDIATE_TOPICS.filter(
    (t) => progress.topicMastery[t.id] === 'mastered'
  ).length;

  const tabs: { id: IntermediateTab; label: string }[] = [
    { id: 'mastery', label: 'Subject-Wise Mastery' },
    { id: 'mock', label: 'EAMCET & JEE Mock Tests' },
    { id: 'papers', label: 'Previous Question Papers' },
    { id: 'doubts', label: 'Doubt-Clearing Desk' },
  ];

  return (
    <div className="space-y-8">
      {/* Stage Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-sky-700">
              Intermediate (Classes 11–12) · EAMCET, JEE Main & IPE
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Intermediate & Competitive Exam Studio
            </h1>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <div>
              High-Yield Mastery:{' '}
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {masteredCount}/{INTERMEDIATE_TOPICS.length}
              </span>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              Mocks Attempted:{' '}
              <span className="font-mono font-semibold text-sky-700 tabular-nums">
                {progress.mockHistory.length}
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

      {/* TAB 1: SUBJECT-WISE MASTERY */}
      {activeTab === 'mastery' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1 p-1 bg-slate-200/70 rounded-lg">
              {(['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'] as const).map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setSubjectFilter(subj)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    subjectFilter === subj
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              Update topic status as you complete formulas and practice drills
            </span>
          </div>

          {/* Interactive Physics Lab */}
          {(subjectFilter === 'All' || subjectFilter === 'Physics') && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <ProjectileLab />
            </div>
          )}

          {/* Topic Mastery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTopics.map((topic) => {
              const status = progress.topicMastery[topic.id] || 'unstarted';
              return (
                <article
                  key={topic.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <span>
                        {topic.subject} · {topic.unit}
                      </span>
                      <span className="font-mono font-semibold text-sky-700 tabular-nums">
                        ~{topic.eamcetWeightage}% Weightage
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {topic.title}
                    </h3>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                      {topic.coreConcepts.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className="text-sky-600 mt-0.5">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono text-xs space-y-1">
                      {topic.formulas.map((f) => (
                        <div key={f}>{f}</div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">Mastery State:</span>
                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                      {(['unstarted', 'practicing', 'mastered'] as const).map((st) => {
                        const active = status === st;
                        const label =
                          st === 'unstarted'
                            ? 'To Study'
                            : st === 'practicing'
                            ? 'Practicing'
                            : 'Mastered';
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => onUpdateTopicMastery(topic.id, st)}
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                              active
                                ? st === 'mastered'
                                  ? 'bg-emerald-700 text-white'
                                  : st === 'practicing'
                                  ? 'bg-sky-700 text-white'
                                  : 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MOCK TESTS (EAMCET / JEE) */}
      {activeTab === 'mock' && <MockTestCBTView onSaveResult={onSaveMockResult} />}

      {/* TAB 3: PREVIOUS QUESTION PAPERS */}
      {activeTab === 'papers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'MPC', 'BiPC'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStreamFilter(st)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    streamFilter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredPrevPapers.map((p) => {
                const active = p.id === selectedPrevPaper.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPrevPaperId(p.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors ${
                      active
                        ? 'bg-sky-50 border-sky-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs text-slate-500">
                      {p.exam} · {p.year} · {p.stream}
                    </div>
                    <div className="font-semibold text-sm text-slate-900 mt-1">{p.shift}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {p.totalQuestions} Questions · {p.difficulty}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="text-xs text-slate-500">
                  {selectedPrevPaper.exam} {selectedPrevPaper.year} · Stream {selectedPrevPaper.stream} ·{' '}
                  {selectedPrevPaper.totalQuestions} Questions
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
                  {selectedPrevPaper.shift}
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  onToggleBookmark({
                    id: selectedPrevPaper.id,
                    track: 'intermediate',
                    kind: 'paper',
                    title: `${selectedPrevPaper.exam} ${selectedPrevPaper.year} — ${selectedPrevPaper.shift}`,
                    subtitle: `${selectedPrevPaper.stream} · ${selectedPrevPaper.totalQuestions} Qs`,
                    savedAt: new Date().toLocaleDateString(),
                  })
                }
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  isBookmarked(selectedPrevPaper.id)
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {isBookmarked(selectedPrevPaper.id) ? 'Bookmarked' : 'Bookmark Paper'}
              </button>
            </div>

            {/* Subject Weightage Distribution */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <h3 className="font-display text-sm font-bold text-slate-900">
                Paper Chapter Weightage Analysis
              </h3>
              <div className="space-y-3">
                {selectedPrevPaper.subjectBreakdown.map((item) => (
                  <div key={item.subject} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-900">{item.subject}</span>
                      <span className="font-mono text-slate-600 tabular-nums">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-700"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-500">{item.topChapters}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Sample Questions from Paper */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Solved Shift Questions
              </h3>
              {selectedPrevPaper.sampleQuestions.map((q) => {
                const qKey = `${selectedPrevPaper.id}-${q.qNo}`;
                const chosen = paperAnswers[qKey];
                const isSolvedShown = !!revealedSolutions[qKey];

                return (
                  <div key={qKey} className="border border-slate-200 rounded-xl p-5 space-y-4">
                    <div className="text-xs text-slate-500 font-mono">
                      Q.{q.qNo} · {q.subject} · {q.topic}
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-relaxed">
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, idx) => {
                        const isPicked = chosen === idx;
                        const isRight = idx === q.correctIndex;
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
                            onClick={() =>
                              setPaperAnswers((prev) => ({ ...prev, [qKey]: idx }))
                            }
                            className={`text-left px-3.5 py-2.5 text-xs sm:text-sm font-medium border rounded-lg transition-colors ${style}`}
                          >
                            {String.fromCharCode(65 + idx)}. {opt}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedSolutions((prev) => ({ ...prev, [qKey]: !prev[qKey] }))
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {isSolvedShown ? 'Hide Solution' : 'View Worked Solution'}
                      </button>
                    </div>

                    {(isSolvedShown || chosen !== undefined) && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs sm:text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Worked Solution: </span>
                        {q.solution}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: DOUBT-CLEARING MECHANISMS */}
      {activeTab === 'doubts' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg">
                {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDoubtSubjectFilter(s)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      doubtSubjectFilter === s
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={doubtSearch}
                onChange={(e) => setDoubtSearch(e.target.value)}
                placeholder="Search doubts by chapter or keyword..."
                className="flex-1 min-w-[200px] px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowAskModal((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg whitespace-nowrap shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              {showAskModal ? 'Close Doubt Form' : 'Ask a New Doubt'}
            </button>
          </div>

          {showAskModal && (
            <form
              onSubmit={handlePostDoubt}
              className="bg-white border border-sky-200 rounded-2xl p-6 space-y-4"
            >
              <h3 className="font-display text-lg font-bold text-slate-900">
                Submit a Conceptual or Numerical Doubt
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Subject</label>
                  <select
                    value={newDoubtSubject}
                    onChange={(e) =>
                      setNewDoubtSubject(
                        e.target.value as 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology'
                      )
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Chapter / Topic
                  </label>
                  <input
                    type="text"
                    value={newDoubtChapter}
                    onChange={(e) => setNewDoubtChapter(e.target.value)}
                    placeholder="e.g., Electrostatics, Definite Integrals"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Doubt Headline
                </label>
                <input
                  type="text"
                  required
                  value={newDoubtTitle}
                  onChange={(e) => setNewDoubtTitle(e.target.value)}
                  placeholder="Summarize where you got stuck..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Problem Statement & What You Tried
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDoubtBody}
                  onChange={(e) => setNewDoubtBody(e.target.value)}
                  placeholder="Include formula used or exact step where confusion arises..."
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
                >
                  Publish Doubt & Check Concept Base
                </button>
              </div>
            </form>
          )}

          {/* Doubt Thread List */}
          <div className="space-y-5">
            {filteredDoubts.map((doubt) => {
              const upvoted = progress.upvotedDoubts.includes(doubt.id);
              const saved = isBookmarked(doubt.id);

              return (
                <article
                  key={doubt.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500">
                        {doubt.subject} · {doubt.chapter} · Asked by {doubt.askedBy} ·{' '}
                        {doubt.askedAt}
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900">
                        {doubt.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpvoteDoubt(doubt.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors tabular-nums ${
                          upvoted
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {doubt.upvotes + (upvoted ? 1 : 0)}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onToggleBookmark({
                            id: doubt.id,
                            track: 'intermediate',
                            kind: 'doubt',
                            title: doubt.title,
                            subtitle: `${doubt.subject} · ${doubt.chapter}`,
                            savedAt: new Date().toLocaleDateString(),
                          })
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          saved
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        {saved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">{doubt.studentQuestion}</p>

                  {/* Mentor / Peer Replies */}
                  {doubt.replies.length > 0 ? (
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      {doubt.replies.map((rep) => (
                        <div
                          key={rep.id}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-900 inline-flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              {rep.author} · {rep.role}
                            </span>
                            <span className="text-slate-500">{rep.createdAt}</span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{rep.body}</p>
                          {rep.formulaBlock && (
                            <div className="bg-slate-900 text-slate-100 rounded-lg px-3.5 py-2 font-mono text-xs overflow-x-auto">
                              {rep.formulaBlock}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                      Open for mentor & peer explanation — add a step-by-step response below.
                    </div>
                  )}

                  {/* Add Reply Input */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={replyDrafts[doubt.id] || ''}
                      onChange={(e) =>
                        setReplyDrafts((prev) => ({ ...prev, [doubt.id]: e.target.value }))
                      }
                      placeholder="Contribute a step-by-step hint or derivation..."
                      className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddReply(doubt.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Reply
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
