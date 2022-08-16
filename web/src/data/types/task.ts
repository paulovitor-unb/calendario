/*
    Define a interface típica de uma tarefa para o app React com TypeScript
*/

export interface Task {
    id: number;
    title: string;
    description: string;
    duration: number;
    datetime: string;
}
