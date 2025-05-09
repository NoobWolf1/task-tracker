import { HIGH, MEDIUM, LOW, TODO, IN_PROGRESS, DONE } from '../config';
export interface Task {
  readonly _id: number;
  title: string;
  priority: Priority;
  //dateAdded: Date,
  //dueDate: Date,
  status: Status;
}

export type Priority = typeof HIGH | typeof MEDIUM | typeof LOW;

export type Status = typeof TODO | typeof IN_PROGRESS | typeof DONE;
