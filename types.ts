export interface ContainerDef {
  id: string;
  name: string;
  capacity: number; // in ml
  initialAmount: number; // in ml
  spriteUrl?: string; // URL to image asset
}

export interface TargetState {
  containerId: string;
  amount: number;
}

export interface SolutionStep {
  description: string;
  amounts: { [containerId: string]: number };
}

export interface Level {
  id: number;
  title: string;
  description: string;
  hasSinkAndTap: boolean; // If true, user can empty to sink and fill from tap
  containers: ContainerDef[];
  targets: TargetState[];
  solutionSteps: SolutionStep[]; // Последовательность шагов для достижения цели
}

export interface ContainerState {
  id: string;
  currentAmount: number;
}