import { SimulationNodeDatum } from 'd3';

export interface D3InterestData extends SimulationNodeDatum {
  id: string;
  label: string;
  radius: number;
}
