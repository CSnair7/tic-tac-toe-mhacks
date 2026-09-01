"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { Board } from "@/components/Board";
import {
  createEmptyBoard,
  applyMove,
  checkWinner,
  isDraw,
  isValidMove,
  type Board as BoardValue,
  type Player,
} from "@/lib/gameLogic";
import { getScoreStore } from "@/lib/scoreStore";

const HUMAN: Player = "X";
const OPPONENT: Player = "O";

export default function Home() {
  const [board, setBoard] = useState<BoardValue>(createEmptyBoard());
  const [current, setCurrent] = useState<Player>(HUMAN);

  const winner = checkWinner(board);
  const draw = isDraw(board);
  const gameOver = winner !== null || draw;

  async function recordResult(result: "win" | "loss" | "tie") {
    const store = await getScoreStore();
    await store.recordResult(result);
  }

  function handleCellClick(index: number) {
    if (gameOver || !isValidMove(board, index)) return;

    const nextBoard = applyMove(board, index, current);
    setBoard(nextBoard);

    const nextWinner = checkWinner(nextBoard);
    if (nextWinner) {
      recordResult(nextWinner === HUMAN ? "win" : "loss");
      return;
    }
    if (isDraw(nextBoard)) {
      recordResult("tie");
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
      <Navbar />
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
    </main>
  );
}
