'use client';

import Skeleton from './Skeleton';

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden shadow-sm backdrop-blur-md transition-all"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0D0E11] border-b border-zinc-800/80 uppercase tracking-wider text-xs font-semibold text-zinc-400">
            <tr>
              <th className="py-3.5 px-5">Lead Name</th>
              <th className="py-3.5 px-5">Email Address</th>
              <th className="py-3.5 px-5">Budget Range</th>
              <th className="py-3.5 px-5 max-w-xs">Project Message</th>
              <th className="py-3.5 px-5">Date Submitted</th>
              <th className="py-3.5 px-5">Status & Action</th>
              <th className="py-3.5 px-5 text-right">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {Array.from({ length: rows }).map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                {/* Name */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-md shrink-0 bg-zinc-800" />
                    <Skeleton className="h-4 w-28 bg-zinc-800" />
                  </div>
                </td>

                {/* Email */}
                <td className="py-3.5 px-5">
                  <Skeleton className="h-4 w-36 bg-zinc-800" />
                </td>

                {/* Budget */}
                <td className="py-3.5 px-5">
                  <Skeleton className="h-6 w-24 rounded-md bg-zinc-800" />
                </td>

                {/* Message */}
                <td className="py-3.5 px-5 max-w-xs">
                  <Skeleton className="h-4 w-44 bg-zinc-800" />
                </td>

                {/* Date */}
                <td className="py-3.5 px-5">
                  <Skeleton className="h-4 w-20 bg-zinc-800" />
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-5">
                  <Skeleton className="h-6 w-24 rounded-md bg-zinc-800" />
                </td>

                {/* Delete Button */}
                <td className="py-3.5 px-5 text-right">
                  <div className="flex justify-end">
                    <Skeleton className="h-6 w-6 rounded-md bg-zinc-800" />
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
