export type LevelType = 'easy' | 'medium' | 'hard';
export type StatusType = 'ready' | 'progress' | 'pause' | 'loss' | 'victory';
export type GameResultType = 'loss' | 'victory';

export interface IBoardIInfo {
  boardSize: number;
  mineCount: number;
}

export interface ICell {
  flagged: boolean;
  id: string;
  mined: boolean;
  neighborMineCount: number;
  opened: boolean;
}
