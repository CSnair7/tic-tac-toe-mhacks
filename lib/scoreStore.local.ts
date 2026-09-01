import type { ScoreStore, ScoreStats, GameResult } from "./scoreStore";

const STORAGE_KEY = "tic-tac-toe-stats";

function readStats(): ScoreStats {
  if (typeof window === "undefined") {
    return { wins: 0, losses: 0, ties: 0 };
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { wins: 0, losses: 0, ties: 0 };
  }
  return JSON.parse(raw) as ScoreStats;
}

function writeStats(stats: ScoreStats): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export const localScoreStore: ScoreStore = {
  async getStats() {
    return readStats();
  },
  async recordResult(result: GameResult) {
    const stats = readStats();
    if (result === "win") stats.wins += 1;
    if (result === "loss") stats.losses += 1;
    if (result === "tie") stats.ties += 1;
    writeStats(stats);
  },
};
