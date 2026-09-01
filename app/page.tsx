"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Board } from "@/components/Board";
import { StatsRow } from "@/components/StatsRow";
import {
  createEmptyBoard,
  applyMove,
  checkWinner,
  isDraw,
  isValidMove,
  type Board as BoardValue,
  type Player,
} from "@/lib/gameLogic";
import { getScoreStore, type ScoreStats } from "@/lib/scoreStore";

const HUMAN: Player = "X";
const OPPONENT: Player = "O";
const EMPTY_STATS: ScoreStats = { wins: 0, losses: 0, ties: 0 };

export default function Home() {
  const [board, setBoard] = useState<BoardValue>(createEmptyBoard());
  const [current, setCurrent] = useState<Player>(HUMAN);
  const [stats, setStats] = useState<ScoreStats>(EMPTY_STATS);

  useEffect(() => {
    getScoreStore()
      .then((store) => store.getStats())
      .then(setStats);
  }, []);

  const winner = checkWinner(board);
  const draw = isDraw(board);
  const gameOver = winner !== null || draw;

  async function recordAndRefresh(result: "win" | "loss" | "tie") {
    const store = await getScoreStore();
    await store.recordResult(result);
    setStats(await store.getStats());
  }

  function handleCellClick(index: number) {
    if (gameOver || !isValidMove(board, index)) return;

    const nextBoard = applyMove(board, index, current);
    setBoard(nextBoard);

    const nextWinner = checkWinner(nextBoard);
    if (nextWinner) {
      recordAndRefresh(nextWinner === HUMAN ? "win" : "loss");
      return;
    }
    if (isDraw(nextBoard)) {
      recordAndRefresh("tie");
      return;
    }
    setCurrent(current === HUMAN ? OPPONENT : HUMAN);
  }

  function handleReset() {
    setBoard(createEmptyBoard());
    setCurrent(HUMAN);
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center px-4">
      <Header />
      <Board board={board} onCellClick={handleCellClick} disabled={gameOver} />
      <div className="pt-6 font-mono text-sm text-moss-300">
        {winner && `${winner} wins!`}
        {draw && "It's a tie!"}
        {!gameOver && `${current}'s turn`}
      </div>
      <button
        type="button"
        onClick={handleReset}
        className="mt-4 rounded-full bg-cream px-6 py-2 font-mono text-xs uppercase tracking-widest text-moss-900 transition hover:bg-leaf"
      >
        New game
      </button>
      <StatsRow stats={stats} />
    </main>
  );
}
