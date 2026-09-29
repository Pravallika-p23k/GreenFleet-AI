import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ExplainableRecommendation({ explanations = [], planName = "Selected Plan" }) {
  return (
    <div className="bg-navy-900/90 border border-emerald-500/30 rounded-xl p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-navy-800">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <h4 className="text-base font-semibold text-slate-100">
          Why {planName} Was Recommended
        </h4>
      </div>
      
      {explanations.length === 0 ? (
        <p className="text-xs text-slate-400 italic">No specific explanations generated yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {explanations.map((item, idx) => {
            const isWarning = item.startsWith('⚠️');
            return (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                {isWarning ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span>{item.replace(/^[✓⚠️]\s*/, '')}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
