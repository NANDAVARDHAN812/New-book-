import React from 'react';
import { Bookmark, RotateCcw, Trash2 } from 'lucide-react';
import { TrackId, UserProgressState } from '../types';

interface StudyVaultViewProps {
  progress: UserProgressState;
  onRemoveBookmark: (id: string) => void;
  onNavigateTrack: (track: TrackId, subTab?: string) => void;
  onResetAllProgress: () => void;
}

export const StudyVaultView: React.FC<StudyVaultViewProps> = ({
  progress,
  onRemoveBookmark,
  onNavigateTrack,
  onResetAllProgress,
}) => {
  const masteredCount = Object.values(progress.topicMastery).filter(
    (s) => s === 'mastered'
  ).length;

  return (
    <div className="space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-sky-700">Saved Resources & Exam History</div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Personal Study Vault
          </h1>
        </div>
        <button
          type="button"
          onClick={onResetAllProgress}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Local Progress
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">10th Micro Modules</div>
          <div className="font-mono text-2xl font-bold text-slate-900 tabular-nums mt-1">
            {progress.completedMicroModules.length} / 6
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">10th Quiz XP & Streak</div>
          <div className="font-mono text-2xl font-bold text-sky-700 tabular-nums mt-1">
            {progress.quizXp} XP · {progress.quizBestStreak}x
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">Intermediate Mastered</div>
          <div className="font-mono text-2xl font-bold text-emerald-700 tabular-nums mt-1">
            {masteredCount} / 8
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500">Graduate Milestones</div>
          <div className="font-mono text-2xl font-bold text-slate-900 tabular-nums mt-1">
            {progress.completedSkillMilestones.length} / 14
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Saved Bookmarks */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Bookmarked Papers, Modules & Doubts
          </h2>
          {progress.bookmarks.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center space-y-3">
              <Bookmark className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="text-sm text-slate-600">
                No bookmarked resources yet. Save any board paper, step solution, or doubt thread to review it here.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTrack('tenth', 'papers')}
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
              >
                Browse Past Papers
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {progress.bookmarks.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-xs text-slate-500">
                      {item.track.toUpperCase()} · {item.kind} · Saved {item.savedAt}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigateTrack(
                          item.track,
                          item.kind === 'doubt'
                            ? 'doubts'
                            : item.kind === 'module'
                            ? 'micro'
                            : item.kind === 'solution'
                            ? 'solutions'
                            : 'papers'
                        )
                      }
                      className="text-left font-semibold text-sm text-slate-900 hover:text-sky-700"
                    >
                      {item.title}
                    </button>
                    <div className="text-xs text-slate-600">{item.subtitle}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(item.id)}
                    aria-label="Remove bookmark"
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Mock Test History */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Mock Exam Performance Log
          </h2>
          {progress.mockHistory.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center space-y-3">
              <p className="text-sm text-slate-600">
                Complete an EAMCET or JEE CBT mock test to log your score, accuracy, and timing here.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTrack('intermediate', 'mock')}
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
              >
                Launch Mock Test
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2 pr-3 font-medium">Exam</th>
                    <th className="py-2 px-3 font-medium">Score</th>
                    <th className="py-2 px-3 font-medium">Accuracy</th>
                    <th className="py-2 pl-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {progress.mockHistory.map((res) => (
                    <tr key={res.id}>
                      <td className="py-3 pr-3 font-medium text-slate-900">{res.examTitle}</td>
                      <td className="py-3 px-3 font-mono text-sky-700 tabular-nums">
                        {res.score}/{res.maxScore}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700 tabular-nums">
                        {res.accuracy}%
                      </td>
                      <td className="py-3 pl-3 text-slate-500 tabular-nums">{res.completedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
