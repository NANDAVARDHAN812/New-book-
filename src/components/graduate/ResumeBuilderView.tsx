import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Plus,
  Printer,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { DEFAULT_RESUME_DATA } from '../../data/graduateData';
import { ResumeData } from '../../types';

const RESUME_STORAGE_KEY = 'vidyapath_resume_v1';

export const ResumeBuilderView: React.FC = () => {
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(RESUME_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ResumeData) : DEFAULT_RESUME_DATA;
    } catch {
      return DEFAULT_RESUME_DATA;
    }
  });

  const [template, setTemplate] = useState<'classic' | 'modern'>('classic');
  const [copiedMsg, setCopiedMsg] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resume));
    } catch {
      // ignore storage quota errors
    }
  }, [resume]);

  // Deterministic ATS Impact Checks
  const allBullets = [
    ...resume.experience.flatMap((e) => e.bullets),
    ...resume.projects.flatMap((p) => p.bullets),
  ];
  const quantifiedCount = allBullets.filter((b) => /\d+(%|ms|s|x|k|\+|,|\s)/.test(b)).length;
  const actionVerbRegex =
    /^(engineered|built|designed|optimized|implemented|reduced|increased|led|launched|automated|wrote|developed|architected|analyzed)/i;
  const strongVerbCount = allBullets.filter((b) => actionVerbRegex.test(b.trim())).length;
  const skillCount = resume.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean).length;

  const atsChecks = [
    {
      label: 'Contact & Portfolio Links Complete',
      passed: Boolean(resume.fullName && resume.email && resume.portfolioUrl),
    },
    {
      label: `Quantified Metrics in Bullets (${quantifiedCount} found)`,
      passed: quantifiedCount >= 2,
    },
    {
      label: `Strong Action Verbs Used (${strongVerbCount}/${allBullets.length})`,
      passed: strongVerbCount >= Math.max(2, Math.ceil(allBullets.length * 0.5)),
    },
    {
      label: `Core Technical Skills Listed (${skillCount} skills)`,
      passed: skillCount >= 6,
    },
  ];

  const handleCopyMarkdown = () => {
    const md = [
      `# ${resume.fullName}`,
      `${resume.headline}`,
      `${resume.email} | ${resume.phone} | ${resume.location} | ${resume.portfolioUrl}`,
      `\n## Summary\n${resume.summary}`,
      `\n## Experience`,
      ...resume.experience.map(
        (e) =>
          `### ${e.role} — ${e.company} (${e.period})\n` +
          e.bullets.map((b) => `- ${b}`).join('\n')
      ),
      `\n## Projects`,
      ...resume.projects.map(
        (p) => `### ${p.name} (${p.stack})\n` + p.bullets.map((b) => `- ${b}`).join('\n')
      ),
      `\n## Education`,
      ...resume.education.map(
        (ed) => `- **${ed.degree}**, ${ed.institution} (${ed.period}) — ${ed.gpa}`
      ),
      `\n## Skills\n${resume.skills}`,
    ].join('\n');

    navigator.clipboard?.writeText(md);
    setCopiedMsg(true);
    window.setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setTemplate('classic')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              template === 'classic'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Classic Engineering
          </button>
          <button
            type="button"
            onClick={() => setTemplate('modern')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              template === 'modern'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Modern Minimal
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setResume(DEFAULT_RESUME_DATA)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Sample
          </button>
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg"
          >
            <Copy className="w-3.5 h-3.5" />
            {copiedMsg ? 'Copied Markdown' : 'Copy Markdown'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg"
          >
            <Printer className="w-3.5 h-3.5" />
            Export / Print PDF
          </button>
        </div>
      </div>

      {/* Split Editor & Live A4 Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Structured Form Editor + ATS Audit */}
        <div className="lg:col-span-5 space-y-5">
          {/* Deterministic ATS Checker */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
            <h3 className="font-display text-sm font-bold text-slate-900">
              ATS Readiness Checklist
            </h3>
            <ul className="space-y-2">
              {atsChecks.map((chk) => (
                <li key={chk.label} className="flex items-center gap-2 text-xs">
                  {chk.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span className={chk.passed ? 'text-slate-700' : 'text-amber-900 font-medium'}>
                    {chk.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Fields */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5">
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold text-slate-900">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  value={resume.location}
                  onChange={(e) => setResume({ ...resume, location: e.target.value })}
                  placeholder="City, Country"
                  className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg"
                />
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => setResume({ ...resume, email: e.target.value })}
                  placeholder="Email"
                  className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                  placeholder="Phone"
                  className="px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg"
                />
              </div>
              <input
                type="text"
                value={resume.headline}
                onChange={(e) => setResume({ ...resume, headline: e.target.value })}
                placeholder="Role Headline"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg"
              />
              <input
                type="text"
                value={resume.portfolioUrl}
                onChange={(e) => setResume({ ...resume, portfolioUrl: e.target.value })}
                placeholder="GitHub / Portfolio URL"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg"
              />
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                placeholder="Concise 2-line career summary..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg"
              />
            </div>

            {/* Experience Editor */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-slate-900">Experience</h3>
                <button
                  type="button"
                  onClick={() =>
                    setResume({
                      ...resume,
                      experience: [
                        ...resume.experience,
                        {
                          role: 'Software Trainee',
                          company: 'Company Name',
                          period: '2025',
                          bullets: ['Built feature X improving metric Y by 25%.'],
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Role
                </button>
              </div>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const next = [...resume.experience];
                        next[idx] = { ...exp, role: e.target.value };
                        setResume({ ...resume, experience: next });
                      }}
                      className="flex-1 px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded"
                    />
                    <button
                      type="button"
                      aria-label="Remove experience entry"
                      onClick={() =>
                        setResume({
                          ...resume,
                          experience: resume.experience.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const next = [...resume.experience];
                        next[idx] = { ...exp, company: e.target.value };
                        setResume({ ...resume, experience: next });
                      }}
                      className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const next = [...resume.experience];
                        next[idx] = { ...exp, period: e.target.value };
                        setResume({ ...resume, experience: next });
                      }}
                      className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={exp.bullets.join('\n')}
                    onChange={(e) => {
                      const next = [...resume.experience];
                      next[idx] = {
                        ...exp,
                        bullets: e.target.value.split('\n'),
                      };
                      setResume({ ...resume, experience: next });
                    }}
                    placeholder="One impact bullet per line..."
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  />
                </div>
              ))}
            </div>

            {/* Projects Editor */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-slate-900">Key Projects</h3>
                <button
                  type="button"
                  onClick={() =>
                    setResume({
                      ...resume,
                      projects: [
                        ...resume.projects,
                        {
                          name: 'New Capstone Project',
                          stack: 'React, TypeScript, SQL',
                          bullets: ['Architected module reducing manual work by 40%.'],
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Project
                </button>
              </div>
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => {
                        const next = [...resume.projects];
                        next[idx] = { ...proj, name: e.target.value };
                        setResume({ ...resume, projects: next });
                      }}
                      className="flex-1 px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded"
                    />
                    <button
                      type="button"
                      aria-label="Remove project"
                      onClick={() =>
                        setResume({
                          ...resume,
                          projects: resume.projects.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={proj.stack}
                    onChange={(e) => {
                      const next = [...resume.projects];
                      next[idx] = { ...proj, stack: e.target.value };
                      setResume({ ...resume, projects: next });
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  />
                  <textarea
                    rows={2}
                    value={proj.bullets.join('\n')}
                    onChange={(e) => {
                      const next = [...resume.projects];
                      next[idx] = { ...proj, bullets: e.target.value.split('\n') };
                      setResume({ ...resume, projects: next });
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded"
                  />
                </div>
              ))}
            </div>

            {/* Education & Skills */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-display text-sm font-bold text-slate-900">Education & Skills</h3>
              {resume.education.map((ed, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={ed.degree}
                    onChange={(e) => {
                      const next = [...resume.education];
                      next[idx] = { ...ed, degree: e.target.value };
                      setResume({ ...resume, education: next });
                    }}
                    className="px-2.5 py-1.5 text-xs border border-slate-200 rounded"
                  />
                  <input
                    type="text"
                    value={ed.institution}
                    onChange={(e) => {
                      const next = [...resume.education];
                      next[idx] = { ...ed, institution: e.target.value };
                      setResume({ ...resume, education: next });
                    }}
                    className="px-2.5 py-1.5 text-xs border border-slate-200 rounded"
                  />
                  <input
                    type="text"
                    value={ed.period}
                    onChange={(e) => {
                      const next = [...resume.education];
                      next[idx] = { ...ed, period: e.target.value };
                      setResume({ ...resume, education: next });
                    }}
                    className="px-2.5 py-1.5 text-xs border border-slate-200 rounded"
                  />
                  <input
                    type="text"
                    value={ed.gpa}
                    onChange={(e) => {
                      const next = [...resume.education];
                      next[idx] = { ...ed, gpa: e.target.value };
                      setResume({ ...resume, education: next });
                    }}
                    className="px-2.5 py-1.5 text-xs border border-slate-200 rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Skills (comma separated)
                </label>
                <textarea
                  rows={2}
                  value={resume.skills}
                  onChange={(e) => setResume({ ...resume, skills: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Print-Ready A4 Sheet Preview */}
        <div className="lg:col-span-7">
          <div
            id="resume-print-area"
            className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6 text-slate-900"
          >
            {/* Header */}
            <div
              className={
                template === 'classic'
                  ? 'border-b-2 border-slate-900 pb-4 text-center space-y-1.5'
                  : 'border-b border-slate-200 pb-4 space-y-1.5'
              }
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {resume.fullName}
              </h2>
              <p className="text-sm font-medium text-sky-800">{resume.headline}</p>
              <div
                className={`text-xs text-slate-600 flex flex-wrap gap-x-2 gap-y-1 ${
                  template === 'classic' ? 'justify-center' : 'justify-start'
                }`}
              >
                <span>{resume.email}</span>
                <span>·</span>
                <span>{resume.phone}</span>
                <span>·</span>
                <span>{resume.location}</span>
                <span>·</span>
                <span className="font-mono">{resume.portfolioUrl}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{resume.summary}</p>
            </div>

            {/* Experience */}
            {resume.experience.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Experience
                </h3>
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <div className="text-sm font-bold text-slate-900">
                        {exp.role} · <span className="font-medium text-slate-700">{exp.company}</span>
                      </div>
                      <div className="font-mono text-xs text-slate-500">{exp.period}</div>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-slate-700">
                      {exp.bullets.filter(Boolean).map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {resume.projects.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  Technical Projects
                </h3>
                {resume.projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-2">
                      <div className="text-sm font-bold text-slate-900">{proj.name}</div>
                      <div className="font-mono text-xs text-sky-800">{proj.stack}</div>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-slate-700">
                      {proj.bullets.filter(Boolean).map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Education
              </h3>
              {resume.education.map((ed, idx) => (
                <div key={idx} className="flex flex-wrap justify-between items-baseline gap-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900">{ed.degree}</span> ·{' '}
                    <span className="text-slate-700">{ed.institution}</span>
                  </div>
                  <div className="font-mono text-xs text-slate-600">
                    {ed.period} · {ed.gpa}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Technical Skills
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{resume.skills}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
