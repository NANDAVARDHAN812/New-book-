import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Flag, RotateCcw, XCircle } from 'lucide-react';
import { INTERMEDIATE_MOCK_EXAMS } from '../../data/intermediateData';
import { MockExam, MockTestResult } from '../../types';

interface MockTestCBTViewProps {
  onSaveResult: (result: MockTestResult) => void;
}

export const MockTestCBTView: React.FC<MockTestCBTViewProps> = ({ onSaveResult }) => {
  const [activeExam, setActiveExam] = useState<MockExam | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedReview, setMarkedReview] = useState<Record<string, boolean>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleStartExam = (exam: MockExam) => {
    setActiveExam(exam);
    setQIndex(0);
    setAnswers({});
    setMarkedReview({});
    setVisited({ [exam.questions[0].id]: true });
    setSecondsLeft(exam.durationMin * 60);
    setSubmitted(false);
  };

  const handleSubmitExam = () => {
    if (!activeExam || submitted) return;
    setSubmitted(true);

    let score = 0;
    let correct = 0;
    activeExam.questions.forEach((q) => {
      const chosen = answers[q.id];
      if (chosen !== undefined) {
        if (chosen === q.correctIndex) {
          score += activeExam.marksPerCorrect;
          correct += 1;
        } else {
          score -= activeExam.negativeMarks;
        }
      }
    });

    const maxScore = activeExam.questions.length * activeExam.marksPerCorrect;
    const accuracy = Math.round((correct / activeExam.questions.length) * 100);
    const timeTakenSec = activeExam.durationMin * 60 - secondsLeft;

    onSaveResult({
      id: `${activeExam.id}-${Date.now()}`,
      examTitle: activeExam.title,
      score,
      maxScore,
      accuracy,
      timeTakenSec,
      completedAt: new Date().toLocaleDateString(),
    });
  };

  useEffect(() => {
    if (!activeExam || submitted) return;
    if (secondsLeft <= 0) {
      handleSubmitExam();
      return;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeExam, submitted, secondsLeft]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!activeExam) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INTERMEDIATE_MOCK_EXAMS.map((exam) => (
          <div
            key={exam.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2">
              <div className="text-xs font-medium text-sky-700">{exam.examType}</div>
              <h3 className="font-display text-lg font-bold text-slate-900">{exam.title}</h3>
              <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                <div>
                  Questions:{' '}
                  <span className="font-mono font-semibold text-slate-900">
                    {exam.questions.length} MCQs
                  </span>
                </div>
                <div>
                  Duration:{' '}
                  <span className="font-mono font-semibold text-slate-900">
                    {exam.durationMin} mins
                  </span>
                </div>
                <div>
                  Marking:{' '}
                  <span className="font-mono font-semibold text-slate-900">
                    +{exam.marksPerCorrect} / {exam.negativeMarks > 0 ? `−${exam.negativeMarks}` : 'No Negative'}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleStartExam(exam)}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors"
            >
              Launch CBT Simulator
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (submitted) {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    const subjectStats: Record<string, { total: number; correct: number }> = {};

    activeExam.questions.forEach((q) => {
      if (!subjectStats[q.subject]) subjectStats[q.subject] = { total: 0, correct: 0 };
      subjectStats[q.subject].total += 1;

      const chosen = answers[q.id];
      if (chosen === undefined) {
        unattempted += 1;
      } else if (chosen === q.correctIndex) {
        score += activeExam.marksPerCorrect;
        correct += 1;
        subjectStats[q.subject].correct += 1;
      } else {
        score -= activeExam.negativeMarks;
        wrong += 1;
      }
    });

    const maxScore = activeExam.questions.length * activeExam.marksPerCorrect;

    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="text-xs font-medium text-sky-700">CBT Performance Scorecard</div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
                {activeExam.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setActiveExam(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Back to Exam Directory
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Total Score</div>
              <div className="font-mono text-2xl font-bold text-sky-700 tabular-nums mt-1">
                {score} / {maxScore}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Correct</div>
              <div className="font-mono text-2xl font-bold text-emerald-700 tabular-nums mt-1">
                {correct}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Incorrect</div>
              <div className="font-mono text-2xl font-bold text-rose-700 tabular-nums mt-1">
                {wrong}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Unattempted</div>
              <div className="font-mono text-2xl font-bold text-slate-700 tabular-nums mt-1">
                {unattempted}
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="space-y-3">
            <h3 className="font-display text-base font-semibold text-slate-900">
              Subject-Wise Accuracy Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(subjectStats).map(([subj, stat]) => {
                const pct = Math.round((stat.correct / stat.total) * 100);
                return (
                  <div key={subj} className="border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-900">{subj}</span>
                      <span className="font-mono text-slate-700 tabular-nums">
                        {stat.correct}/{stat.total} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-600"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Detailed Question & Solution Review
          </h3>
          <div className="space-y-4">
            {activeExam.questions.map((q, idx) => {
              const chosen = answers[q.id];
              const isCorrect = chosen === q.correctIndex;
              return (
                <div key={q.id} className="border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-slate-500">
                      Q{idx + 1} · {q.subject} · {q.topic}
                    </span>
                    {chosen === undefined ? (
                      <span className="font-medium text-slate-500">Skipped</span>
                    ) : isCorrect ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correct (+{activeExam.marksPerCorrect})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrect ({activeExam.negativeMarks > 0 ? `−${activeExam.negativeMarks}` : '0'})
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-900">{q.question}</p>
                  <div className="text-xs text-slate-700">
                    Your Answer:{' '}
                    <span className="font-semibold">
                      {chosen !== undefined ? q.options[chosen] : 'None'}
                    </span>{' '}
                    · Correct Answer:{' '}
                    <span className="font-semibold text-emerald-800">
                      {q.options[q.correctIndex]}
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs sm:text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Solution: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = activeExam.questions[qIndex];
  const goToQuestion = (nextIdx: number) => {
    const targetQ = activeExam.questions[nextIdx];
    setQIndex(nextIdx);
    setVisited((prev) => ({ ...prev, [targetQ.id]: true }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Main CBT Question Pane */}
      <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs text-slate-500">
              {activeExam.examType} · {currentQ.subject} · {currentQ.topic}
            </div>
            <h2 className="font-display text-lg font-bold text-slate-900 mt-0.5">
              Question {qIndex + 1} of {activeExam.questions.length}
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg font-mono text-sm font-semibold tabular-nums">
            <Clock className="w-4 h-4 text-sky-400" />
            {formatTimer(secondsLeft)}
          </div>
        </div>

        <p className="text-base font-medium text-slate-900 leading-relaxed">{currentQ.question}</p>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = answers[currentQ.id] === idx;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setAnswers((prev) => ({ ...prev, [currentQ.id]: idx }))}
                className={`w-full text-left px-4 py-3.5 border rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                  isSelected
                    ? 'bg-sky-50 border-sky-600 text-sky-950'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center border shrink-0 ${
                    isSelected
                      ? 'bg-sky-700 text-white border-sky-700'
                      : 'bg-slate-50 text-slate-600 border-slate-300'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setMarkedReview((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))
              }
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border ${
                markedReview[currentQ.id]
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {markedReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}
            </button>
            <button
              type="button"
              onClick={() =>
                setAnswers((prev) => {
                  const copy = { ...prev };
                  delete copy[currentQ.id];
                  return copy;
                })
              }
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Clear Response
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={qIndex === 0}
              onClick={() => goToQuestion(qIndex - 1)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg"
            >
              Previous
            </button>
            {qIndex + 1 < activeExam.questions.length ? (
              <button
                type="button"
                onClick={() => goToQuestion(qIndex + 1)}
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
              >
                Save & Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
              >
                Submit Mock Test
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Question Palette Sidebar */}
      <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">Question Palette</h3>
          <button
            type="button"
            onClick={() => setActiveExam(null)}
            className="text-xs text-slate-500 hover:text-slate-800"
          >
            Exit Test
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {activeExam.questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isMarked = !!markedReview[q.id];
            const isVisited = !!visited[q.id];
            const isCurrent = idx === qIndex;

            let paletteCls = 'bg-slate-100 text-slate-600 border-slate-200';
            if (isMarked) {
              paletteCls = 'bg-amber-100 text-amber-900 border-amber-400';
            } else if (isAnswered) {
              paletteCls = 'bg-emerald-600 text-white border-emerald-600';
            } else if (isVisited) {
              paletteCls = 'bg-rose-50 text-rose-800 border-rose-300';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => goToQuestion(idx)}
                className={`h-10 rounded-lg font-mono text-xs font-semibold border transition-colors ${paletteCls} ${
                  isCurrent ? 'ring-2 ring-sky-600 ring-offset-1' : ''
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-3 border-t border-slate-100">
          <div>Emerald: Answered ({Object.keys(answers).length})</div>
          <div>Amber: Review ({Object.values(markedReview).filter(Boolean).length})</div>
          <div>Rose: Visited/Skipped</div>
          <div>Slate: Not Visited</div>
        </div>

        <button
          type="button"
          onClick={handleSubmitExam}
          className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
        >
          Finish & Evaluate Test
        </button>
      </aside>
    </div>
  );
};
