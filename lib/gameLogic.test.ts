import { describe, it, expect } from "vitest";
import {
  checkWinner,
  isDraw,
  isValidMove,
  applyMove,
  createEmptyBoard,
  type Board,
} from "./gameLogic";

describe("checkWinner", () => {
  it("detects a row win", () => {
    const board: Board = ["X", "X", "X", null, null, null, null, null, null];
    expect(checkWinner(board)).toBe("X");
  });

  it("detects a column win", () => {
    const board: Board = ["O", null, null, "O", null, null, "O", null, null];
    expect(checkWinner(board)).toBe("O");
  });

  it("detects a diagonal win", () => {
    const board: Board = ["X", null, null, null, "X", null, null, null, "X"];
    expect(checkWinner(board)).toBe("X");
  });

  it("returns null when there is no winner", () => {
    expect(checkWinner(createEmptyBoard())).toBeNull();
  });
});

describe("isDraw", () => {
  it("returns true when the board is full with no winner", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(isDraw(board)).toBe(true);
  });

  it("returns false when the board still has empty cells", () => {
    expect(isDraw(createEmptyBoard())).toBe(false);
  });

  it("returns false when the board is full but has a winner", () => {
    const board: Board = ["X", "X", "X", "O", "O", null, null, null, null];
    expect(isDraw(board)).toBe(false);
  });
});

describe("isValidMove", () => {
  it("allows a move on an empty cell", () => {
    expect(isValidMove(createEmptyBoard(), 4)).toBe(true);
  });

  it("rejects a move on an occupied cell", () => {
    const board = applyMove(createEmptyBoard(), 0, "X");
    expect(isValidMove(board, 0)).toBe(false);
  });

  it("rejects a move once the game is won", () => {
    const board: Board = ["X", "X", "X", null, null, null, null, null, null];
    expect(isValidMove(board, 4)).toBe(false);
  });

  it("rejects an out-of-range index", () => {
    expect(isValidMove(createEmptyBoard(), 9)).toBe(false);
    expect(isValidMove(createEmptyBoard(), -1)).toBe(false);
  });
});

describe("applyMove", () => {
  it("places the player's mark without mutating the original board", () => {
    const board = createEmptyBoard();
    const next = applyMove(board, 0, "X");
    expect(next[0]).toBe("X");
    expect(board[0]).toBeNull();
  });
});
