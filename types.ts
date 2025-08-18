
export enum Screen {
  Splash,
  PlayerSetup,
  ModeSelection,
  Game,
  End,
}

export enum GameMode {
  Classic = "Classic",
  Couples = "Couples",
  Extreme = "Extreme",
}

export interface Player {
  id: number;
  name: string;
  avatar: string;
  score: number;
}
