import { HIGH, MEDIUM, LOW, TODO, IN_PROGRESS, DONE } from '../config';
export interface Task {
    readonly _id: number;
    title: string;
    priority?: Priority;
    status?: Status;
    //dueDate: Date,
    //createdAt: Date,
    //updatedAt: Date,
}

export type Priority = typeof HIGH | typeof MEDIUM | typeof LOW;

export type Status = typeof TODO | typeof IN_PROGRESS | typeof DONE;

export type Validation = {
    command: string;
    isValid: boolean;
    title?: string;
    priority?: string;
    status?: string;
    _id?: number;
    listDone?: boolean,
    listTodo?: boolean,
    listInProgress?: boolean,
    listAll?: boolean
};

