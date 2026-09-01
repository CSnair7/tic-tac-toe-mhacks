import type { ScoreStats } from "@/lib/scoreStore";

interface StatsRowProps {
  stats: ScoreStats;
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <dl className="flex gap-8 pt-8 font-mono text-sm text-moss-300">
      <div className="flex flex-col items-center">
        <dt className="uppercase tracking-widest">Wins</dt>
        <dd className="text-2xl text-cream">{stats.wins}</dd>
      </div>
      <div className="flex flex-col items-center">
        <dt className="uppercase tracking-widest">Losses</dt>
        <dd className="text-2xl text-cream">{stats.losses}</dd>
      </div>
      <div className="flex flex-col items-center">
        <dt className="uppercase tracking-widest">Ties</dt>
        <dd className="text-2xl text-cream">{stats.ties}</dd>
      </div>
    </dl>
  );
}
