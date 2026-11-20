/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { OverviewHub } from './components/OverviewHub';
import { StudyVaultView } from './components/StudyVaultView';
import { TopBar } from './components/TopBar';
import { GraduateWorkspace } from './components/graduate/GraduateWorkspace';
import { IntermediateWorkspace } from './components/intermediate/IntermediateWorkspace';
import { TenthWorkspace } from './components/tenth/TenthWorkspace';
import {
  BookmarkItem,
  GraduateTab,
  IntermediateTab,
  MockTestResult,
  TenthTab,
  TrackId,
  UserProgressState,
} from './types';

const PROGRESS_STORAGE_KEY = 'vidyapath_progress_v1';

const INITIAL_PROGRESS: UserProgressState = {
  completedMicroModules: [],
  quizXp: 0,
  quizBestStreak: 0,
  quizzesCompleted: 0,
  topicMastery: {
    'int-calc-def': 'practicing',
    'int-phy-elec': 'mastered',
  },
  completedSkillMilestones: ['ms-fs-1'],
  bookmarks: [],
  mockHistory: [],
  upvotedDoubts: [],
};

export default function App() {
  const [activeTrack, setActiveTrack] = useState<TrackId>('overview');
  const [tenthTab, setTenthTab] = useState<TenthTab>('micro');
  const [intermediateTab, setIntermediateTab] = useState<IntermediateTab>('mastery');
  const [graduateTab, setGraduateTab] = useState<GraduateTab>('skills');

  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? { ...INITIAL_PROGRESS, ...(JSON.parse(saved) as UserProgressState) } : INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage quota errors
    }
  }, [progress]);

  const handleEnterTrack = (track: TrackId, subTab?: string) => {
    setActiveTrack(track);
    if (track === 'tenth' && subTab) setTenthTab(subTab as TenthTab);
    if (track === 'intermediate' && subTab) setIntermediateTab(subTab as IntermediateTab);
    if (track === 'graduate' && subTab) setGraduateTab(subTab as GraduateTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickPractice = () => {
    if (activeTrack === 'intermediate') {
      setIntermediateTab('mock');
    } else if (activeTrack === 'graduate') {
      setGraduateTab('interview');
    } else {
      setActiveTrack('tenth');
      setTenthTab('quiz');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteMicroModule = (moduleId: string) => {
    setProgress((prev) =>
      prev.completedMicroModules.includes(moduleId)
        ? prev
        : { ...prev, completedMicroModules: [...prev.completedMicroModules, moduleId] }
    );
  };

  const handleRecordQuizResult = (xpEarned: number, bestStreak: number) => {
    setProgress((prev) => ({
      ...prev,
      quizXp: prev.quizXp + xpEarned,
      quizBestStreak: Math.max(prev.quizBestStreak, bestStreak),
      quizzesCompleted: prev.quizzesCompleted + 1,
    }));
  };

  const handleToggleBookmark = (item: BookmarkItem) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.some((b) => b.id === item.id);
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((b) => b.id !== item.id)
          : [item, ...prev.bookmarks],
      };
    });
  };

  const handleUpdateTopicMastery = (
    topicId: string,
    status: 'unstarted' | 'practicing' | 'mastered'
  ) => {
    setProgress((prev) => ({
      ...prev,
      topicMastery: { ...prev.topicMastery, [topicId]: status },
    }));
  };

  const handleSaveMockResult = (result: MockTestResult) => {
    setProgress((prev) => ({
      ...prev,
      mockHistory: [result, ...prev.mockHistory],
    }));
  };

  const handleUpvoteDoubt = (doubtId: string) => {
    setProgress((prev) => {
      const exists = prev.upvotedDoubts.includes(doubtId);
      return {
        ...prev,
        upvotedDoubts: exists
          ? prev.upvotedDoubts.filter((id) => id !== doubtId)
          : [...prev.upvotedDoubts, doubtId],
      };
    });
  };

  const handleToggleSkillMilestone = (milestoneId: string) => {
    setProgress((prev) => {
      const exists = prev.completedSkillMilestones.includes(milestoneId);
      return {
        ...prev,
        completedSkillMilestones: exists
          ? prev.completedSkillMilestones.filter((id) => id !== milestoneId)
          : [...prev.completedSkillMilestones, milestoneId],
      };
    });
  };

  const handleResetAllProgress = () => {
    setProgress(INITIAL_PROGRESS);
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopBar
        activeTrack={activeTrack}
        onSelectTrack={(track) => handleEnterTrack(track)}
        onQuickPractice={handleQuickPractice}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTrack === 'overview' && (
          <OverviewHub progress={progress} onEnterTrack={handleEnterTrack} />
        )}

        {activeTrack === 'tenth' && (
          <TenthWorkspace
            activeTab={tenthTab}
            onTabChange={setTenthTab}
            progress={progress}
            onCompleteMicroModule={handleCompleteMicroModule}
            onRecordQuizResult={handleRecordQuizResult}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTrack === 'intermediate' && (
          <IntermediateWorkspace
            activeTab={intermediateTab}
            onTabChange={setIntermediateTab}
            progress={progress}
            onUpdateTopicMastery={handleUpdateTopicMastery}
            onSaveMockResult={handleSaveMockResult}
            onToggleBookmark={handleToggleBookmark}
            onUpvoteDoubt={handleUpvoteDoubt}
          />
        )}

        {activeTrack === 'graduate' && (
          <GraduateWorkspace
            activeTab={graduateTab}
            onTabChange={setGraduateTab}
            progress={progress}
            onToggleSkillMilestone={handleToggleSkillMilestone}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTrack === 'vault' && (
          <StudyVaultView
            progress={progress}
            onRemoveBookmark={(id) =>
              setProgress((prev) => ({
                ...prev,
                bookmarks: prev.bookmarks.filter((b) => b.id !== id),
              }))
            }
            onNavigateTrack={handleEnterTrack}
            onResetAllProgress={handleResetAllProgress}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>VidyaPath · Structured Learning for 10th, Intermediate & Graduates</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleEnterTrack('overview')}
              className="hover:text-slate-900"
            >
              Stage Overview
            </button>
            <button
              type="button"
              onClick={() => handleEnterTrack('tenth')}
              className="hover:text-slate-900"
            >
              10th Grade
            </button>
            <button
              type="button"
              onClick={() => handleEnterTrack('intermediate')}
              className="hover:text-slate-900"
            >
              Intermediate
            </button>
            <button
              type="button"
              onClick={() => handleEnterTrack('graduate')}
              className="hover:text-slate-900"
            >
              Graduates
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
