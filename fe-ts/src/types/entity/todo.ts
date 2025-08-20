import { Timestamps } from "./timeStamp";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  cardColor: string;
  isCompleted: boolean;
  onDate: string;
  timestamps: Timestamps;
  __v: number;
}
