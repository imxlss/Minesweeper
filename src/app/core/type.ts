export type LevelType = 'easy' | 'medium' | 'hard';
export type StatusType = 'ready' | 'progress' | 'pause' | 'loss' | 'victory';
export type GameResultType = 'loss' | 'victory';

export enum levelMap {
  easy,
  medium,
  hard,
}

export const mineCountLevel = {
  easy: {
    boardSize: 10,
    mineCount: 10
  },
  medium: {
    boardSize: 16,
    mineCount: 32
  },
  hard: {
    boardSize: 22,
    mineCount: 50
  }
};

export enum gameResultMap {
  loss = '失败了！继续努力吧笨蛋~',
  victory = '恭喜你，取得了游戏的胜利！'
};

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

export interface IAppendScore {
  level: number;
  uuid: string;
  duration: number;
}

export interface IRankList {
  level: number;
}

export interface IHttpResponse {
  status: string | number;
  result: any
}
