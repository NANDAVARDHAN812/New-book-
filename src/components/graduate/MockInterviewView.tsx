import React, { useEffect, useState } from 'react';
import { CheckSquare, Clock, Eye, Play, RotateCcw, Square } from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../../data/graduateData';

export const MockInterviewView: React.FC = () => {
  const [trackFilter, setTrackFilter] = useState<
    'All' | 'Frontend & Full-Stack' | 'Backend & System Design' | 'Data & Analytics' | 'HR & Behavioral'
  >('All');

  const filteredQuestions =
    trackFilter === 'All'
      ? INTERVIEW_QUESTIONS
      : INTERVIEW_QUESTIONS.filter((q) => q.track === trackFilter);

  const [selectedId, setSelectedId] = useState(INTERVIEW_QUESTIONS[0].id);
  const currentQ =
    filteredQuestions.find((q) => q.id === selectedId) ?? filteredQuestions[0] ?? INTERVIEW_QUESTIONS[0];

  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(currentQ.recommendedSec);
  const [starNotes, setStarNotes] = useState({ s: '', t: '', a: '', r: '' });
  const [techNotes, setTechNotes] = useState('');
  const [checkedRubric, setCheckedRubric] = useState<Record<string, boolean>>({});
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const selectQuestion = (id: string, recSec: number) => {
    setSelectedId(id);
    setTimerRunning(false);
    setSecondsLeft(recSec);
    setShowModelAnswer(false);
  };

  useEffect(() => {
    if (!timerRunning) return;
    if (secondsLeft <= 0) {
      setTimerRunning(false);
      return;
    }
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, secondsLeft]);

  const formatSec = (s: number) => {
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const rubricScore = currentQ.rubricCriteria.filter(
    (_, idx) => checkedRubric[`${currentQ.id}-${idx}`]
  ).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Role Track Filter & Prompt Selector */}
      <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-600 px-1">
            Interview Role Track
          </label>
          <select
            value={trackFilter}
            onChange={(e) => {
              const val = e.target.value as typeof trackFilter;
              setTrackFilter(val);
              const first =
                val === 'All'
                  ? INTERVIEW_QUESTIONS[0]
                  : INTERVIEW_QUESTIONS.find((q) => q.track === val);
              if (first) selectQuestion(first.id, first.recommendedSec);
            }}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white"
          >
            <option value="All">All Interview Tracks</option>
            <option value="Frontend & Full-Stack">Frontend & Full-Stack</option>
            <option value="Backend & System Design">Backend & System Design</option>
            <option value="Data & Analytics">Data & Analytics</option>
            <option value="HR & Behavioral">HR & Behavioral</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredQuestions.map((q) => {
            const active = q.id === currentQ.id;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => selectQuestion(q.id, q.recommendedSec)}
                className={`w-full text-left p-3.5 rounded-xl border transition-colors ${
                  active
                    ? 'bg-sky-50 border-sky-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs text-slate-500">
                  {q.track} · {Math.round(q.recommendedSec / 60)} min
                </div>
                <div className="text-sm font-semibold text-slate-900 mt-1 line-clamp-2">
                  {q.prompt}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right: Interactive Mock Studio */}
      <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1 max-w-xl">
            <div className="text-xs text-slate-500">
              {currentQ.track} · {currentQ.difficulty} · Recommended{' '}
              {Math.round(currentQ.recommendedSec / 60)} min response
            </div>
            <h2 className="font-display text-xl font-bold text-slate-900 leading-snug">
              {currentQ.prompt}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg font-mono text-sm font-semibold tabular-nums">
              <Clock className="w-4 h-4 text-sky-400" />
              {formatSec(secondsLeft)}
            </div>
            <button
              type="button"
              onClick={() => setTimerRunning((prev) => !prev)}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
            >
              {timerRunning ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {timerRunning ? 'Pause' : 'Start Timer'}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setSecondsLeft(currentQ.recommendedSec);
              }}
              aria-label="Reset interview timer"
              className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Structured Scratchpad */}
        {currentQ.isBehavioral ? (
          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold text-slate-900">
              STAR Response Structuring Pad
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 's' as const, label: 'Situation (Context & Constraints)' },
                { key: 't' as const, label: 'Task (Your Specific Ownership)' },
                { key: 'a' as const, label: 'Action (Decisions & Trade-offs)' },
                { key: 'r' as const, label: 'Result (Quantified Outcome)' },
              ].map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="block text-xs font-medium text-slate-600">
                    {field.label}
                  </label>
                  <textarea
                    rows={3}
                    value={starNotes[field.key]}
                    onChange={(e) =>
                      setStarNotes((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    placeholder="Draft key talking points..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="font-display text-sm font-bold text-slate-900">
              Technical Whiteboard & Talking Points
            </h3>
            <textarea
              rows={5}
              value={techNotes}
              onChange={(e) => setTechNotes(e.target.value)}
              placeholder="Outline architecture, edge cases, time/space complexity, and failure handling before comparing with the model answer..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-sky-600"
            />
          </div>
        )}

        {/* Self-Evaluation Rubric */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-slate-900">
              Interviewer Scoring Rubric
            </h3>
            <span className="font-mono text-xs font-semibold text-sky-700 tabular-nums">
              {rubricScore} / {currentQ.rubricCriteria.length} Criteria Checked
            </span>
          </div>
          <div className="space-y-2">
            {currentQ.rubricCriteria.map((criterion, idx) => {
              const key = `${currentQ.id}-${idx}`;
              const checked = !!checkedRubric[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setCheckedRubric((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                  className="w-full text-left flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 hover:text-slate-950"
                >
                  {checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={checked ? 'text-slate-900 font-medium' : ''}>{criterion}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Model Answer & Follow-up Probes */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowModelAnswer((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            {showModelAnswer ? 'Hide Senior Model Answer' : 'Compare with Senior Model Answer'}
          </button>

          {showModelAnswer && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div>
                <div className="text-xs font-semibold text-sky-700 mb-1">
                  Benchmark Answer Structure
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">{currentQ.modelAnswer}</p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-900 mb-1.5">
                  Likely Interviewer Follow-Ups
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-slate-600">
                  {currentQ.followUps.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
