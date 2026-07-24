'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function LastUpdated({ lastUpdatedTime }) {
  const [timeAgo, setTimeAgo] = useState('Just now');

  useEffect(() => {
    if (!lastUpdatedTime) return;

    const updateLabel = () => {
      const seconds = Math.floor((Date.now() - new Date(lastUpdatedTime).getTime()) / 1000);
      if (seconds < 10) {
        setTimeAgo('Just now');
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        setTimeAgo(`${mins}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateLabel();
    const interval = setInterval(updateLabel, 10000);
    return () => clearInterval(interval);
  }, [lastUpdatedTime]);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-white/10 text-[11px] text-slate-400">
      <Clock className="w-3 h-3 text-blue-400 shrink-0" />
      <span>Updated {timeAgo}</span>
    </div>
  );
}
