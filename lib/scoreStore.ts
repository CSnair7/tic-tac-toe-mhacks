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

export function hasSupabaseConfig(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export async function getScoreStore(): Promise<ScoreStore> {
  if (hasSupabaseConfig()) {
    const { supabaseScoreStore } = await import("./scoreStore.supabase");
    return supabaseScoreStore;
  }
  const { localScoreStore } = await import("./scoreStore.local");
  return localScoreStore;
}
