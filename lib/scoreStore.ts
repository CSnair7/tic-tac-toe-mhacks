export type GameResult = "win" | "loss" | "tie";

export interface ScoreStats {
  wins: number;
  losses: number;
  ties: number;
}

export interface ScoreStore {
  getStats(): Promise<ScoreStats>;
  recordResult(result: GameResult): Promise<void>;
}

export async function getScoreStore(): Promise<ScoreStore> {
  const { localScoreStore } = await import("./scoreStore.local");
  return localScoreStore;
}
