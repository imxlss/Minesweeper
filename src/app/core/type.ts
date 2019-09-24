export type LevelType = 'easy' | 'medium' | 'hard';
export type StatusType = 'ready' | 'progress' | 'pause' | 'loss' | 'victory';
export type GameResultType = 'loss' | 'victory';

export const levelMap = {
  easy: 0,
  medium: 1,
  hard: 2,
}

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

export interface IRankList {
  level: number;
}

export interface IHttpResponse {
  status: string | number;
  result: any
}
