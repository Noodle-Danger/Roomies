interface Chore {
    id: number;
    task_name: string;
    tokens: number;
    user_id: number;
    is_complete: boolean;
    due_date: string | null;
    created_at: string;
  }

  interface ChoreSubmitData {
    user_id: number;
    task_name: string;
    tokens: number;
  }

  export type { Chore, ChoreSubmitData };