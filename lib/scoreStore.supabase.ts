import { createClient } from "@supabase/supabase-js";
import type { ScoreStore, ScoreStats, GameResult } from "./scoreStore";

// Expects a `scores` table:
//   player_id text primary key
//   wins       integer not null default 0
//   losses     integer not null default 0
//   ties       integer not null default 0
const PLAYER_ID_KEY = "tic-tac-toe-player-id";
const EMPTY_STATS: ScoreStats = { wins: 0, losses: 0, ties: 0 };

function getPlayerId(): string {
  let id = window.localStorage.getItem(PLAYER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(PLAYER_ID_KEY, id);
  }
  return id;
}

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export const supabaseScoreStore: ScoreStore = {
  async getStats() {
    const client = getClient();
    const playerId = getPlayerId();
    const { data, error } = await client
      .from("scores")
      .select("wins, losses, ties")
      .eq("player_id", playerId)
      .maybeSingle();

    if (error || !data) {
      if (error) console.warn("Failed to load Supabase stats:", error.message);
      return EMPTY_STATS;
    }
    return data as ScoreStats;
  },

  async recordResult(result: GameResult) {
    const client = getClient();
    const playerId = getPlayerId();
    const current = await supabaseScoreStore.getStats();
    const next: ScoreStats = {
      wins: current.wins + (result === "win" ? 1 : 0),
      losses: current.losses + (result === "loss" ? 1 : 0),
      ties: current.ties + (result === "tie" ? 1 : 0),
    };
    const { error } = await client
      .from("scores")
      .upsert({ player_id: playerId, ...next });

    if (error) {
      console.warn("Failed to save Supabase stats:", error.message);
    }
  },
};
