'use client';

import Skeleton from './Skeleton';

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div
      aria-hidden="true"
      className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/80 border-b border-white/10 uppercase tracking-wider text-xs font-semibold text-slate-400">
            <tr>
              <th className="py-4 px-5">Lead Name</th>
              <th className="py-4 px-5">Email Address</th>
              <th className="py-4 px-5">Budget Range</th>
              <th className="py-4 px-5 max-w-xs">Project Message</th>
              <th className="py-4 px-5">Date Submitted</th>
              <th className="py-4 px-5">Status & Action</th>
              <th className="py-4 px-5 text-right">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {Array.from({ length: rows }).map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                {/* Name */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-lg shrink-0" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-5">
                  <Skeleton className="h-4 w-36" />
                </td>

                {/* Budget */}
                <td className="py-4 px-5">
                  <Skeleton className="h-6 w-24 rounded-md" />
                </td>

                {/* Message */}
                <td className="py-4 px-5 max-w-xs">
                  <Skeleton className="h-4 w-44" />
                </td>

                {/* Date */}
                <td className="py-4 px-5">
                  <Skeleton className="h-4 w-20" />
                </td>

                {/* Status Badge */}
                <td className="py-4 px-5">
                  <Skeleton className="h-7 w-24 rounded-xl" />
                </td>

                {/* Delete Button */}
                <td className="py-4 px-5 text-right">
                  <div className="flex justify-end">
                    <Skeleton className="h-7 w-7 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
