import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle, Award, ListChecks } from 'lucide-react';

export const StudentRubricChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'req-1': true,
    'req-2': true,
    'req-3': true,
    'req-4': true,
    'req-5': true,
    'req-6': true,
  });

  const checklist = [
    {
      id: 'req-1',
      title: 'Prompt & Explicit Type Casting',
      description: 'Used prompt() to collect product name and price, explicitly converted via Number() or parseFloat().',
      concept: 'Requirement 1',
    },
    {
      id: 'req-2',
      title: 'Validation & Dynamic switch(true)',
      description: 'Validated input with if...else, classified categories (Budget ≤ $50, Standard, Premium ≥ $500) via switch.',
      concept: 'Requirement 2',
    },
    {
      id: 'req-3',
      title: 'Flow Control with break & continue',
      description: 'Used continue to bypass invalid/negative prices, and break to exit early once target is located.',
      concept: 'Requirement 3',
    },
    {
      id: 'req-4',
      title: 'Function Scoping & Encapsulation',
      description: 'Regular function for total calculation with local let variable, arrow function for discounts/taxes.',
      concept: 'Requirement 4',
    },
    {
      id: 'req-5',
      title: 'Array Methods (forEach, filter, map)',
      description: 'Logged roster via forEach(), filtered items < $200, and mapped uppercase string summaries.',
      concept: 'Requirement 5',
    },
    {
      id: 'req-6',
      title: 'Exact Console Output Match',
      description: 'Matched headers, prompt log, item roster, and financial analytics JSON strings precisely.',
      concept: 'Specification Output',
    },
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const isAllComplete = totalChecked === checklist.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ListChecks className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span>Student Project Checklist</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                {totalChecked} / {checklist.length} Completed
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Verify your code against all criteria specified in the project description
            </p>
          </div>
        </div>

        {isAllComplete && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Requirements Satisfied</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {checklist.map((item) => {
          const isDone = !!checkedItems[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-700/60'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="pt-0.5">
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isDone ? 'text-slate-100' : 'text-slate-400'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {item.concept}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
